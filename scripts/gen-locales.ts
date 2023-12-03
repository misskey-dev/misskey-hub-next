import * as fs from 'fs';
import * as path from 'path';
import * as yaml from 'js-yaml';

export function genLocalesJson() {
    const sourceDirectory = path.resolve(__dirname, '../locales/');
    const destinationDirectory = path.resolve(__dirname, '../locales_dist/');

    // ディレクトリ内のすべてのファイルを取得
    const files = fs.readdirSync(sourceDirectory);

    // 出力ディレクトリが存在しない場合は作成
    if (!fs.existsSync(destinationDirectory)) {
        fs.mkdirSync(destinationDirectory);
    }

    // 各ファイルを処理
    files.forEach((file) => {
        const fileMeta = path.parse(file);
        if (!['.yml', '.yaml'].includes(fileMeta.ext)) return;

        const sourceFilePath = path.join(sourceDirectory, file);
        const destinationFilePath = path.join(destinationDirectory, `${fileMeta.name}.json`);

        try {
            // YAMLファイルを読み込み
            const yamlContent = fs.readFileSync(sourceFilePath, 'utf-8');

            // YAMLをJSONに変換
            const jsonContent = yaml.load(yamlContent);

            // JSONをファイルに書き込み
            fs.writeFileSync(destinationFilePath, jsonContent ? JSON.stringify(jsonContent) : '{}');

            console.log(`Converted ${file} to ${fileMeta.name}.json`);
        } catch (error) {
            console.error(`Error processing ${file}`, error);
        }
    });

    console.log('Conversion complete.');
}