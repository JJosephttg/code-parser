import moo from 'moo';
import { TypeScriptParser } from './typescript';

describe('TypeScriptParser', () => {
  it('returns no result for invalid syntax', () => {
    const [parser, lexer, token] = setupLexer('bleepbloop');
    const result = parser.parseFromSymbolType(token, lexer);
    expect(result).toEqual(undefined);
  });

  describe('Variable declaration', () => {
    describe('Valid variable declarations', () => {
      it('returns variable symbol for const variable declaration', () => {
        const [parser, lexer, token] = setupLexer('const foo = 5;');
        const result = parser.parseFromSymbolType(token, lexer);
        expect(result).toEqual({ type: 'variable' });
      });
  
      it('returns variable symbol for let variable declaration', () => {
        const [parser, lexer, token] = setupLexer('let foo = 5;');
        const result = parser.parseFromSymbolType(token, lexer);
        expect(result).toEqual({ type: 'variable' });
      });
  
      it('returns variable symbol for var variable declaration', () => {
        const [parser, lexer, token] = setupLexer('var foo = 5;');
        const result = parser.parseFromSymbolType(token, lexer);
        expect(result).toEqual({ type: 'variable' });
      });
    });
   
    describe('Invalid variable declarations', () => {
      it('returns nothing if only the variable declaration keyword is present', () => {
        const [parser, lexer, token] = setupLexer('const');
        const result = parser.parseFromSymbolType(token, lexer);
        expect(result).toEqual(undefined);
      });
  
      it('returns nothing if only assignment and var declaration keyword is present', () => {
        const [parser, lexer, token] = setupLexer('const =');
        const result = parser.parseFromSymbolType(token, lexer);
        expect(result).toEqual(undefined);
      });

      it('returns nothing if only name and const declaration keyword is present', () => {
        const [parser, lexer, token] = setupLexer('const foo');
        const result = parser.parseFromSymbolType(token, lexer);
        expect(result).toEqual(undefined);
      });
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