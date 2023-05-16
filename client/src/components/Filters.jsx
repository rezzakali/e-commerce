import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useGetCategoriesQuery } from '../features/category/categoryApi';
import { setFilterWord, setPrice } from '../features/filter/filterSlice';
import prices from '../utils/filterByPriceData';

function Filters() {
  // fetches categories
  const { data: categories } = useGetCategoriesQuery();

  const [selectedOption, setSelectedOption] = useState('');
  const [selectedPriceOption, setSelectedPriceOption] = useState('');

  const dispatch = useDispatch();

  const handleOptionChange = (name) => {
    setSelectedOption(name);
    dispatch(setFilterWord(name));
  };

  const handleOptionPriceChange = (priceRange) => {
    setSelectedPriceOption(priceRange);
    dispatch(setPrice(priceRange));
  };

  return (
    <div className="p-3">
      <p style={{ color: 'rgba(230, 62, 62, 0.918)' }}>Filter By Category</p>
      <ul style={{ listStyle: 'none' }}>
        <li
          className="py-1"
          role="button"
          onClick={() => window.location.reload()}
        >
          Reset All
        </li>
        {categories?.categories?.map((c) => (
          <li
            key={c._id}
            className="py-1"
            onClick={() => handleOptionChange(c.name)}
          >
            <input
              type="radio"
              id={c.name}
              value={c._id}
              checked={selectedOption === c.name}
              onChange={() => {}}
            />
            <label htmlFor={c.name} className="mx-1" role="button">
              {c.name}
            </label>
          </li>
        ))}
      </ul>
      <p style={{ color: 'rgba(230, 62, 62, 0.918)' }}>Filter By Prices</p>
      <ul style={{ listStyle: 'none' }}>
        <li
          className="py-1"
          role="button"
          onClick={() => window.location.reload()}
        >
          Reset All
        </li>
        {prices?.map((p) => (
          <li
            key={p._id}
            className="py-1"
            onClick={() => handleOptionPriceChange(p.name)}
          >
            <input
              type="radio"
              id={p._id}
              value={p.name}
              checked={selectedPriceOption === p.name}
              onChange={() => {}}
            />
            <label htmlFor={p.name} className="mx-1" role="button">
              ₹ {p.name}
            </label>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Filters;
