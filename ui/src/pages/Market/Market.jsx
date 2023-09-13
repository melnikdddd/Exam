import BackGround from "../../components/Wrapper/BackGround/BackGround";
import Container from "../../components/Wrapper/Container/Container";
import React, {useEffect, useState} from "react";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faSliders} from "@fortawesome/free-solid-svg-icons";
import Select from "../../components/Inputs/Select/Select";
import useWindowDimensions from "../../components/hooks/useWindowDimensions";

import Slider from "rc-slider";
import 'rc-slider/assets/index.css';

import styles from "./Market.module.scss"
import "./SliderStyles.css"

import {fetchGet} from "../../utils/Axios/axiosFunctions";
import LoadingBlock from "../../components/Loading/LoadingBlock/LoadingBlock";
import CenterWrapper from "../../components/Wrapper/CenterWrapper/CenterWrapper";

function Market(props) {

    const innerWidth = useWindowDimensions().width;
    const [isLoading, setIsLoading] = useState(false);

    const [isFiltersSelected, setIsFiltersSelected] = useState(false);

    const [productsTypesWithPrice, setProductsTypesWithPrice] = useState(null);

    useEffect(() => {
        const getProductsTypesWithPrice = async () => {
            const data = await fetchGet("/products/typesWithPrice")

            setProductsTypesWithPrice(data.data.categoryWithPrice);
            setIsLoading(true);
        }
        getProductsTypesWithPrice();
    }, []);


    if (!isLoading){
        return <BackGround background={"linear-gradient(270deg, #8BC6EC 0%, #9599E2 100%)"}>
            <Container>
                <CenterWrapper>
                    <LoadingBlock className={"h-24 w-24"}/>
                </CenterWrapper>
            </Container>
        </BackGround>
    }



    return (
        <BackGround background={"linear-gradient(270deg, #8BC6EC 0%, #9599E2 100%)"}>
            <Container>
                <div className={styles.wrap}>
                    <form className={"rounded-t-lg flex border-b border-gray-400"}>
                        <div className={styles.filterBlock}>
                            <button className={`${styles.filterButton} ${isFiltersSelected && styles.selected}`}
                                    type={"button"}
                                    onClick={() => setIsFiltersSelected(!isFiltersSelected)}
                            >
                                {
                                    innerWidth > 500 ?
                                        <span>Filters</span>
                                        :
                                        <FontAwesomeIcon icon={faSliders}/>
                                }
                            </button>
                            <div className={`${styles.filters}  ${isFiltersSelected ? "flex" : `hidden`}`}>
                                <div className={"p-3"}>
                                    <div className={styles.filtersBlock}>
                                        <h3 className={"text-lg text-center font-bold"}>Category</h3>
                                        <Select>
                                            {productsTypesWithPrice.map((product, index) => (
                                                <option key={index}>
                                                    {product.name}
                                                </option>
                                            ))
                                            }
                                        </Select>
                                    </div>
                                </div>
                                <div className={"p-3"}>
                                    <div className={styles.filtersBlock}>
                                        <h3 className={"text-lg text-center font-bold"}>Price</h3>
                                        <Slider className={"customSlider"} range={true} max={1200} >

                                        </Slider>
                                        <div className={"flex justify-around"}>
                                            <div className={"flex flex-col items-center flex-1"}>
                                                <span>Min</span>
                                                <input type="number" className={"border border-gray-400 rounded-lg p-2 w-[80px]"}/>
                                            </div>
                                            <div className={"flex flex-col items-center flex-1"}>
                                                <span>Max</span>
                                                <input type="number" className={"border border-gray-400 rounded-lg p-2 w-[80px]"}/>
                                            </div>
                                        </div>
                                        <div className={"flex justify-around items-center mt-3"}>
                                            <div className={"flex items-center justify-center"}>
                                                <label>
                                                    <input type={"radio"}/>
                                                    <span className={"ml-2"}>Expensive</span>
                                                </label>
                                            </div>
                                            <div className="flex items-center justify-center">
                                                <label>
                                                    <input type={"radio"}/>
                                                    <span className={"ml-2"}>Cheaper</span>
                                                </label>
                                            </div>
                                        </div>
                                        <div className={"flex items-center justify-center w-full mt-1"}>
                                            <label>
                                                <input type="radio" className={"cursor-pointer"}/>
                                                <span className={"ml-2"}>Free</span>
                                            </label>
                                        </div>
                                    </div>
                                </div>
                                <div className={"p-3"}>
                                    <div className={styles.filtersBlock}>
                                        <h3 className={"text-center font-bold text-lg"}>
                                            Params
                                        </h3>
                                        <div className={"flex flex-col mt-2"}>
                                            <div className={"flex justify-around items-center"}>
                                                <label>
                                                    <input type="radio"/>
                                                    <span className={"ml-1"}>Most liked</span>
                                                </label>
                                                <label>
                                                    <input type="radio"/>
                                                    <span className={"ml-1"}>Most views</span>
                                                </label>
                                            </div>
                                            <div className={"flex justify-around items-center mt-1"}>
                                                <label>
                                                    <input type="radio"/>
                                                    <span className={"ml-1"}>Most old</span>
                                                </label>
                                                <label>
                                                    <input type="radio"/>
                                                    <span className={"ml-1"}>Most new</span>
                                                </label>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <input className={styles.nameInput}
                               placeholder={"I search..."}
                               maxLength={40}
                        />
                        <input className={styles.codeInput}
                               placeholder={"Code*"}
                               maxLength={6}
                        />
                    </form>
                    <div></div>
                </div>
            </Container>
        </BackGround>
    );
}

export default Market;