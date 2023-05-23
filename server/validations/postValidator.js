import {body} from "express-validator";

const postValidator = [
    body('title','Title must been form 6 to 15 letters.').isLength({min: 6, max: 20}),
    body('text', 'Min length is 3 letters.').isLength({min: 8, max: 382}),
    body('price','Invalid price number').isNumeric(),

    body().custom((value, {req})=>{
        if (req.files.length > 3){
            throw new Error('max 3')
        }
    })
]

export default postValidator