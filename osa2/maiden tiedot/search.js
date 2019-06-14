Import React from 'react'

const Search = ({newSearch, handleSearchChange}) => {
    return(
      <p>Find countries
        <input
        value={newSearch}
        onChange={handleSearchChange}
        />
      </p>
    )
  }

  export default Search
