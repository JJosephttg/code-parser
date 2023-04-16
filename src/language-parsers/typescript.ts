import moo, { Token, Lexer } from 'moo';
import { CodeSymbol, LanguageParser } from '../types';

type SymbolTypes = 'variable';

export class TypeScriptParser implements LanguageParser<SymbolTypes> {
  public ruleSet = {
    main: {
      unknown: moo.error,
      variableDec: /const/,
    },
  };
  
  public parseFromSymbolType(token: Token, lexer: Lexer): CodeSymbol<SymbolTypes> | undefined {
    if (token.type === 'unknown') return undefined;
    return { type: 'variable' };
  }
}