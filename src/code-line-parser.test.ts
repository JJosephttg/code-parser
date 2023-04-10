import { CodeLineParser } from './code-line-parser';

describe('CodeLineParser', () => {
  it('parses and returns a list of lines with their raw content', async () => {
    const content = 'line 1\nline 2\nline 3';
    
    const sut = new CodeLineParser();
    const result = sut.getLineInfo(content);
    expect(result.map(l => l.rawLine)).toEqual(['line 1', 'line 2', 'line 3']);
  });
});