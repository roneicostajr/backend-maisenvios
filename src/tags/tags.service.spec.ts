import { Test, TestingModule } from '@nestjs/testing';
import { TagsService } from '@app/tags/tags.service';
import sheetUtils from '@app/utils/xlsx';
import { CreateTagDto } from './dto/create-tag.dto';

jest.mock('@app/utils/xlsx/index', () => ({
  __esModule: true,
  default: {
    getAllRows: jest.fn(),
    getTagById: jest.fn(),
    createTag: jest.fn(),
    updateTagById: jest.fn(),
    removeTagById: jest.fn(),
  },
}));

describe('TagsService', () => {
  let tagsService: TagsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [TagsService],
    }).compile();

    tagsService = module.get<TagsService>(TagsService);
  });

  describe('When getAll is called', () => {
    beforeEach(() => {
      tagsService.getAll();
    });
    describe('then', () => {
      it('it should call getAllRows from sheet parser', () => {
        expect(sheetUtils.getAllRows).toHaveBeenCalled();
      });
    });
  });
  describe('When getTagById is called', () => {
    beforeEach(() => {
      tagsService.getTagById('tagId');
    });
    describe('Then', () => {
      it('it should call getTagById from sheet parser', () => {
        expect(sheetUtils.getTagById).toHaveBeenCalled();
      });
    });
  });

  describe('When createTag is called', () => {
    beforeEach(() => {
      const newTag: CreateTagDto = {
        Tag: 'TagId',
        name: 'Fulano de tal',
        status: 1,
        source: 12345,
        price: 12456,
      };
      tagsService.createTag(newTag);
    });
    describe('Then', () => {
      it('it should call createTag from sheet parser', () => {
        expect(sheetUtils.createTag).toHaveBeenCalled();
      });
    });
    describe('When updateTagById is called', () => {
      beforeEach(() => {
        tagsService.updateTagById('tagId', { Tag: 'TagId' });
      });
      describe('Then', () => {
        it('it should call updateTagById from sheet parser', () => {
          expect(sheetUtils.updateTagById).toHaveBeenCalled();
        });
      });
    });
    describe('When removeTagById is called', () => {
      beforeEach(() => {
        tagsService.removeTagById('tagId');
      });
      describe('Then', () => {
        it('it should call removeTagById from sheet parser', () => {
          expect(sheetUtils.removeTagById).toHaveBeenCalled();
        });
      });
    });
  });
});
