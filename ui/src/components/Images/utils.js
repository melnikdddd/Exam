export function decodeBase64Image(base64String, ext) {
    const base64 = String.fromCharCode.apply(null, base64String);
    const image = new Image();
    image.src = `data:image/${ext};base64,` + base64;
    return image;
}