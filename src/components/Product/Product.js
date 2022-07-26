import React from 'react';
import './Product.scss';
import { getProducts } from "../../server/server";
import { useQuery } from "@apollo/client";

const Product = () => {
    function DisplayProduct() {
        const {loading, error, data} = useQuery(getProducts);
        if (loading) return <p>Loading...</p>;
        if (error) return <p>Error :(</p>;

        return data.category.products.map(({id, gallery, name, brand, prices}) => (
            <div key={id}>
                <img src={gallery[0]} alt={name} height="330"/>
                <p>{brand}</p>
                <p>{name}</p>
                <p>{prices[0].amount}</p>
            </div>
        ))
    }

    return (
        <section className="productSection">
            <DisplayProduct />
        </section>
    );
};

export default Product;