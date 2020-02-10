import React from "react";

function SearchForm(props) {
  return (
    <div className="container">
      <br></br>
      <div className="card text-center">
        <div className="form-group" style={{ padding: '22px' }}>
          <label htmlFor="search">{props.searchtype} Search</label>
          <input
            onChange={props.handleInputChange}
            value={props.value}
            searchtype={props.searchtype}
            name="search"
            type="text"
            className="form-control"
            placeholder="Search Users"
            id="search"
          />
        </div>
      </div>
    </div>
  );
}

export default SearchForm;
