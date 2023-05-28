import multer from "multer"
export const _decodeImageToString = (base64Image) => {
    const matches = base64Image.match(/^data:image\/([A-Za-z-+/]+);base64,(.+)$/);

    if (!matches || matches.length !== 3) {
        throw new Error('Invalid base64 image format');
    }

    const buffer = Buffer.from(matches[2], 'base64');
    return buffer.toString('utf-8');
}
