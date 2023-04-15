import { CodeSymbolParser } from './code-symbol-parser';

describe('CodeSymbolParser', () => {
  describe('parseSymbols', () => {
    it('returns empty array when code file is empty', () => {
      const content = '';
      
      const result = new CodeSymbolParser(content).parseSymbols();
      expect(result).toEqual([]);
    });

    describe('Single line', () => {
      it('returns array with variable symbol when code has a single line, single variable symbol', () => {
        const content = 'const a = 1;';
        
        const result = new CodeSymbolParser(content).parseSymbols();
        expect(result).toEqual([{ type: 'variable' }]);
      });
  
      it('returns array with multiple variable symbols when code has a single line, multiple variable declarations', () => {
        const content = 'const a = 1; const b = 2;';
        
        const result = new CodeSymbolParser(content).parseSymbols();
        expect(result).toEqual([{ type: 'variable' }, { type: 'variable' }]);
      });
    });

    it('returns symbols for mixture of let and const and var', () => {
      const content = 'const a = 1;let b = 2;\nvar c = 3;';
      
      const result = new CodeSymbolParser(content).parseSymbols();
      expect(result).toEqual([{ type: 'variable' }, { type: 'variable' }, { type: 'variable' }]);
    });
  });
});