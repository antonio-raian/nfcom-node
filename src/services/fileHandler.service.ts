import * as fs from 'fs';
import { IFileHandler } from '../interfaces/fileHandler.interface';

export class FileHandler implements IFileHandler {
  async saveFile(content: string, path: string): Promise<void> {
    await fs.promises.writeFile(path, content, 'utf8');
  }

  async readFile(path: string): Promise<string> {
    return await fs.promises.readFile(path, 'utf8');
  }

  async exists(path: string): Promise<boolean> {
    try {
      await fs.promises.access(path);
      return true;
    } catch {
      return false;
    }
  }

  async mkdir(path: string): Promise<void> {
    await fs.promises.mkdir(path, { recursive: true });
  }
}
