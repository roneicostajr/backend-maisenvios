import { Tag } from '@app/types/tag.type';
import sheetUtils from '@app/utils/xlsx';

const mockWorkbook = {
  Sheets: {
    'Sheet 1': [
      {
        Tag: 'AA123456789ZZ',
        name: 'Fulano de Tal 1',
        source: 1,
        status: 1,
        price: 1,
      },
      {
        Tag: 'AB123456789ZZ',
        name: 'Fulano de Tal 2',
        source: 2,
        status: 2,
        price: 2,
      },
      {
        Tag: 'AC123456789ZZ',
        name: 'Fulano de Tal 3',
        source: 3,
        status: 3,
        price: 3,
      },
    ],
    'Sheet 2': {},
    'Sheet 3': {},
  },
  SheetNames: ['Sheet 1', 'Sheet 2', 'Sheet 3'],
};

jest.mock('xlsx', () => {
  const mockWorkbook = {
    Sheets: {
      'Sheet 1': [
        {
          Tag: 'AA123456789ZZ',
          name: 'Fulano de Tal 1',
          source: 1,
          status: 1,
          price: 1,
        },
        {
          Tag: 'AB123456789ZZ',
          name: 'Fulano de Tal 2',
          source: 2,
          status: 2,
          price: 2,
        },
        {
          Tag: 'AC123456789ZZ',
          name: 'Fulano de Tal 3',
          source: 3,
          status: 3,
          price: 3,
        },
      ],
      'Sheet 2': {},
      'Sheet 3': {},
    },
    SheetNames: ['Sheet 1', 'Sheet 2', 'Sheet 3'],
  };
  return {
    readFile: jest.fn(() => mockWorkbook),
    utils: {
      sheet_to_json: jest.fn(() => mockWorkbook.Sheets['Sheet 1']),
      json_to_sheet: jest.fn(),
    },
    writeFile: jest.fn(),
  };
});

describe('sheetUtils', () => {
  describe('When getAllRows is called', () => {
    it('Then it should return an array thats equal to the one from the sheet', () => {
      const sheetArray = sheetUtils.getAllRows();
      expect(sheetArray).toMatchObject(mockWorkbook.Sheets['Sheet 1']);
    });
  });

  describe('When getOneById is called', () => {
    describe(`When 'id' recieved is valid`, () => {
      it('Then it should return an array thats equal to the one from the sheet', () => {
        const response = sheetUtils.getTagById('AA123456789ZZ');
        expect(response).toMatchObject(mockWorkbook.Sheets['Sheet 1'][0]);
      });
    });
    describe(`When recieved id is not found`, () => {
      it('Then it should return an array thats equal to the one from the sheet', () => {
        const id = 'InvalidId';
        const response = sheetUtils.getTagById(id);
        expect(response).toBe(`Couldn't find tag with id: '${id}'`);
      });
    });
  });
  describe('When createTag is called', () => {
    const newTagCommon = {
      name: 'Fulano de Tal 4',
      source: 4,
      status: 4,
      price: 4,
    };
    describe('When new tag is valid', () => {
      it('Then it should return a succes response with crated tag data', () => {
        const newTag: Tag = {
          Tag: 'AD123456789ZZ',
          ...newTagCommon,
        };
        const response = sheetUtils.createTag(newTag);
        expect(response).toBe(`Created tag ${JSON.stringify(newTag)}`);
      });
    });
    describe('When tag id already exists', () => {
      it('Then it should return an error response', () => {
        const newTag: Tag = {
          Tag: 'AC123456789ZZ',
          ...newTagCommon,
        };
        const response = sheetUtils.createTag(newTag);
        expect(response).toBe(`[Error] Tag id already exists`);
      });
    });
    describe('When tag id does not match regex', () => {
      it('Then it should return an error response', () => {
        const newTag: Tag = {
          Tag: 'A_123489ZZ',
          ...newTagCommon,
        };
        const response = sheetUtils.createTag(newTag);
        expect(response).toBe(`[Error] Invalid tag`);
      });
    });
  });
  describe('When updateTagById is called', () => {
    const updatedTagData = { name: 'Fulano de Tal 4' };
    describe('When', () => {
      it('Then it should return an array thats equal to the one from the sheet', () => {
        const tagId = 'AA123456789ZZ';
        const response = sheetUtils.updateTagById(tagId, updatedTagData);
        expect(response).toBe(
          `Updated tag with id: '${tagId}' with data ${JSON.stringify(
            updatedTagData,
          )}`,
        );
      });
    });
    describe('When recieved id is not found', () => {
      it('Then it should return an array thats equal to the one from the sheet', () => {
        const tagId = 'AA123489ZZ';
        const response = sheetUtils.updateTagById(tagId, updatedTagData);
        expect(response).toBe(
          `[Error] Couldn't update. Tag with id: '${tagId}' not found.`,
        );
      });
    });
  });
  describe('When removeTagById is called', () => {
    describe('When', () => {
      it('Then it should return an array thats equal to the one from the sheet', () => {
        const tagId = 'AA123456789ZZ';
        const response = sheetUtils.removeTagById(tagId);
        expect(response).toBe(`Tag removed succesfully`);
      });
    });
    describe('When recieved is not found', () => {
      it('Then it should return an array thats equal to the one from the sheet', () => {
        const tagId = 'AA123789ZZ';
        const response = sheetUtils.removeTagById(tagId);
        expect(response).toBe(
          `[Error] Couldn't remove. Tag with id: '${tagId}' not found`,
        );
      });
    });
  });
});
