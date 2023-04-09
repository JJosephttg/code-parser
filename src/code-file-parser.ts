import { readFile } from 'fs/promises';
import path from 'path';

export class CodeFileParser {
  public async parseFile(filePath: string) {
    const rawContent = await readFile(filePath, 'utf-8');
    return {
      filePath: path.resolve(filePath),
      rawContent,
    }
  }
}