import { readFile } from 'fs/promises';
import path from 'path';

export type CodeFile = {
  filePath: string;
  rawContent: string;
};

export class CodeFileParser {
  public async parseFile(filePath: string): Promise<CodeFile> {
    const rawContent = await readFile(filePath, 'utf-8');
    return {
      filePath: path.resolve(filePath),
      rawContent,
    }
  }
}