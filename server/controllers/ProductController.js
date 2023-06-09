import {_decodingImagesFromArray} from "../utils/fsWorker.js";
import ModelsWorker from "../utils/modelsWorker.js";
import ProductModel from "../models/ProductModel.js";
const modelsWorker = new ModelsWorker(ProductModel);





class ProductController {
    createProduct = async (req, res) => {
        try {
            const {rating, ...body} = req.body;

            //userId берется из middleware функции checkAuth
            const owner = req.userId;

            const decodedImages = [];
            if (req.body.files){
                const files = req.body.files;
               decodedImages.push(..._decodingImagesFromArray(files))
            }


            const doc = new ProductModel({...body, images: decodedImages, owner});

            const product = await doc.save();
            res.json(product);

        } catch (err) {
            console.log(err);
            res.status(500).json({
                message: 'Error, try again later please'
            })

        }
    }
    getProduct = async (req, res) => {
        try {
            const productId = req.params.id;

            const doc = await ProductModel.findOneAndUpdate({_id: productId},
                {$inc: {viewsCount: 1}},
                {returnDocument: 'after'}).populate('Comment');
            res.json(doc);

        } catch (e) {
            console.log(e)
            res.status(500).json({
                message: 'Error, try again later please'
            })
        }
    }
    removeProduct = async (req, res) => {
        const productId = req.params.id;
        const userId = req.body.userId;
        if (userId !== req.userId){
            return res.status(450).json({message:'you cant do it'})
        }

        try {
            await ProductModel.findOneAndRemove({
                _id: productId
            })
            res.json({success: 'true'})
        } catch (e) {
            res.json({success: 'false', message: e})
        }
    }
    editProduct = async (req, res) => {
        try {
            const productId = req.params.id;
            const userId = req.body.userId;

            if (req.userId !== userId){
                return res.status(450).json({message: "you cant do it"})
            }

            const {imageOptions, rating, ...body} = req.body;
            const imageData = this.#service.getImagesOptions(req.files, imageOptions);



            //задаю только те значение, которые можно поменять

            modelsWorker.setImageWorkerOptions(imageData.options.operation, imageData.options.operationType);

           const result = await modelsWorker.findAndUpdate(productId, body, imageData.imagesParams);

            return res.status(200).json(result);
        }
        catch (e){
            console.log(e);
            return res.status(400).json({success: false, message: e})
        }
    }
    getThirty = async (req, res) => {
        try {
            const startIndex = req.body.startIndex;
            const queryParams = req.params
            const query = ProductModelf.find();
            if (queryParams.filters){
               const parsedFilters = this.#service.parseQueryParams(queryParams.filters)
                console.log(parsedFilters)
                query.where(parsedFilters);
            }

            const products = await query.skip(startIndex).limit(30).exec();
            return res.json({...products});

        } catch (error) {
            console.log(error)
            return res.status(500).json({message: 'Something goes wrong with db'})
        }
    }

    //дописать когда буду работать с фронтом
    updateRating = async(req, res) =>{
        try {
            const userId = req.userId;
            const {productId, rateNum} = req.body.productId;

           const flag =  await ProductModel.findOneAndUpdate({productId},(document)=>{
                if(userId === document._id){
                    return false;
                }
               const vote = document.idOfUsersVotes.includes(userId) ? 0 : 1;
                document.rating = this.#service.calculateRating(document.rating, {rateNum, vote});
                return true;
            });

            return res.status(200).json({success: flag});

        } catch (Error){

        }

    }


    #service = {
        calculateRating: (rating, {rateNum, vote}) => {
            return {
                votes: rating.votes + vote,
                ratingNumber: rating.ratingNumber + rateNum
            }
        },
        getImagesOptions(files, bodyImageOptions){
            return {
                imagesParams: {
                    images: files,
                    indexes: bodyImageOptions?.indexes
                },
                options: {
                    operation: bodyImageOptions?.operation,
                    operationType:  "array"
                },
            }
        },
        parseQueryParams(filters){
            const filterParams = filters.split('&');

            // Создаем объект для хранения параметров фильтра
            const filterObj = {};

            // Обрабатываем каждый параметр фильтра
            filterParams.forEach(param => {
                const [key, value] = param.split('=');
                // Удаляем лишние кавычки из значения
                const processedValue = value.replace(/"/g, '');
                filterObj[key] = processedValue;
            });

            return filterObj;
        }
    }


}

export const getUserProducts = async (ownerId) => {
    try {
        return await ProductModel.find({owner: ownerId}).populate('User').exec();
    } catch (e) {
        return false;
    }
}


export default new ProductController;