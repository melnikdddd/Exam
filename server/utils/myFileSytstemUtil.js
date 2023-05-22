import multer from "multer"
import express from "express";
import path from "path";
import * as fs from "fs";
import {fileURLToPath} from "url"

const __filename = fileURLToPath(import.meta.url);
export const __dirname = (__filename)

export const _createFile = (file, PATH) =>{
    const filePath = path.join(PATH, file.originalname);
    fs.renameSync(file.path, filePath);
}

export const _copyFile = (startPath, PATH) =>{
    fs.renameSync(startPath, PATH);
}
export const _createFiles = (files, PATH) =>{
    for (const [index = 1, file] of files){
        fs.renameSync(file.path, PATH + index + file.extname);
    }
}
export const _getUserDirPATH = (userId) =>{
    return  __dirname + 'db/' + userId;
}
export const _createUserFolder = (userId) =>{
    const PATH = _getUserDirPATH(userId);
    if (checkExist(PATH)){
        fs.mkdirSync(PATH);
        if (!createSubFolder(PATH + '/comments') || !createSubFolder(PATH + '/posts')){
            return false;
        }
        return PATH;
    }
    return false;
}
export const _deepRemoveDir = (folderPath) =>{
    if (fs.existsSync(folderPath)) {
        fs.readdirSync(folderPath).forEach((file) => {
            const curPath = path.join(folderPath, file);

            if (fs.lstatSync(curPath).isDirectory()) {
                _deepRemoveDir(curPath);
            } else {
                fs.unlinkSync(curPath);
            }
        });

        // Удаляем саму папку
        fs.rmdirSync(folderPath);
    }
}
export const _createSubFolder = (PATH) =>{
    if(checkExist(PATH)){
        fs.mkdirSync(PATH);
        return PATH;
    }
    return false;
}

export const _updateFiles = (files, PATH) =>{
    files.forEach(file =>{
        const filePath = PATH + file.originalname;
        if(fs.existsSync(filePath)){
            fs.unlinkSync(filePath);
        }
        _createFile(file, filePath);
    })

}

function checkExist(...PATHS){
    const checkingPath = path.join(...PATHS);
    if(!fs.existsSync(checkingPath)){
        return checkingPath;
    }
    return false;
}

export const _getFiles = (dirPath) =>{
    const files = [];

    const directoryContents = fs.readdirSync(dirPath);

    directoryContents.forEach((item) => {
        const itemPath = path.join(dirPath, item);

        const isFile = fs.statSync(itemPath).isFile();

        if (isFile) {
            files.push(item);
        }
    });

    return files;
}