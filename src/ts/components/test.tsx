import React from "react";

export default function Test(props) {
  const {
    test: { name, site, status, type },
  } = props;
  return (
    <div className="test__container">
      <div className="test__grid">
        <section className="test__section test__section-name">
          <h3>{name}</h3>
        </section>
        <section className="test__section test__section-type">Classic</section>
        <section className="test__section test__section-status test__section-status-green">
          {status}
        </section>
        <section className="test__section test__section-site">{site}</section>
        <section className="test__section">
          <button className="test__button">Results</button>
        </section>
      </div>
    </div>
  );
}
