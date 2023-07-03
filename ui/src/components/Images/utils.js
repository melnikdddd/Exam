export function decodeBase64Image(data, ext) {

    if (!data){
        return  process.env.PUBLIC_URL + "user-avatar.png";
    }

    const base64 = String.fromCharCode.apply(null, data);

    return `data:image/${ext};base64,` + base64;
}