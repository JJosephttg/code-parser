import { Lexer, Token, Rules } from 'moo';

export type RuleSet = { [state: string]: Rules };

export type CodeSymbol<LanguageSymbolTypes extends string = string> = {
  type: LanguageSymbolTypes;
};

export interface LanguageParser<SymbolTypes extends string = string> {
  ruleSet: RuleSet;
  parseFromSymbolType(token: Token, lexer: Lexer): CodeSymbol<SymbolTypes> | undefined;
};