import React, { useContext, useEffect, useState } from 'react';
import './products.scss';
import { CartContext } from '../../context/Cart';
import ProductBackgroundImage from "../../assets/product-background.jpg";


const BaseUrl = 'http://localhost:3020';

const Products: React.FC = () => {
    const [products, setProducts] = useState<any[]>([]);
    const [showPopup, setShowPopup] = useState(false);
    const { addToCart } = useContext(CartContext);

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const response = await fetch(`${BaseUrl}/products`);
                if (!response.ok) {
                    throw new Error('Failed to fetch products');
                }
                const data = await response.json();
                setProducts(data);
            } catch (error) {
                console.error('Error fetching products:', error);
            }
        };

        fetchProducts();
    }, []);

    const handleAddToCart = (product: any) => {
        addToCart(product);
        setShowPopup(true);
        setTimeout(() => {
            setShowPopup(false);
        }, 3000);
    };

    return (
        <>
            <div className="backgroundAnim">
                <div className="product-body">
                    <div className="product-header">
                        <div className="header-p">
                            <h1>Products </h1>
                            <p className="text-on-image animate__fadeInLeftBig" >
                                "Step into a realm of opulence and grace with our exquisite line of spa and salon products,
                                where every indulgence is a journey of self-discovery."
                            </p>
                        </div>
                        <div className="imagediv ">
                            <img src={ProductBackgroundImage} alt="" />
                        </div>
                    </div>
                </div>
            </div>


            <div className='products-container'>

                <div className='product-list'>
                    {products.map((product: any) => (
                        <div className='product-item' key={product._id}>
                            <img className='product-image' src={`${BaseUrl}/${product.image}`} alt={product.title} />
                            <h2 className='product-title'>{product.title}</h2>
                            <p className='product-description'>{product.description}</p>
                            <p className='product-price'>€{product.price}</p>
                            <button
                                className="cart-button"
                                onClick={() => handleAddToCart(product)}
                            >
                                Add to cart
                            </button>
                        </div>
                    ))}
                </div>
                {showPopup && (
                    <div className="popup">
                        <br />
                        <br />
                        <span className="popup-close" onClick={() => setShowPopup(false)}>&times;</span>
                        Product added to the cart successfully!
                    </div>
                )}
            </div>
        </>
    );
};

export default Products;
