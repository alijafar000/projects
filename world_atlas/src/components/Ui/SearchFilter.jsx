import React from 'react'

const SearchFilter = ({search, setSearch}) => {

    const handleInputChange = (event) =>{
        event.preventDefault();
        setSearch(event.target.value);
    }
  return (
     <section className="section-searchFilter container">
      <div>
        <input
        className='search'
          type="text"
          placeholder="search"
          value={search}
          onChange={handleInputChange}
        />
      </div>
      </section>

  )
}

export default SearchFilter