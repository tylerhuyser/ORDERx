import React from 'react'

import "../Search/Search.css"

export default function Search (props) {

  const { searchQuery, handleSearch } = props
  
  return (
    <div className="search-container">

      <input
        className="search-input"
        value={searchQuery}
        onChange={(e) => handleSearch(e)}
        name="searchQuery"
        placeholder="Search"
        type="searchQuery"
        autoFocus
      />
      <button className="search-button">
        <i className="fas fa-search"></i>
      </button>

    </div>
  )
}