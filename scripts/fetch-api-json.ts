import { writeFileSync } from "fs";
import path from "path";

export async function fetchApiJson() {
    const sourceFilePath = path.resolve(__dirname, '../assets/data/api.json');
    const res = await fetch('https://misskey.noellabo.jp/api.json');
    const resText = await res.text();
    writeFileSync(sourceFilePath, resText);
    console.log('Misskey OpenAPI の取得完了');
}