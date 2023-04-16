import moo, { Token, Lexer } from 'moo';
import { LanguageParser } from '../types';

type SymbolTypes = 'variable';

export class TypeScriptParser implements LanguageParser<SymbolTypes> {
  public ruleSet = { unknown: moo.error };
  
  public parseFromSymbolType(token: Token, lexer: Lexer) {
    return undefined;
  }
}