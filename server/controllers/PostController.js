import PostModel from "../models/PostModel.js";
import {__dirname, _decodingImageFromPath, _decodingImagesFromArray} from "../utils/fsWorker.js";
import ModelsWorker from "../utils/db/modelsWorker.js";
const modelsWorker = new ModelsWorker(PostModel);





class PostController {
    createPost = async (req, res) => {
        try {
            const body = req.body;

            //userId берется из middleware функции checkAuth
            const owner = req.userId;

            const decodedImages = [];
            if (req.body.files){
                const files = req.body.files;
               decodedImages.push(..._decodingImagesFromArray(files))
            } else{
                decodedImages.push(await _decodingImageFromPath(__dirname +'/none-file.png'));
            }


            const doc = new PostModel({...body, images: decodedImages, owner});

            const post = await doc.save();
            res.json(post);

        } catch (err) {
            console.log(err);
            res.status(500).json({
                message: 'Error, try again later please'
            })

        }
    }
    getPost = async (req, res) => {
        try {
            const postId = req.params.id;

            const doc = await PostModel.findOneAndUpdate({_id: postId},
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
    removePost = async (req, res) => {
        const postId = req.params.id;

        try {
            await PostModel.findOneAndRemove({
                _id: postId
            })
            res.json({success: 'true'})
        } catch (e) {
            res.json({success: 'false', message: e})
        }
    }
    editPost = async (req, res) => {
        try {
            const postId = req.params.id;

            const {imageOptions, ...body} = req.body;
            const imageData = this.#service.getImagesOptions(req.files, imageOptions);



            //задаю только те значение, которые можно поменять

            modelsWorker.setImageWorkerOptions(imageData.options.operation, imageData.options.operationType);

           const result = await modelsWorker.findAndUpdate(postId, body, imageData.imagesParams);

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
            const query = PostModel.find();
            if (queryParams.filters){
               const parsedFilters = this.#service.parseQueryParams(queryParams.filters)
                console.log(parsedFilters)
                query.where(parsedFilters);
            }

            const posts = await query.skip(startIndex).limit(30).exec();
            return res.json({...posts});

        } catch (error) {
            console.log(error)
            return res.status(500).json({message: 'Something goes wrong with db'})
        }
    }

    //дописать когда буду работать с фронтом
    updateRating = async(req, res) =>{
        try {
            const userId = req.userId;
            const {postId, rateNum} = req.body.postId;

           const flag =  await PostModel.findOneAndUpdate({postId},(document)=>{
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
                    images: files || null,
                    indexes: bodyImageOptions.indexes || null,
                },
                options: {
                    operation: bodyImageOptions.operation|| null,
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

export const getUserPosts = async (ownerId) => {
    try {
        return await PostModel.find({ownerId}).populate('User').exec();
    } catch (e) {
        return false;
    }
}

export default new PostController;