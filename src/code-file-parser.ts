import { readFile } from 'fs/promises';
import path from 'path';
import { CodeLine, CodeLineParser } from './code-line-parser';

export type CodeFile = {
  filePath: string;
  rawContent: string;
  lines: CodeLine[];
};

export class CodeFileParser {
  public constructor(private readonly lineParser = new CodeLineParser()) {}
  
  public async parseFile(filePath: string): Promise<CodeFile> {
    const rawContent = await readFile(filePath, 'utf-8');
    
    return {
      filePath: path.resolve(filePath),
      rawContent,
      lines: this.lineParser.getLineInfo(rawContent),
    }
  }
}