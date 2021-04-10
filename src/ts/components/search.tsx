import React from "react";

export default function Search({ filter, onFilter }) {
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
    </div>
  );
}
