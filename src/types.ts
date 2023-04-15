export type CodeSymbol<LanguageSymbolTypes extends string = string> = {
  type: LanguageSymbolTypes;
};

export interface LanguageParser<SymbolTypes extends string = string> {
  ruleSet: moo.Rules;
  parseFromSymbolType(rule: string): CodeSymbol<SymbolTypes> | undefined;
};