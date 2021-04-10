import React from "react";

import "css/search.scss";

export default function Search({ count, filter, onFilter }) {
  const onChange = (e) => {
    const value = e.target.value;
    onFilter(value);
  };

  return (
    <div className="search">
      <input
        type="text"
        placeholder="What test are you looking for?"
        value={filter || ""}
        onChange={onChange}
      />
      <div className="search__count">{count} tests</div>
    </div>
  );
}
