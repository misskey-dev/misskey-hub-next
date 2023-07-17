// API用翻訳ファイル自動生成
import { locales } from "@/nuxt.config";
import * as misskey from "misskey-js";
import yaml from "js-yaml";
import path from "path";

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

export function genApiTranslationFiles() {

    const out: Record<string, any> = {
        _permissions: {},
        _entities: {},
    };

    // 権限
    misskey.permissions.forEach((permission) => {
        out._permissions[permission] = 'Untranslated / 未翻訳';
    });
    
    // エンティティ(TODO)
}
