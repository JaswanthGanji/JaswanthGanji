import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { categoriesData } from '../Rawdata';
import { useCart } from '../pages/Cartcontent'; // Import the cart context
import './Productdetails.css';

const ProductDetail = () => {
  const { productId } = useParams();
  const navigate = useNavigate();
  const { addToCart } = useCart(); // Use the cart context to add products
  const [product, setProduct] = useState(null);

  // Fetch the product details using the productId from the URL
  useEffect(() => {
    const product = categoriesData.find(item => item.id === parseInt(productId));
    setProduct(product);
  }, [productId]);

  // Handle when the product is not found
  if (!product) {
    return <p>Product not found.</p>;
  }

  // Function to handle the "Add to Cart" action
  const handleAddToCart = () => {
    addToCart(product);
    alert('Product added to cart!');
  };

  // Function to handle the "Buy Now" action
  const handleBuyNow = () => {
    addToCart(product);
    navigate('/cart'); // Navigate to the cart page
  };

  return (
    <div className="product-detail">
      {/* Back button */}
      <div className="product-detail-header">
        <button className="back-btn" onClick={() => navigate(-1)}>Back</button>
      </div>

      <div className="product-detail-body">
        {/* Product Image */}
        <img src={product.image} alt={product.name} className="product-image" />

        {/* Product Info */}
        <div className="product-info">
          <h2>{product.name}</h2>
          <p className="description">{product.description}</p>

          {/* Pricing Section */}
          <div className="pricing-section">
            <p className="price">Price: ${product.price}</p>
            {product.specialPrice && (
              <p className="special-price">Special Price: ${product.specialPrice}</p>
            )}
            <p className="discount">Discount: {product.discount}% off</p>
          </div>

          {/* Ratings */}
          <div className="rating">
            <span>Rating: </span>
            <span className="stars">
              {'★'.repeat(product.rating)}{'☆'.repeat(5 - product.rating)}
            </span>
          </div>

          {/* Manufacturer Info */}
          <p className="manufacturer">Manufactured by: {product.manufacturer}</p>

          {/* Action Buttons */}
          <div className="action-buttons">
            <button className="add-to-cart-btn" onClick={handleAddToCart}>Add to Cart</button>
            <button className="buy-now-btn" onClick={handleBuyNow}>Buy Now</button>
          </div>

          {/* Payment and EMI Options */}
          <div className="payment-options">
            <h3>Payment Options</h3>
            <ul>
              <li>Credit/Debit Card</li>
              <li>Net Banking</li>
              <li>Cash on Delivery</li>
            </ul>
          </div>

          {/* Banking Offers */}
          <div className="banking-offers">
            <h3>Banking Offers</h3>
            <ul>
              <li>10% cashback on ICICI Bank cards</li>
              <li>5% off on Axis Bank credit cards</li>
            </ul>
          </div>

          {/* EMI Options */}
          <div className="emi-options">
            <h3>EMI Options</h3>
            <ul>
              <li>3 Months EMI</li>
              <li>6 Months EMI</li>
              <li>12 Months EMI</li>
            </ul>
          </div>
        </div>
      </div>

      {/* Similar Products Section */}
      <div className="related-products">
        <h3>Similar Models</h3>
        <div className="related-product-list">
          {categoriesData.slice(0, 4).map(item => (
            <div key={item.id} className="related-product-item">
              <img src={item.image} alt={item.name} />
              <p>{item.name}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;
