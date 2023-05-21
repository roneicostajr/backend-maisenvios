import { Injectable } from '@nestjs/common';
import { CreateTagDto } from './dto/create-tag.dto';
import { UpdateTagDto } from './dto/update-tag.dto';
import { sheetUtils } from '../utils/xlsx/index.js';
import { Tag } from '@app/types/tag.type';

@Injectable()
export class TagsService {
  getAll(): Array<Tag> {
    return sheetUtils.getAllRows();
  }
  getTagById(id: string): Tag | string {
    return sheetUtils.getTagById(id);
  }
  createTag(newTag: CreateTagDto): string {
    return sheetUtils.createTag(newTag);
  }
  updateTagById(id: string, updatedTagData: UpdateTagDto): string {
    return sheetUtils.updateTagById(id, updatedTagData);
  }
  removeTagById(id: string): string {
    return sheetUtils.removeTagById(id);
  }
}
