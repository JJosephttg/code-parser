import moo from 'moo';
import { TypeScriptParser } from './typescript';

describe('TypeScriptParser', () => {
  it('returns no result for invalid syntax', () => {
    const [parser, lexer, token] = setupLexer('bleepbloop');
    const result = parser.parseFromSymbolType(token, lexer);
    expect(result).toEqual(undefined);
  });

  describe('variable declaration', () => {
    it('returns variable symbol for const variable declaration', () => {
      const [parser, lexer, token] = setupLexer('const foo = 5;');
      const result = parser.parseFromSymbolType(token, lexer);
      expect(result).toEqual({ type: 'variable' });
    });
  });

  function setupLexer(content: string) {
    const parser = new TypeScriptParser();
    const lexer = moo.states(parser.ruleSet);
    lexer.reset(content);
    const token = lexer.next();
    return [parser, lexer, token as moo.Token] as const;
  }
});