import path from 'path';
import fs from 'fs';

export const fetchAsvsData = () => {
  const filePath = path.join(process.cwd(), 'docs', 'asvs.json')
  const fileContents = fs.readFileSync(filePath, 'utf8')
  return JSON.parse(fileContents)
}
