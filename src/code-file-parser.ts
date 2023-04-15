import { readFile } from 'fs/promises';
import path from 'path';
import { CodeLine, CodeLineParser } from './code-line-parser';

export type CodeFile = {
  filePath: string;
  raw: {
    content: string;
    lines: string[];
  };
};

export class CodeFileParser {
  public constructor(private readonly lineParser = new CodeLineParser()) {}
  
  public async parseFile(filePath: string): Promise<CodeFile> {
    const rawContent = await readFile(filePath, 'utf-8');

    return {
      filePath: path.resolve(filePath),
      raw: {
        content: rawContent,
        lines: rawContent.split('\n'),
      },
    }
  }
}