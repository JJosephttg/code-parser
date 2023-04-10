export type CodeLine = {
  rawLine: string;
};

export class CodeLineParser {
  public parseLines(line: string): CodeLine[] {
    return line.split('\n').map(l => ({ rawLine: l }));;
  }
}