export type CodeLine = {
  rawLine: string;
};

export class CodeLineParser {
  public getLineInfo(line: string): CodeLine[] {
    return line.split('\n').map(l => ({ rawLine: l }));;
  }
}