import moo from 'moo';
import { TypeScriptParser } from './typescript';

describe('TypeScriptParser', () => {
  it('returns no results for invalid syntax', () => {
    const [parser, lexer, token] = setupLexer('bleepbloop');
    const result = parser.parseFromSymbolType(token, lexer);
    expect(result).toEqual(undefined);
  });

  function setupLexer(content: string) {
    const parser = new TypeScriptParser();
    const lexer = moo.compile(parser.ruleSet);
    lexer.reset(content);
    const token = lexer.next();
    return [parser, lexer, token as moo.Token] as const;
  }
});