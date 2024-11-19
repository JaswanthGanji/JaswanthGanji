import React, { useState, useEffect } from 'react';
import { Link,useParams } from 'react-router-dom';
import { categoriesData } from '../Rawdata'; // Assuming this is your data source
import './Home.css';

const Home = ({ searchQuery }) => {
  const { categoryName } = useParams(); // Get category name from URL
  const [categoryItems, setCategoryItems] = useState([]);

  useEffect(() => {
    const filterItems = () => {
      if (categoryName) {
        const filteredItems = categoriesData.filter(item =>
          item.category.toLowerCase() === categoryName.toLowerCase() && // Filter by category
          item.name.toLowerCase().includes(searchQuery.toLowerCase()) // Filter by search query
        );
        setCategoryItems(filteredItems);
      } else {
        const filteredItems = categoriesData.filter(item =>
          item.name.toLowerCase().includes(searchQuery.toLowerCase())
        );
        setCategoryItems(filteredItems);
      }
    };

    filterItems();
  }, [categoryName, searchQuery]); // Runs whenever categoryName or searchQuery changes

  return (
    <div>
      <h1>{categoryName ? categoryName.charAt(0).toUpperCase() + categoryName.slice(1) : 'All Products'}</h1>

      {categoryItems.length === 0 ? (
        <p>No products available.</p>
      ) : (
        <div className="product-list">
          {categoryItems.map(item => (
            <div key={item.id} className="product-item">
              <Link to={`/product/${item.id}`}>
                <img src={item.image} alt={item.name} className="product-image" />
                <h3>{item.name}</h3>
                <p>Price: ${item.price}</p>
                <p>Discount: {item.discount}% off</p>
              </Link>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Home;
