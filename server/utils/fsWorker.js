import * as fs from "fs";
import { fileURLToPath } from 'url';
import path from 'path';

const __filename = fileURLToPath(import.meta.url);
export const __dirname = path.dirname(__filename);

export const _decodingImageToString = (base64Image) => {
    const matches = base64Image.match(/^data:image\/([A-Za-z-+/]+);base64,(.+)$/);

    if (!matches || matches.length !== 3) {
        throw new Error('Invalid base64 image format');
    }

    const buffer = Buffer.from(matches[2], 'base64');
    return buffer.toString('utf-8');
}
export const _decodingImageFromPath =  (path) =>{
    return new Promise((resolve, reject) => {
        fs.readFile(path, {encoding: "base64"}, (err, data) =>{
            if (err){
                reject(err)
            } else {
                resolve(data);
            }
        })
    })

}
export const _decodingImagesFromArray = (images) =>{
    return images.map(image =>{
        return _decodingImageToString(image)
    })
}
