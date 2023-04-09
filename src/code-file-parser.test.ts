import fs from 'fs/promises';
import { CodeFileParser } from './code-file-parser';

describe('CodeFileParser', () => {
  describe('parseFile', () => {
    it('reads the content from a given file', async () => {
      const expectedFile = 'src/code-parser.ts';
      const readFileSpy = jest.spyOn(fs, 'readFile').mockResolvedValue('test file content');

      const sut = new CodeFileParser();
      await sut.parseFile(expectedFile);

      expect(readFileSpy).toHaveBeenCalledWith(expectedFile, 'utf-8');
    });

    it('returns metadata about the file', async () => {
      jest.spyOn(fs, 'readFile').mockResolvedValue('test content');

      const sut = new CodeFileParser();
      const result = await sut.parseFile('somefile');

      expect(result).toEqual({
        fileName: 'somefile',
        rawContent: 'test content',
      });
    });
  });
});