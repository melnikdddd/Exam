export const _genSixDigitCode = () => {
    const min = 100000;
    const max = 999999;
    return Math.floor(Math.random() * (max - min + 1)) + min;
}


export const getImagesOptions = (file, imageOperation, imageFieldName) => {
    return {
        image: file || null,
        options: {
            operation: imageOperation || null,
            imageFieldName: imageFieldName,
        },
    }
}

