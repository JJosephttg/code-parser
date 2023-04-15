import { CodeSymbolParser } from './code-symbol-parser';

describe('CodeSymbolParser', () => {
  describe('parseSymbols', () => {
    it('returns empty array when code file is empty', () => {
      const content = '';
      
      const result = new CodeSymbolParser(content).parseSymbols();
      expect(result).toEqual([]);
    });

    it('returns array with variable symbol when code has a single line, single variable symbol', () => {
      const content = 'const a = 1;';
      
      const result = new CodeSymbolParser(content).parseSymbols();
      expect(result).toEqual([{ type: 'variable' }]);
    })
  });
});