import path from 'path';
import {fileURLToPath} from "url"
import fs from "fs"

const __filename = fileURLToPath(import.meta.url);
export const __dirname = path.join(path.dirname(__filename), '..')



export const _decodingImageToString = (base64Image) => {
    const matches = base64Image.match(/^data:image\/([A-Za-z-+/]+);base64,(.+)$/);

    if (!matches || matches.length !== 3) {
        throw new Error('Invalid base64 image format');
    }
    const fileExt = getFileExtensionFromFile(base64Image);

    const buffer = Buffer.from(matches[2], 'base64');

    return { data: buffer.toString('utf-8'),  ext: fileExt};
}
export const _decodingImageFromPath =  (path) =>{
    return new Promise((resolve, reject) => {
        fs.readFile(path, {encoding: "base64"}, (err, data) =>{
            if (err){
                reject(err)
            } else {
                const fileExt = getFileExtensionFromPath(path);
                resolve({data: data, ext: fileExt});
            }
        })
    })

}
export const _decodingImagesFromArray = (images) =>{
    return images.map(image =>{
        return _decodingImageToString(image)
    })
}

const getFileExtensionFromPath = (filePath) =>{
    return path.extname(filePath).slice(1).toLowerCase()
}

const getFileExtensionFromFile = (file) =>{
   const originalFileName = file.originalname;
   return originalFileName.substring(originalFileName.lastIndexOf('.')).slice(1);

}