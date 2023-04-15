import fs from 'fs/promises';
import path from 'path';
import { CodeFileParser } from './code-file-parser';

describe('CodeFileParser', () => {
  describe('parseFile', () => {
    it('reads the content from a given file', async () => {
      const expectedFile = 'src/code-parser.ts';
      const readFileSpy = mockFileContentRead('');

      const sut = new CodeFileParser();
      await sut.parseFile(expectedFile);

      expect(readFileSpy).toHaveBeenCalledWith(expectedFile, 'utf-8');
    });

    it('returns raw content', async () => {
      const expectedContent = 'test file content';
      mockFileContentRead(expectedContent);

      const sut = new CodeFileParser();
      const result = await sut.parseFile('somefile');

      expect(result.raw.content).toEqual(expectedContent);
    });

    it('returns absolute path to file parsed', async () => {
      const resolveSpy = jest.spyOn(path, 'resolve').mockReturnValueOnce('\\some\\path\\somefile.ts');
      mockFileContentRead('');

      const sut = new CodeFileParser();
      const result = await sut.parseFile('somefile.ts');

      expect(resolveSpy).toHaveBeenCalledWith('somefile.ts');
      expect(result.filePath).toBe('\\some\\path\\somefile.ts');
    });

    it('parses and returns a list of lines with their raw content', async () => {
      const content = 'line 1\nline 2\nline 3';
      mockFileContentRead(content);

      const lineParserSpy = jest.fn().mockReturnValue([{ rawLine: 'line 1' }, { rawLine: 'line 2' }, { rawLine: 'line 3' }]);
      const sut = new CodeFileParser({ parseLines: lineParserSpy });
      const result = await sut.parseFile('somefile.ts');

      expect(result.raw.lines).toEqual(['line 1', 'line 2', 'line 3']);
    });

    function mockFileContentRead(content: string) {
      return jest.spyOn(fs, 'readFile').mockResolvedValue(content);
    }
  });
});