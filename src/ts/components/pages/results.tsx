import React, { useEffect, useState } from "react";

import TestModel from "ts/model/test-model";
import Spinner from "components/spinner";
import "css/results.scss";

export default function Results(props) {
  const { title } = props;
  const id = props?.match?.params?.testId;
  const [model, setModel] = useState(null);

  useEffect(() => {
    if (!model) {
      const testModel = new TestModel();
      testModel.fetch().then(() => {
        setModel(testModel);
      });
    }
  }, [model]);

  let content = <Spinner></Spinner>;

  if (id && model?.tests) {
    const { name } = model.tests.find((el) => el.id === +id);
    content = (
      <React.Fragment>
        <h3 className="results__element">{name}</h3>
      </React.Fragment>
    );
  }

  return (
    <div className="container">
      <h1 className="heading">{title}</h1>
      <div className="results__wrapper">{content}</div>
      <button onClick={props.history.goBack} className="results__back">
        back
      </button>
    </div>
  );
}
