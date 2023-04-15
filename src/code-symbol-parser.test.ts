import { CodeSymbolParser } from './code-symbol-parser';

describe('CodeSymbolParser', () => {
  describe('parseSymbols', () => {
    it('returns empty array when code file is empty', () => {
      const content = '';
      
      const sut = new CodeSymbolParser(content);
      const result = sut.parseSymbols();
      expect(result).toEqual([]);
    });
  });
});