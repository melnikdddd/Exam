import {body} from "express-validator";

const conditions = ['Used', 'New', 'Other'];

const checkObjLength = (obj, maxLength) => {
    return Object.keys(obj).length < maxLength;
}
const checkObjPropertyLength = (obj) =>{
    for (let key in obj){
        if (typeof obj[key] !=='string' && obj[key].length > 120){
           return false;
        }
    }
    return true;
}

const productValidator = [
    body('title','Title must been form 6 to 15 letters.').isLength({min: 6, max: 20}).optional(),
    body('text', 'Min length is 3 letters.').isLength({min: 8, max: 382}).optional(),
    body('city','This must be city').isString().optional(),
    body('imageOptions',"ImageData error").isObject(),
    body('rating').not().exists(),
    body('price','Invalid price number').isNumeric().custom(price =>{
        if (price.numeric > 1000000 || price.numeric < 0){
            throw new Error('Invalid price number')
        }
    }),
    body("currency", "Invalid type").isString().custom(type=>{
        if (!types.includes(type)){
            throw new Error("Invalid type");
        }
    }),
    body('characteristics').isObject().custom(obj=>{
        if (!checkObjLength){
            throw new Error('So many characteristics')
        }
        if (!checkObjPropertyLength(obj)){
            throw new Error('Invalid characteristic');
        }
    }).optional(),
    body('condition', 'Invalid condition').custom(value => {
        if (!conditions.includes(value)){
            throw new Error('Invalid condition')
        }
        return true;
    }).optional(),
    body().custom((value, {req})=>{
        if (req.files.length > 3){
            throw new Error('max 3')
        }
    })
]

export default productValidator