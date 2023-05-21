const xlsx = require('xlsx');
import { CreateTagDto } from '@app/tags/dto/create-tag.dto';
import { UpdateTagDto } from '@app/tags/dto/update-tag.dto';
import { Tag } from '@app/types/tag.type';
import { join } from 'path';

const filePath = join(__dirname, '../../assets/lista_etiquetas.xlsx');

let tagsWorkbook;
let tagsWorksheet;
let tags: Array<Tag>;

const readWorkbook = () => xlsx.readFile(filePath);

const parseSheet = (): Array<Tag> =>
  xlsx.utils.sheet_to_json(tagsWorksheet, {
    range: 2,
  });

const loadSheet = () => {
  tagsWorkbook = readWorkbook();
  tagsWorksheet = tagsWorkbook.Sheets[tagsWorkbook.SheetNames[0]];
  tags = parseSheet();
};

const updateTag = (tagToUpdate: Tag, updatedTagData: UpdateTagDto): Tag => {
  let updatedTag = tagToUpdate;

  Object.keys(updatedTagData).forEach((key) => {
    updatedTag[key] = updatedTagData[key];
  });

  return updatedTag;
};

const writeUpdatesToSheet = (tags: Array<Tag>) => {
  const newTagsValues = xlsx.utils.json_to_sheet(tags, { origin: 'A3' });
  let outputWorksheet = { ...tagsWorksheet, ...newTagsValues };
  tagsWorkbook.Sheets[tagsWorkbook.SheetNames[0]] = outputWorksheet;

  xlsx.writeFile(tagsWorkbook, filePath);
};

const hasTagId = (id: string): Boolean => {
  return tags.findIndex((tag) => tag.Tag === id) !== -1;
};

const isTagValid = (id: string): Boolean => {
  return !!id.match(/\w{2}\d{9}\w{2}/g);
};

loadSheet();

export const sheetUtils = {
  getAllRows: (): Array<Tag> => tags,
  getTagById: (id: string): Tag | string => {
    const foundTag: Tag = tags.find((tag) => tag.Tag === id);
    return foundTag ? foundTag : `Couldn't find tag with id: '${id}'`;
  },
  createTag: (newTag: CreateTagDto): string => {
    if (hasTagId(newTag.Tag)) return `[Error] Tag id already exists`;
    if (!isTagValid(newTag.Tag)) return `[Error] Invalid tag`;
    tags.push(newTag);
    writeUpdatesToSheet(tags);
    return `Created tag ${JSON.stringify(newTag)}`;
  },
  updateTagById: (id: string, updatedTagData: UpdateTagDto): string => {
    const tagToUpdate = tags.findIndex((tag) => tag.Tag === id);
    if (tagToUpdate === -1)
      return `[Error] Couldn't update. Tag with id: '${id}' not found.`;

    tags[tagToUpdate] = updateTag(tags[tagToUpdate], updatedTagData);
    writeUpdatesToSheet(tags);
    return `Updated tag with id: '${id}' with data ${JSON.stringify(
      updatedTagData,
    )}`;
  },
  removeTagById: (id: string): string => {
    const tagToRemove = tags.findIndex((tag) => tag.Tag === id);
    if (tagToRemove === -1)
      return `[Error] Couldn't remove. Tag with id: '${id}' not found`;
    tags.splice(tagToRemove, 1);

    writeUpdatesToSheet(tags);
    return `Tag removed succesfully`;
  },
};
