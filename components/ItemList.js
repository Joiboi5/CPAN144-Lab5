'use client';

import { useState } from 'react';
import styles from './ItemList.module.css';

export default function ItemList() {
  const [items, setItems] = useState(['Apple', 'Banana', 'Apricot']);
  const [inputValue, setInputValue] = useState('');
  const [filterA, setFilterA] = useState(false);

  const handleAddItem = () => {
    if (inputValue.trim() !== '') {
      setItems([...items, inputValue]);
      setInputValue('');
    }
  };

  const handleDeleteItem = (index) => {
    setItems(items.filter((_, i) => i !== index));
  };

  const handleInputChange = (e) => {
    setInputValue(e.target.value);
  };

  const handleFilterToggle = () => {
    setFilterA(!filterA);
  };

  const displayedItems = filterA 
    ? items.filter(item => item.startsWith('A') || item.startsWith('a'))
    : items;

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      handleAddItem();
    }
  };

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Item List Manager</h1>
      
      <div className={styles.addItemSection}>
        <input
          type="text"
          value={inputValue}
          onChange={handleInputChange}
          onKeyPress={handleKeyPress}
          placeholder="Enter an item name"
          className={styles.input}
        />
        <button onClick={handleAddItem} className={styles.addBtn}>
          Add Item
        </button>
      </div>

      <div className={styles.filterSection}>
        <input
          type="checkbox"
          id="filterCheckbox"
          checked={filterA}
          onChange={handleFilterToggle}
          className={styles.checkbox}
        />
        <label htmlFor="filterCheckbox" className={styles.label}>
          Show Only Items Starting with 'A'
        </label>
      </div>

      <div className={styles.listSection}>
        {displayedItems.length === 0 ? (
          <p className={styles.emptyMessage}>
            {filterA ? 'No items starting with "A"' : 'No items yet'}
          </p>
        ) : (
          <ul className={styles.list}>
            {displayedItems.map((item, index) => (
              <li key={index} className={styles.listItem}>
                <span className={styles.itemText}>{item}</span>
                <button
                  onClick={() => handleDeleteItem(items.indexOf(item))}
                  className={styles.deleteBtn}
                >
                  Delete
                </button>
              </li>
            ))}
          </ul>
        )}
      </div>

      <div className={styles.stats}>
        <p>Total Items: <strong>{items.length}</strong></p>
        <p>Displaying: <strong>{displayedItems.length}</strong></p>
      </div>
    </div>
  );
}