import express from "express";
import _checkAuth from "../utils/auth/checkAuth.js";
import ProductController from "../controllers/ProductController.js";
import ProductValidator from "../validations/ProductValidator.js";
import multer from "multer";

const ProductRouter = express.Router();
const upload = multer();

ProductRouter.route('/')
    .post( _checkAuth, ProductValidator, upload.array('photos'), ProductController.createProduct)
    .get(ProductController.getThirty);


ProductRouter.get('/:filters',ProductController.getThirty);


ProductRouter.route('/:id')
    .patch(_checkAuth, ProductValidator, upload.array('photos'), ProductController.editProduct)
    .delete(_checkAuth, ProductController.removeProduct);
ProductRouter.get('/:id', ProductController.getProduct);



export default ProductRouter;