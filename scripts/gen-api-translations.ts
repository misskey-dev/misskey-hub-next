// API用ファイル自動生成
import * as misskey from "misskey-js";
import yaml from "js-yaml";
import fs from "fs";
import path from "path";
import type { OpenAPIV3_1 } from "openapi-types";

// オブジェクト obj1 にないキーだけを、元オブジェクトにマージする関数
function mergeObjects(obj1: Record<string, any>, obj2: Record<string, any>): Record<string, any> {
    for (var key in obj2) {
        if (!obj1.hasOwnProperty(key)) {
            obj1[key] = obj2[key];
        } else if (typeof obj1[key] === 'object' && typeof obj2[key] === 'object') {
            mergeObjects(obj1[key], obj2[key]);
        }
    }
    return obj1;
}

const createFile = (filename: string, data: string): void => {
    const filePath = filename;

    fs.writeFile(filePath, data, { encoding: 'utf-8' }, (err) => {
        // ディレクトリ作成できなかったとき
        if (err && err.code === "ENOENT") {
            // ディレクトリ部分だけ切り取り
            const dir = filePath.substring(0, Math.max(filePath.lastIndexOf("/"), filePath.lastIndexOf("\\")));

            // 親ディレクトリ作成
            fs.mkdir(dir, { recursive: true }, (err) => {
                if (err) throw err;
                createFile(filename, data);
            });
            return;
        }
    });
};

function getSchemaKeys(content: any): string[] | null {
    return content["application/json"]?.schema?.properties ? Object.keys(content["application/json"].schema.properties) : null;
}

/** API関連のファイルを自動生成 */
export async function genApiFiles() {

    const out: Record<string, any> = {
        _api: {
            // 権限
            _permissions: {
                _types: {},
            },

            // レスポンスコードの説明
            _responseCodes: {},
        }
    };

    // 権限
    misskey.permissions.forEach((permission) => {
        out._api._permissions._types[permission] = '（説明がありません）';
    });

    // エンドポイント
    const ep = await fetch('https://misskey.noellabo.jp/api.json');
    const epj = await ep.json() as OpenAPIV3_1.Document;
    const endpointsTLs: Record<string, any> = {};
    Object.keys(epj.paths!).forEach((path) => {

        (Object.keys(epj.paths![path]!) as (keyof OpenAPIV3_1.PathItemObject)[]).forEach((method) => {
            const epjMethod = epj.paths![path]![method]!;

            if (typeof epjMethod !== 'object') return;

            endpointsTLs[path] = {};

            // 各エンドポイントのページ要素に合わせる
            endpointsTLs[path][method] = {
                description: '（説明がありません）',
            };

            if ('requestBody' in epjMethod && 'content' in epjMethod.requestBody! && getSchemaKeys(epjMethod.requestBody?.content ?? {}) !== null) {
                endpointsTLs[path][method].requestBody = Object.fromEntries(getSchemaKeys(epjMethod.requestBody.content)!.map((v) => [v, '（説明がありません）']));
            }

            if (!('responses' in epjMethod)) return;

            Object.keys(epjMethod.responses).forEach((responseCode) => {
                const responseBody = epjMethod.responses[responseCode].content ? epjMethod.responses[responseCode].content : null;

                if (!out._api._responseCodes[responseCode]) {
                    out._api._responseCodes[responseCode] = epjMethod.responses[responseCode].description;
                }

                if (!responseBody) {
                    return;
                }

                if (getSchemaKeys(responseBody) !== null) {
                    endpointsTLs[path][method].response = Object.fromEntries(getSchemaKeys(responseBody)!.map((v) => [v, '（説明がありません）']));
                }

                /*
                if (responseBody.schema['$ref'] === "#/components/schemas/Error") {
                    const key = Object.keys(responseBody.examples)[0];
                    if (!out._api._errors[responseBody.examples[key].value.error.id]) {
                        out._api._errors[responseBody.examples[key].value.error.id] = responseBody.examples[key].value.error.message;
                    }
                }
                */
            });

        });
    });

    // 翻訳を追記
    const tlSourceFilePath = path.resolve(__dirname, '../locales/ja-JP.yml');
    const tlSourceFile = fs.readFileSync(tlSourceFilePath, 'utf-8');
    const tlSourceObj = yaml.load(tlSourceFile) as object;
    const newTlSource = mergeObjects(tlSourceObj, out);
    fs.writeFileSync(tlSourceFilePath, yaml.dump(newTlSource, { indent: 2, forceQuotes: true, quotingType: '"', }));
    console.log("翻訳の書き込み完了");

    // Contentのjsonを更新
    const targetEPPath = path.resolve(__dirname, '../content/api-docs/endpoints');
    Object.keys(epj.paths).forEach((eppath) => {
        const sanitizedPathName = eppath.replace(/^\//, '');

        const targetObj: Record<string, any> = {
            _TYPE_: 'API_DOCUMENT',

            data: epj.paths[eppath],
        };
        targetObj.title = sanitizedPathName;

        createFile(path.join(targetEPPath, `${eppath}.json`), JSON.stringify(targetObj));
    });
    console.log("エンドポイント定義上書き完了");

    // Contentの翻訳用jsonを更新
    const targetEPIPath = path.resolve(__dirname, '../content/ja/endpoints-i18n');
    Object.keys(endpointsTLs).forEach((eppath) => {
        const sanitizedPathName = eppath.replace(/^\//, '');

        const targetObj: Record<string, any> = {
            data: endpointsTLs[eppath],
            title: sanitizedPathName,
            description: '（説明がありません）',
        };

        let out = targetObj;

        if (fs.existsSync(path.join(targetEPIPath, `${eppath}.json`))) {
            const mobj = JSON.parse(fs.readFileSync(path.join(targetEPIPath, `${eppath}.json`), 'utf-8'));
            out = mergeObjects(mobj, targetObj);
        }

        createFile(path.join(targetEPIPath, `${eppath}.json`), JSON.stringify(out, null, "\t"));
    });
    console.log("エンドポイント定義上書き完了");


    // スキーマを取り出す
    const schemaSourceFilePath = path.resolve(__dirname, '../assets/data/api-schemas.ts');
    const schemas = epj.components.schemas;
    const schemaTsOut = ['/** This file is auto-generated */'];
    Object.keys(schemas).forEach((schema) => {
        schemaTsOut.push(`export const ${schema} = ${JSON.stringify(schemas[schema])};`);
    });
    fs.writeFileSync(schemaSourceFilePath, schemaTsOut.join('\n'));
    console.log("APIスキーマの上書き完了");
}
