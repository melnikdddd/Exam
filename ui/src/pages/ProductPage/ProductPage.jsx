import BackGround from "../../components/Wrapper/BackGround/BackGround";
import Container from "../../components/Wrapper/Container/Container";
import {useParams} from "react-router";
import {useSelector} from "react-redux";
import {selectUserData} from "../../store/slices/UserDataSlice";
import {useEffect, useState} from "react";
import CenterWrapper from "../../components/Wrapper/CenterWrapper/CenterWrapper";
import LoadingBlock from "../../components/Loading/LoadingBlock/LoadingBlock";
import {fetchGet} from "../../utils/Axios/axiosFunctions";
import ProductCover from "../../components/Images/ProductCover/ProductCover";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faEye, faMessage, faThumbsDown, faThumbsUp} from "@fortawesome/free-solid-svg-icons";
import UserAvatar from "../../components/Images/UserAvatar/UserAvatar";
import {Link} from "react-router-dom";
import moment from "moment";
import RatingButtons from "../../components/Buttons/RatingButton/RatingButtons";
import {selectIsAuth} from "../../store/slices/AuthSlice";

function ProductPage(props) {
    const ownerId = useSelector(selectUserData)._id;
    const {id} = useParams();

    const isAuth = useSelector(selectIsAuth);

    const [product, setProduct] = useState(null);
    const [user, setUser] = useState(null);

    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        const getProduct = async () => {
            const response = await fetchGet(`products/${id}`)

            if (response.success) {
                setProduct(response.data.product);
                setUser(response.data.owner);
            }

            setIsLoading(true);
        }

        getProduct();

    }, [])

    if (!isLoading) {
        return <BackGround background={"linear-gradient(90deg, #74EBD5 0%, #9FACE6 100%)"}>
            <Container>
                <CenterWrapper>
                    <LoadingBlock className={"h-40 w-40"}/>
                </CenterWrapper>
            </Container>
        </BackGround>
    }

    console.log(product)
    return (
        <BackGround background={"linear-gradient(90deg, #74EBD5 0%, #9FACE6 100%)"}>
            <Container>
                <div className={"bg-white flex flex-col shadow-lg rounded-lg mt-6 p-10"}>
                    <div className={"flex justify-between"}>
                        <div className={"flex"}>
                            <ProductCover
                                image={product.productCover}
                                isImageNeedDecoding={true}
                                className={"rounded-lg"}
                                imageClassName={"rounded-lg"}
                            />
                            <div className={"text-center ml-10 text-slate-600 flex flex-col px-5 justify-start w-56"}>
                                <p className={"text-2xl"}>
                                    {product.title}
                                </p>
                                <p className={"mt-10 text-xl"}>
                                    {product.price === 0 ? "FREE" : product.price + "$"}
                                </p>
                                <div className={"flex justify-between mt-12"}>
                                    <button className={"py-2 px-8 bg-green-600 text-white rounded-lg"}>
                                        Buy
                                    </button>
                                    <button className={"py-2 px-5 rounded-lg text-white bg-blue-500 ml-2"}>
                                        <FontAwesomeIcon icon={faMessage}/>
                                    </button>
                                </div>
                                <div className={"flex flex-col text-start mt-5"}>
                                    <p className={""}>
                                        <span className={"font-bold text-black"}>Product code:</span>
                                        <span> {product.code}</span>
                                    </p>

                                </div>
                            </div>
                        </div>
                        <div className={"flex flex-col"}>
                            <div className={"text-lg flex items-center"}>
                                <span>
                                    {user.firstname}
                                </span>
                                <span className={"ml-2"}>
                                    {user.lastname}
                                </span>
                                <Link to={`/users/${user._id}`}>
                                    <UserAvatar isImageNeedDecoding={true}
                                                image={user.userAvatar}
                                                className={"w-12 h-12 ml-2"}
                                    />
                                </Link>
                            </div>
                            <div className={"flex justify-start"}>
                                <div className={"flex items-center ml-3"}>
                                    <FontAwesomeIcon icon={faThumbsUp} className={"h-5"}/>
                                    <span className={"text-xl ml-2"}>{user.rating.likes.length}</span>
                                </div>
                                <div className={"flex items-center ml-3"}>
                                    <FontAwesomeIcon icon={faThumbsDown} className={"h-5"}/>
                                    <span className={"text-xl ml-3"}>{user.rating.dislikes.length}</span>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className={"flex justify-around mt-7"}>
                        <div className={"flex flex-col w-1/2"}>
                            <span className={"font-bold"}>
                                Description
                            </span>
                            <span>
                                {product.description}
                            </span>
                        </div>
                        <div className={"flex flex-col w-1/2"}>
                            <span className={"font-bold"}>
                                Characteristics
                            </span>
                            <span>
                                {product.characteristics}
                            </span>
                        </div>
                    </div>
                    <div className={"flex justify-between items-center border-t border-gray-400 mt-5"}>
                        <div className={"flex flex-col mt-5 "}>
                            <span>Since:</span>
                            <span>{moment(product.createdAt).format("DD-MM-YYYY")}</span>
                        </div>
                        <div className={"mt-5"}>
                            <RatingButtons rateObj={product}
                                           ownerId={ownerId}
                                           isAuth={isAuth}
                                           entity={"products"}
                                           isDisabled={true}
                            />
                        </div>
                        <div className={"mt-5"}>
                            <span><FontAwesomeIcon icon={faEye}/> {product.viewsCount}</span>
                        </div>
                    </div>
                </div>

            </Container>
        </BackGround>
    );
}

export default ProductPage;