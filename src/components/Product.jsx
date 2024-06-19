import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import DATA from '../Data';

const Product = () => {
    const [searchTerm, setSearchTerm] = useState('');
    const [filteredProducts, setFilteredProducts] = useState(DATA);

    const handleSearchChange = (event) => {
        const term = event.target.value.trim(); // Remove leading/trailing spaces
        setSearchTerm(term);
        filterProducts(term); // Pass the term directly to filterProducts
    };

    const filterProducts = (term) => {
        if (term === '') {
            setFilteredProducts(DATA); // Reset to all products if search term is empty
        } else {
            const filtered = DATA.filter(product =>
                productMatchesSearch(product, term)
            );
            setFilteredProducts(filtered);
        }
    };

    const productMatchesSearch = (product, term) => {
        // Convert both title and search term to lowercase for case-insensitive comparison
        const titleLower = product.title.toLowerCase().toString();
        const termLower = term.toLowerCase().toString();

        // Check if the product title includes the search term
        if (titleLower.includes(termLower)) {
            return true;
        }

        // Check if the product price (as string) includes the search term
        const priceString = product.price.toString();
        if (priceString.includes(termLower)) {
            return true;
        }

          // Check if the product color (as string) includes the search term
          const colorLower = product.color.toLowerCase().toString();
          if (colorLower.includes(termLower)) {
            return true;
        }

        return false;
    };

    const cardItem = (item) => {
        return (
            <div className="card my-5 py-4" key={item.id} style={{ width: "18rem" }}>
                <img src={item.img} className="card-img-top" alt={item.title} />
                <div className="card-body text-center">
                    <h5 className="card-title">{item.title}</h5>
                    <p className="lead">Rs.{item.price}</p>
                    <NavLink to={`/products/${item.id}`} className="btn btn-outline-primary">Buy Now</NavLink>
                </div>
            </div>
        );
    };

    return (
        <div>
            <div className="container py-5">
                <div className="row">
                    <div className="col-12 text-center">
                        <h1>Product</h1>
                        <hr />
                    </div>
                </div>
            </div>
            <div className="container">
                {/* Search bar */}
                <div className="row justify-content-center mb-3">
                    <div className="col-md-6">
                        <input
                            type="text"
                            className="form-control form-control-sm"
                            placeholder="Search products..."
                            value={searchTerm}
                            onChange={handleSearchChange}
                        />
                    </div>
                </div>

                {/* Display filtered products */}
                <div className="row justify-content-around">
                    {filteredProducts.map(cardItem)}
                </div>
            </div>
        </div>
    );
};

export default Product;
