import { Test, TestingModule } from '@nestjs/testing';
import { TagsController } from '@app/tags/tags.controller';
import { TagsService } from '@app/tags/tags.service';
import { CreateTagDto } from './dto/create-tag.dto';

const mockTagsService: TagsService = {
  getAll: jest.fn(),
  getTagById: jest.fn(),
  createTag: jest.fn(),
  updateTagById: jest.fn(),
  removeTagById: jest.fn(),
};

describe('TagsController', () => {
  let tagsController: TagsController;
  let tagsService: TagsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [TagsController],
      providers: [{ provide: TagsService, useValue: mockTagsService }],
    }).compile();

    tagsController = module.get<TagsController>(TagsController);
    tagsService = module.get<TagsService>(TagsService);
  });

  describe('When a getAll is called', () => {
    describe('Then', () => {
      beforeEach(() => {
        tagsController.GetAll();
      });
      it('it should call getAll from tagsService', () => {
        expect(tagsService.getAll).toHaveBeenCalled();
      });
    });
  });
  describe('When getTagById', () => {
    describe('Then', () => {
      beforeEach(() => {
        tagsController.getTagById('tagId');
      });
      it('it should call getTagById from tagsService', () => {
        expect(tagsService.getTagById).toHaveBeenCalled();
      });
    });
  });
  describe('When a createTag  is called', () => {
    describe('Then', () => {
      beforeEach(() => {
        const newTag: CreateTagDto = {
          Tag: 'TagId',
          name: 'Fulano de tal',
          status: 1,
          source: 12345,
          price: 12456,
        };
        tagsController.createTag(newTag);
      });
      it('it should call createTag from tagsService', () => {
        expect(tagsService.createTag).toHaveBeenCalled();
      });
    });
  });
  describe('When a updateTagById  is called', () => {
    describe('Then', () => {
      beforeEach(() => {
        tagsController.updateTagById('tagId', { Tag: 'TagId' });
      });
      it('it should call updateTagById from tagsService', () => {
        expect(tagsService.updateTagById).toHaveBeenCalled();
      });
    });
  });
  describe('When a removeTagById  is called', () => {
    describe('Then', () => {
      beforeEach(() => {
        tagsController.removeTagById('tagId');
      });
      it('it should call removeTagById from tagsService', () => {
        expect(tagsService.removeTagById).toHaveBeenCalled();
      });
    });
  });
});
