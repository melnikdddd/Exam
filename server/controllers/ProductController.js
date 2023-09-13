import ModelsWorker, {removeUserProductsType} from "../utils/Model/modelsWorker.js";
import {compressImage, getFileExtensionFromFilename} from "../utils/SomeUtils/fsWorker.js";
import ProductModel from "../models/ProductModel.js";
import {generateUniqueCode, getImagesOptions} from "../utils/SomeUtils/someFunctions.js";
import UserModel from "../models/UserModel.js";

import {addUserProductsType} from "../utils/Model/modelsWorker.js";


export const productTypes = ["All", "Clothes", "Cosmetics", "Medicine", "Goods for children", "Phones", "Appliances"];


const modelWorker = new ModelsWorker(ProductModel);

class ProductController {
    createProduct = async (req, res) => {
        try {
            const ownerId = req.userId;
            const body = req.body;


            // const decodedImages = [];
            // if (req.body.files){
            //     const files = req.body.files;
            //    decodedImages.push(..._decodingImagesFromArray(files))
            // }

            const file = req.file;


            const ext = getFileExtensionFromFilename(file.originalname);

            const productCoverBuffer =
                await compressImage(file.buffer, ext)

            if (!productCoverBuffer) {
                return res.status(500).json({success: false, message: "Server error"});
            }


            const flag = await addUserProductsType(ownerId, body.productType);

            if (!flag) {
                return res.status(500).json({success: false, message: "User cant find"});
            }

            const code = generateUniqueCode();

            const doc = new ProductModel({
                ...body,
                productCover: {
                    data: productCoverBuffer,
                    ext: ext,
                },
                code: code,
                owner: ownerId,
            });


            const product = await doc.save();
            res.status(200).json({success: true, product: product});

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
            const userId = req.query.userId;

            console.log(userId);


            const product = await ProductModel.findById(productId);

            if (!product) {
                return res.status(404).json({success: false, message: "Cant find"});
            }


            if (userId && product.owner.toString() !== userId) {
                product.viewsCount++;
                await product.save();
            }


            const owner = await UserModel
                .findById(product.owner)
                .select("_id firstname lastname rating userAvatar");

            return res.status(200).json({product, owner});
        } catch (e) {
            console.log(e)
            res.status(500).json({
                message: 'Error, try again later please'
            })
        }
    }
    removeProduct = async (req, res) => {
        const productId = req.params.id;
        const userId = req.userId;

        console.log(req.body.productType);

        try {
            await ProductModel.findOneAndRemove({
                _id: productId
            })

            console.log(userId);

            await removeUserProductsType(userId, req.body.productType);

            return res.status(200).json({success: 'true'})
        } catch (e) {
            console.log(e);
            return res.json({success: 'false', message: e})
        }
    }
    editProduct = async (req, res) => {
        try {
            const productId = req.params.id;


            const {imageOperation, ...body} = req.body;


            const imageData
                = getImagesOptions(req.file, imageOperation, "productCover");

            //задаю только те значение, которые можно поменять

            modelWorker.setImageWorkerOptions(imageData.options.operation, imageData.options.imageFieldName);

            const result = await modelWorker.findAndUpdate(productId, body, imageData.image);
            return res.status(200).json(result);
        } catch (e) {
            console.log(e);
            return res.status(400).json({success: false, message: e})
        }
    }

    getProductsTypesWithMaxPrice = async (req, res) => {
        try {
            const result = await ProductModel.aggregate([
                {
                    $group: {
                        _id: '$productType',
                        maxPrice: {$max: '$price'},
                    },
                },
                {
                    $project: {
                        _id: 0,
                        productType: '$_id',
                        maxPrice: 1,
                    },
                },
            ]);

            const resultMap = [];

            result.forEach((item) => {
                resultMap.push({name: item.productType, price: item.maxPrice})
            });


            resultMap.unshift({
                name: "All",
                price: this.#service.findMaxPrice(resultMap)
            })

            return res.status(200).json({
                success: true,
                categoryWithPrice: resultMap
            })
        } catch (e) {
            console.log(e);
            return res.status(500).json({
                success: false,
                message: "Server error"
            })
        }
    }

    // getThirty = async (req, res) => {
    //     try {
    //         const startIndex = req.body.startIndex;
    //         const queryParams = req.params
    //         const query = ProductModel.find();
    //         if (queryParams.filters) {
    //             const parsedFilters = this.#service.parseQueryParams(queryParams.filters)
    //             console.log(parsedFilters)
    //             query.where(parsedFilters);
    //         }
    //
    //         const products = await query.skip(startIndex).limit(30).exec();
    //         return res.json({...products});
    //
    //     } catch (error) {
    //         console.log(error)
    //         return res.status(500).json({message: 'Something goes wrong with db'})
    //     }
    // }

    getProductTypes = async (req, res) => {
        return res.status(200).json({types: productTypes});
    }


    #service = {
        findMaxPrice: (productsTypes) => {
            let maxPrice = 0;
            productsTypes.forEach(item=>{
                if (item.price > maxPrice) {
                    maxPrice = item.price;
                }
            })
            return maxPrice;
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