import React, {useEffect, useState} from 'react';
import BackGround from "../../components/Wrapper/BackGround/BackGround";
import Container from "../../components/Wrapper/Container/Container";
import {useForm} from "react-hook-form";
import ProductInput from "./CreateProductInput/ProductInput";
import {fetchGet} from "../../utils/Axios/axiosFunctions";
import Select from "../../components/Inputs/Select/Select";
import ProductCover from "../../components/Images/ProductCover/ProductCover";
import ProductImage from "../../components/Images/ProductImage/ProductImage";

import styles from "./CreateProduct.module.scss"


function CreateProduct(props) {

    const {
        formState: {
            isValid,
            errors
        },
        register,
        onSubmit,
        setError,
    } = useForm({mode: "onChange"})


    const [productsType, setProductsType] = useState([]);
    const [selectedProductType, setSelectedProductType] = useState([]);


    const [productCover, setProductCover] = useState(process.env.PUBLIC_URL + "/DefaultProductImage.png");
    const [uploadedImage, setUploadedImage] = useState(null);
    const [isImageRemoved, setIsImageRemoved] = useState(null)


    const handleProductCoverClick = (event) => {
        document.getElementById("productCoverChange").click();
    }
    const handleProductCoverFileChange = (event) => {
        const file = event.target.files[0];
        setUploadedImage(file);
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setProductCover(reader.result)
                setIsImageRemoved(false);
            }
            reader.readAsDataURL(file);
        }

    }

    useEffect(() => {
        const getProductsTypes = async () => {
            const types = await fetchGet("/products/types")
            types.data.types[0] = "None";
            setProductsType(types.data.types);

            if (productsType.length > 0) {
                setSelectedProductType(productsType[0])
            }
        }
        getProductsTypes();

    }, []);


    return (
        <BackGround background={"linear-gradient(160deg, #0093E9 0%, #80D0C7 100%)"}>
            <Container>
                <form className={styles.wrap}>
                    <div className={"text-center"}>
                        <h1 className={"text-2xl text-slate-700"}>Add your own product and start earning money.</h1>
                    </div>
                    <div className={`${styles.inputsWrap} items-start flex-col`}>
                        <label>Add product title, it will show up as your item's "name" when searching.</label>
                        <ProductInput type="text" placeholder={"Title"} className={"w-1/2 min-w-[310px]"}
                                      {...register("title", {
                                          required: {
                                              value: true,
                                              message: "Title is required",
                                          }
                                      })}/>
                    </div>
                    <div className={`${styles.inputsWrap} flex-col`}>
                        <label>Choose a category for your product.</label>
                        <Select className={"w-1/3 mt-0 min-w-[310px] max-w-[350px]"} selectColor={"green"}>
                            {productsType.map((product, index) => (
                                <option key={index}>
                                    {product}
                                </option>
                            ))}
                        </Select>
                    </div>
                    <div className={`${styles.inputsWrap} flex-row items-center justify-around ${styles.imagesMediaWrap}`}>
                        <div className={"flex-col mt-3"}>
                            <label>
                                Add a cover to your product.
                            </label>
                            <ProductCover isChanged={true}
                                          image={productCover}
                                          className={"h-72"}
                                          onClick={handleProductCoverClick}
                            />

                            <input type="file" hidden={true} onInput={handleProductCoverFileChange}
                                   id={"productCoverChange"} accept={".jpg,.jpeg"}
                                   {...register('productCover')}
                            />
                        </div>
                        <div className={"flex-col mt-3"}>
                            <label>Don't forget to add images!</label>
                            <table>
                                <tbody>
                                <tr>
                                    <td>
                                        <ProductImage className={"w-24 h-24"}
                                                      image={process.env.PUBLIC_URL + "/DefaultProductImage.png"}/>
                                    </td>
                                    <td>
                                        <ProductImage className={"w-24 h-24"}
                                                      image={process.env.PUBLIC_URL + "/DefaultProductImage.png"}/>
                                    </td>
                                    <td>
                                        <ProductImage className={"w-24 h-24"}
                                                      image={process.env.PUBLIC_URL + "/DefaultProductImage.png"}/>
                                    </td>
                                </tr>
                                <tr>
                                    <td>
                                        <ProductImage className={"w-24 h-24"}
                                                      image={process.env.PUBLIC_URL + "/DefaultProductImage.png"}/>
                                    </td>
                                    <td>
                                        <ProductImage className={"w-24 h-24"}
                                                      image={process.env.PUBLIC_URL + "/DefaultProductImage.png"}/>
                                    </td>
                                    <td>
                                        <ProductImage className={"w-24 h-24"}
                                                      image={process.env.PUBLIC_URL + "/DefaultProductImage.png"}/>
                                    </td>
                                </tr>
                                <tr>
                                    <td>
                                        <ProductImage className={"w-24 h-24"}
                                                      image={process.env.PUBLIC_URL + "/DefaultProductImage.png"}/>
                                    </td>
                                    <td>
                                        <ProductImage className={"w-24 h-24"}
                                                      image={process.env.PUBLIC_URL + "/DefaultProductImage.png"}/>
                                    </td>
                                    <td>
                                        <ProductImage className={"w-24 h-24"}
                                                      image={process.env.PUBLIC_URL + "/DefaultProductImage.png"}/>
                                    </td>
                                </tr>
                                </tbody>
                            </table>
                        </div>
                    </div>
                    <div className={`${styles.inputsWrap} justify-between ${styles.mediaWrap}`}>
                        <div className={"flex flex-col flex-1 items-center mt-3"}>
                            <label>
                                Describe your product in as much detail as possible.
                            </label>
                            <ProductInput placeholder={"Description..."} type={"textarea"}
                                          className={"h-60 w-full min-w-[310px] max-w-[450px]"}
                            />
                        </div>
                        <div className={"flex flex-col flex-1 items-center mt-3"}>
                            <label>
                                Add characteristics to your product.
                            </label>
                            <ProductInput placeholder={"Characteristics..."} type={"textarea"}
                                          className={"h-60 w-full max-w-[450px]"}
                            />
                        </div>
                    </div>
                    <div className={`${styles.inputsWrap} justify-center`}>
                        <div className={"pt-5 px-8 pb-9 bg-white rounded-lg "}>
                            <div className={"text-center"}>
                                <label className={"text-2xl "}>Price</label>
                            </div>
                            <div className={"mt-3"}>
                                <div className={"flex items-center"}>
                                    <ProductInput type={"number"}
                                                  className={"max-w-[100px]"}
                                                  maxLength={6}/>
                                    <span className={"text-2xl ml-1"}>$</span>
                                </div>
                            </div>
                            <div className={"text-sm text-teal-700 mt-2"}>
                                 max: 1000000
                            </div>
                        </div>
                    </div>
                    <div className={"flex justify-center mt-10 w-full"}>
                        <button type={"submit"}
                                className={"bg-teal-500 py-3 px-8 rounded-lg cursor-pointer transition-colors hover:bg-teal-600 hover:text-white"}>
                            Submit
                        </button>
                    </div>
                </form>
            </Container>
        </BackGround>
    );
}

export default CreateProduct;