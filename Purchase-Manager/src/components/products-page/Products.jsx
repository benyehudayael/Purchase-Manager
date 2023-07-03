import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import Product from './Product';

const ProductsPage = () => {
    const products = useSelector((state) => state.products);
    const [totalPurchasedProducts, setTotalPurchasedProducts] = useState(0)
    const calculateTotalPurchasedProducts = () => {
        return products.reduce((total, product) => total + product.quantity, 0);
    };
    useEffect(() => {
        const total = calculateTotalPurchasedProducts();
        setTotalPurchasedProducts(total);
    }, [products]);

    return (
        <div style={{ display: "flex", justifyContent: "space-around" }}>
            {/* Region 1 */}
            <div>
                <h2>Total Purchased Products: {totalPurchasedProducts}</h2>
            </div>

            {/* Region 2 */}
            <div>
                {products.map((product) => (
                    <Product key={product.id} product={product} />
                ))}
            </div>
        </div>
    );
};

export default ProductsPage;
