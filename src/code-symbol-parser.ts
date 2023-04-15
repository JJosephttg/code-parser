import moo from 'moo';
import { CodeSymbol, LanguageParser } from './types';

export class CodeSymbolParser<SymbolTypes extends string, LangParser extends LanguageParser<SymbolTypes>> {
  private _lexer;

  public constructor(private _codeContent: string, private _languageParser: LangParser) {
    this._lexer = moo.compile(_languageParser.ruleSet);
  }

  public parseSymbols(): CodeSymbol<SymbolTypes>[] {
    const results = [];
    this._lexer.reset(this._codeContent);

    let currentToken = this._lexer.next();
    while(currentToken) {
      const symbol = this._languageParser.parseFromSymbolType(currentToken.type as string);
      if (symbol) results.push(symbol);
      currentToken = this._lexer.next();
    }
    return results;
  }
}

// Structure of library
// Parsers:
// - FileParser
// - Specific symbol parsers (variables, functions, classes, etc.)

// Language specific parsing based on symbol:
// - TypescriptParser (Contains variable, function, class, etc. tokenizers)


// SymbolParser:
// takes string content and a class which contains a ruleset and a method to get the parser for the rule when it is found
// uses the ruleset from the language to interpret the file and choose the correct parser for each symbol which returns a code symbol object 

