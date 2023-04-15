enum CodeSymbolType {
  VARIABLE = 'variable',
}

export type CodeSymbol = {
  type: CodeSymbolType;
};

const REGEX_VARIABLE_MATCH = /const|let|var/g;

export class CodeSymbolParser {
  public constructor(private _codeContent: string) {}

  public parseSymbols(): CodeSymbol[] {
    return this._codeContent.match(REGEX_VARIABLE_MATCH)?.map(s => ({ type: CodeSymbolType.VARIABLE })) ?? [];
  }
}