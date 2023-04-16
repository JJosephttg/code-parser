import moo from 'moo';
import { CodeSymbol, LanguageParser } from './types';

export class CodeSymbolParser<SymbolTypes extends string, LangParser extends LanguageParser<SymbolTypes>> {
  private _lexer;

  public constructor(private _codeContent: string, private _languageParser: LangParser) {
    this._lexer = moo.states(_languageParser.ruleSet);
  }

  public parseSymbols(): CodeSymbol<SymbolTypes>[] {
    const results = [];
    this._lexer.reset(this._codeContent);

    for (let currentToken = this._lexer.next(); currentToken; currentToken = this._lexer.next()) {
      const symbol = this._languageParser.parseFromSymbolType(currentToken, this._lexer);
      if (symbol) results.push(symbol);
    }
    return results;
  }
}

