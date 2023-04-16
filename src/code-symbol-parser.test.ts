import moo, { Lexer } from 'moo';
import { CodeSymbolParser } from './code-symbol-parser';
import { CodeSymbol, LanguageParser } from './types';

describe('CodeSymbolParser', () => {
  describe('parseSymbols', () => {
    it('returns empty array when no symbols', () => {
      const content = '';
      
      const result = new CodeSymbolParser(content, createMockLangParser()).parseSymbols();
      expect(result).toEqual([]);
    });

    it('returns array with parsed symbol when code matches a single symbol', () => {
      const content = 'const';
      const mockLangParser = createMockLangParser({ ...defaultRuleSet, variableDec: /const/ });
      const parseFromSymbolSpy = jest.spyOn(mockLangParser, 'parseFromSymbolType').mockReturnValueOnce({ type: 'variable' });

      const result = new CodeSymbolParser(content, mockLangParser).parseSymbols();
      expect(result).toEqual([{ type: 'variable' }]);
      expect(parseFromSymbolSpy).toHaveBeenCalledTimes(1);
      expect(parseFromSymbolSpy).toHaveBeenCalledWith(expect.objectContaining({ type: 'variableDec' }), expect.anything());
    });

    it('returns array with parsed symbols when code matches multiple symbols', () => {
      const content = 'constlet';
      const mockLangParser = createMockLangParser({ ...defaultRuleSet, variableDec1: /const/, variableDec2: /let/ });
      const parseFromSymbolSpy = jest.spyOn(mockLangParser, 'parseFromSymbolType')
        .mockReturnValueOnce({ type: 'variable1' })
        .mockReturnValueOnce({ type: 'variable2' });

      const result = new CodeSymbolParser(content, mockLangParser).parseSymbols();
      expect(result).toEqual([{ type: 'variable1' }, { type: 'variable2' }]);
      expect(parseFromSymbolSpy).toHaveBeenCalledTimes(2);
      expect(parseFromSymbolSpy).toHaveBeenNthCalledWith(1, expect.objectContaining({ type: 'variableDec1' }), expect.anything());
      expect(parseFromSymbolSpy).toHaveBeenNthCalledWith(2, expect.objectContaining({ type: 'variableDec2' }), expect.anything());
    });

    it('does not include undefined code symbols in result', () => {
      const content = 'bleh';
      const mockLangParser = createMockLangParser();
      const parseFromSymbolSpy = jest.spyOn(mockLangParser, 'parseFromSymbolType').mockReturnValueOnce(undefined);

      const result = new CodeSymbolParser(content, mockLangParser).parseSymbols();
      expect(result).toEqual([]);
      expect(parseFromSymbolSpy).toHaveBeenCalledTimes(1);
      expect(parseFromSymbolSpy).toHaveBeenCalledWith(expect.objectContaining({ type: 'unknown' }), expect.anything());
    });

    const defaultRuleSet = { unknown: moo.error };
    function createMockLangParser(ruleSet: moo.Rules = defaultRuleSet) {
      return {
        ruleSet,
        parseFromSymbolType: jest.fn(),
      } as LanguageParser;
    }
  });
});