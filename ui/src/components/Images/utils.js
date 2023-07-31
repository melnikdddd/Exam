
export function decodeBase64Image(data, ext) {



    if (!data){
        return  process.env.PUBLIC_URL + "/user-avatar.png";
    }
    const base64 = arrayBufferToBase64(data);


    return `data:image/${ext};base64,` + base64.toString('base64');
}

export const defauldImage = () =>{
    return  process.env.PUBLIC_URL + "/user-avatar.png";
}


export function arrayBufferToBase64(buffer) {
    const binary = String.fromCharCode.apply(null, buffer);
    return btoa(binary);
}