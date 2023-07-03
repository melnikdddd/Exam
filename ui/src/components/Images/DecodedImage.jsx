import {decodeBase64Image} from "./utils";


const DecodedImageFromBase64 = (props) =>{
    const image = decodeBase64Image(props.data.data, props.ext);

    return <div className={props.className}>
        <img src={image.src} alt={"userImage"} className={"w-full h-full rounded-full"}/>
    </div>
}

export default DecodedImageFromBase64;