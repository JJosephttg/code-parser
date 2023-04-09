import fs from 'fs/promises';
import path from 'path';
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

    it('returns raw content', async () => {
      const expectedContent = 'test file content';
      jest.spyOn(fs, 'readFile').mockResolvedValue(expectedContent);

      const sut = new CodeFileParser();
      const result = await sut.parseFile('somefile');

      expect(result.rawContent).toEqual(expectedContent);
    });

    it('returns absolute path to file parsed', async () => {
      const resolveSpy = jest.spyOn(path, 'resolve').mockReturnValueOnce('\\some\\path\\somefile.ts');
      jest.spyOn(fs, 'readFile').mockResolvedValue('');

      const sut = new CodeFileParser();
      const result = await sut.parseFile('somefile.ts');

      expect(resolveSpy).toHaveBeenCalledWith('somefile.ts');
      expect(result.filePath).toBe('\\some\\path\\somefile.ts');
    });
  });
});