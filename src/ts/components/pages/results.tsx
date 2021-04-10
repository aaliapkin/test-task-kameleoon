import React, { useEffect, useState } from "react";

import TestModel from "ts/model/test-model";
import Spinner from "components/spinner";

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
        <h3>{name}</h3>
      </React.Fragment>
    );
  }

  return (
    <div>
      <h1>{title}</h1>
      {content}
      <button onClick={props.history.goBack}>back</button>
    </div>
  );
}
