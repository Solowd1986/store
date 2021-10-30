import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";

import * as categoryActions from "@redux/entities/category/actions";
import * as categorySelectors from "@redux/entities/category/selectors/categorySelectors";


import { Redirect } from "react-router";
import ModalWrapper from "@components/Helpers/Hooks/ModalWrapper/ModalWrapper";
import Spinner from "@components/Partials/Spinner/Spinner";
import CategoryProductsList from "@components/Pages/Category/CategoryProductsList/CategoryProductsList";


interface B {
    products: null | number
}


const CategoryHook = () => {
    const data = useSelector((state) => categorySelectors.getCategoryData(state));

    const [categoryData, setCategoryData] = useState({
        products: null,
        lastIndex: 0,
    });


    const isStateEmpty = () => !categoryData.products;



    if (data.error.recived) return <Redirect to={data.error.code}/>;
    if (isStateEmpty()) {
        const SpinnerModal = ModalWrapper(Spinner);
        return <SpinnerModal />;
    }


    //const { main: category, data: products } = categoryData.products;
    //return <CategoryProductsList category={category} products={products} />;
};



