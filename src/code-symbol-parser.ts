enum CodeSymbolType {
  VARIABLE = 'variable',
}

export type CodeSymbol = {
  type: CodeSymbolType;
};

export class CodeSymbolParser {
  public constructor(private _codeContent: string) {}

  public parseSymbols(): CodeSymbol[] {
    return this._codeContent ? [{ type: CodeSymbolType.VARIABLE }] : [];
  }
}