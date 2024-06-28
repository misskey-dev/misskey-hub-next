import fs from 'fs';
import { resolve, dirname } from 'path';
import { fileURLToPath } from 'url';

export function getStaticEndpoints(): string[] {
    const __dirname = dirname(fileURLToPath(import.meta.url))
    const dir = resolve(`${__dirname}/../app/pages`);
    const files = getFiles(dir);
    const filtered = files
        .filter((file) => !file.includes('slug')) // exclude dynamic content
        .filter((file) => !/-ignore\.vue$/.test(file)) // ignore
        .map((file) => file.split('pages')[1])
        .map((file) => file.replaceAll('\\', '/'))
        .map((file) => {
            if (/(index)?(\.(server|client))?\.vue$/.test(file)) {
                const path = file.replace(/(index)?(\.(server|client))?\.vue$/, '');
                return path.endsWith('/') ? path : path + '/';
            }
            return file.split('.vue')[0] + '/';
        });
    return filtered;
}

/**
 * recursively get all files from /pages folder
 */
function getFiles(dir: string): string[] {
    const dirents = fs.readdirSync(dir, { withFileTypes: true });
    const files = dirents.map((dirent) => {
        const res = resolve(dir, dirent.name);
        return dirent.isDirectory() ? getFiles(res) : res;
    })
    return files.flat();
}
