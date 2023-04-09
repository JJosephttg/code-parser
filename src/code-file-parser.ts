import { readFile } from 'fs/promises';

export class CodeFileParser {
  public async parseFile(filePath: string) {
    const rawContent = await readFile(filePath, 'utf-8');
    return {
      fileName: filePath,
      rawContent,
    }
  }
}