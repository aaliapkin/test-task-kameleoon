import React from "react";

export default function Header(props) {
  return (
    <header className="header__grid">
      <Section field="name" {...props}></Section>
      <Section field="type" {...props}></Section>
      <Section field="status" {...props}></Section>
      <Section field="site" {...props}></Section>
      <section className="header__section"></section>
    </header>
  );
}

function Section(props) {
  const { field, sort, onSort } = props;
  const className = ["header__section"];
  if (sort && sort.field === field) {
    className.push("header__section-sort-" + (sort.dir ? "asc" : "desc"));
  }

  return (
    <section className={className.join(" ")}>
      <button onClick={() => onSort(field)}>
        <span tabIndex="-1">{field}</span>
      </button>
    </section>
  );
}
