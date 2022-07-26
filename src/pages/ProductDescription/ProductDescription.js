import React, { useState } from 'react';
import './ProductDescription.scss';
import { getProduct } from "../../server/server";
import { useQuery } from "@apollo/client";
import { useParams } from "react-router-dom";

const ProductDescription = () => {
    const [imagePresent, setImagePresent] = useState(0)
    const {id} = useParams();
    const moneySymbol = "$";

    const currentAmount = () => {
        if(moneySymbol === "$") {
            return 0
        } else if(moneySymbol === "£") {
            return 1
        } else if(moneySymbol === "A$") {
            return 2
        } else if(moneySymbol === "¥") {
            return 3
        } else {
            return 4
        }
    }

    function DisplayProduct() {
        const {loading, error, data} = useQuery(getProduct(id));
        if (loading) return <p>Loading...</p>;
        if (error) return <p>Error :(</p>;
        console.log(data);

        return (
            <section className="productSection">
                <div className="productGallery">
                    {data.product.gallery.map((picture, index) =>
                        <div
                            className="galleryContainer"
                            key={Math.random()}
                            onClick={() => {
                                setImagePresent(index)
                            }}
                        >
                            <img className={data.product.gallery.length <= 1 ? 'galleryImage' : 'galleryImage galleryImageCursor'} src={picture} alt={data.product.name}/>
                        </div>
                    )}
                </div>
                <div className="productPicture">
                    <img className="productImage" src={data.product.gallery[`${imagePresent}`]} alt={data.product.name}/>
                </div>
                <div className="productDescription">
                    <h1 className="productBrand">{data.product.brand}</h1>
                    <h2 className="productName">{data.product.name}</h2>
                    {(data.product.attributes.filter(attribute => attribute.id === 'Size').map(attribute => (
                            <div className="parameterContainer" key={attribute.id}>
                                <h3 className="parameterTitle">{attribute.id.toUpperCase()}:</h3>
                                <div className="sizeRow">{attribute.items.map(item => (
                                        <button className="sizeButton" key={item.id}>{item.value}</button>
                                    ))}
                                </div>
                            </div>
                        ))
                    )}
                    {(data.product.attributes.filter(attribute => attribute.id === 'Color').map(attribute => (
                            <div className="parameterContainer" key={attribute.id}>
                                <h3 className="parameterTitle">{attribute.id.toUpperCase()}:</h3>
                                <div className="colorRow">{attribute.items.map(item => (
                                        <button className="colorBox" key={item.id} style={{backgroundColor: `${item.value}`}}></button>
                                    ))}
                                </div>
                            </div>
                        ))
                    )}
                    {(data.product.attributes.filter(attribute => attribute.id === 'Capacity').map(attribute => (
                            <div className="parameterContainer" key={attribute.id}>
                                <h3 className="parameterTitle">{attribute.id.toUpperCase()}:</h3>
                                <div className="sizeRow">{attribute.items.map(item => (
                                    <button className="sizeButton" key={item.id}>{item.value}</button>
                                ))}</div>
                            </div>
                        ))
                    )}
                    {(data.product.attributes.filter(attribute => attribute.id === 'With USB 3 ports').map(attribute => (
                            <div className="parameterContainer" key={attribute.id}>
                                <h3 className="parameterTitle">{attribute.id.toUpperCase()}:</h3>
                                <div className="sizeRow">{attribute.items.map(item => (
                                    <button className="sizeButton" key={item.id}>{item.value}</button>
                                ))}</div>
                            </div>
                        ))
                    )}
                    {(data.product.attributes.filter(attribute => attribute.id === 'Touch ID in keyboard').map(attribute => (
                            <div className="parameterContainer" key={attribute.id}>
                                <h3 className="parameterTitle">{attribute.id.toUpperCase()}:</h3>
                                <div className="sizeRow">{attribute.items.map(item => (
                                    <button className="sizeButton" key={item.id}>{item.value}</button>
                                ))}</div>
                            </div>
                        ))
                    )}
                    <h3 className="priceTitle">PRICE:</h3>
                    <p className="displayProductPrice">{`${moneySymbol}${data.product.prices[currentAmount()].amount}`}</p>
                    <button
                        className="buttonAddToCart"
                    >
                        ADD TO CART
                    </button>
                    <div
                        className="displayProductDescription"
                        dangerouslySetInnerHTML={{__html: `${data.product.description}`}}
                    />
                </div>
            </section>
        )

    }

    return (
        <div>
            <DisplayProduct />
        </div>
    );
};

export default ProductDescription;