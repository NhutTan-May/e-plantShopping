import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addItem } from './CartSlice';

const ProductList = () => {
  const dispatch = useDispatch();
  const cartItems = useSelector(state => state.cart.items);
  const [addedToCart, setAddedToCart] = useState({});

  const totalCartQuantity = cartItems.reduce((total, item) => total + item.quantity, 0);

  const plantsArray = [
    {
       category: "Air Purifying Plants",
       plants: [
           { name: "Snake Plant", image: "https://images.unsplash.com/photo-1593482892290-f54927ae1c7e?auto=format&fit=crop&w=150&q=80", cost: "$15", description: "Produces oxygen at night." },
           { name: "Spider Plant", image: "https://images.unsplash.com/photo-1614594975525-e45190c55d0b?auto=format&fit=crop&w=150&q=80", cost: "$12", description: "Filters formaldehyde." },
           { name: "Peace Lily", image: "https://images.unsplash.com/photo-1593691509543-c20fb51c0b47?auto=format&fit=crop&w=150&q=80", cost: "$18", description: "Removes mold spores." }
       ]
    },
    {
       category: "Aromatic Fragrant Plants",
       plants: [
           { name: "Lavender", image: "https://images.unsplash.com/photo-1595841696677-6489ffa3f66f?auto=format&fit=crop&w=150&q=80", cost: "$20", description: "Calming scent." },
           { name: "Jasmine", image: "https://images.unsplash.com/photo-1596783074918-c84cb06531ca?auto=format&fit=crop&w=150&q=80", cost: "$18", description: "Sweet fragrance." },
           { name: "Rosemary", image: "https://images.unsplash.com/photo-1595841696677-6489ffa3f66f?auto=format&fit=crop&w=150&q=80", cost: "$15", description: "Invigorating smell." }
       ]
    }
  ];

  const handleAddToCart = (plant) => {
    dispatch(addItem(plant));
    setAddedToCart((prevState) => ({
       ...prevState,
       [plant.name]: true,
    }));
  };

  return (
    <div>
      <div className="navbar" style={{display: 'flex', justifyContent: 'space-between', padding: '15px', backgroundColor: '#4CAF50', color: 'white'}}>
        <h2>e-plantShopping</h2>
        <div className="cart-icon">
          Cart Items: {totalCartQuantity}
        </div>
      </div>
      <div className="product-list" style={{padding: '20px'}}>
        <h2>Our Plants</h2>
        {plantsArray.map((category, index) => (
          <div key={index}>
            <h3>{category.category}</h3>
            <div className="plant-grid" style={{ display: 'flex', gap: '20px', flexWrap: 'wrap' }}>
              {category.plants.map((plant, plantIndex) => (
                <div className="plant-card" key={plantIndex} style={{ border: '1px solid #ccc', padding: '10px', width: '200px' }}>
                  <img src={plant.image} alt={plant.name} style={{width: '100%'}} />
                  <h4>{plant.name}</h4>
                  <p>{plant.description}</p>
                  <p><strong>{plant.cost}</strong></p>
                  <button 
                    onClick={() => handleAddToCart(plant)}
                    disabled={addedToCart[plant.name]}
                    style={{backgroundColor: addedToCart[plant.name] ? '#ccc' : '#4CAF50', color: 'white', padding: '10px', border: 'none'}}
                  >
                    {addedToCart[plant.name] ? "Added to Cart" : "Add to Cart"}
                  </button>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProductList;
