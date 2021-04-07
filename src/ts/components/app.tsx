import React, { useEffect, useState } from "react";

import Test from "components/test";
import Header from "components/header";
import Search from "components/search";
import Spinner from "components/spinner";

import TestModel from "ts/model/test-model";

export default function App() {
  const [model, setModel] = useState(null);

  useEffect(() => {
    const testModel = new TestModel();
    testModel.fetch().then(() => {
      setModel(testModel);
    });
  });

  let content = <Spinner></Spinner>;
  if (model?.tests?.length) {
    content = model.tests.map((t) => <Test test={t}></Test>);
  }

  return (
    <div className="container">
      <h1 className="heading">Dashboard</h1>
      <Search></Search>
      <Header></Header>
      {content}
    </div>
  );
}
