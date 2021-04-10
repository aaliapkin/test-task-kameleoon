import React, { useEffect, useState } from "react";

import Test from "components/test";
import Header from "components/header";
import Search from "components/search";
import Spinner from "components/spinner";

import TestModel from "ts/model/test-model";
import { testStatus } from "ts/model/test-status";

export default function ListPage() {
  const [model, setModel] = useState(null);
  const [sort, setSort] = useState(null);
  const [filter, setFilter] = useState(null);

  useEffect(() => {
    if (true || !model) {
      const testModel = new TestModel();
      testModel.fetch().then(() => {
        setModel(testModel);
      });
    }
  }, []);

  let tests = model?.tests;
  let count = 0;

  let content = <Spinner></Spinner>;
  if (tests?.length) {
    if (filter) {
      tests = tests.filter(
        (el) => el.name.toLowerCase().indexOf(filter.toLowerCase()) !== -1
      );
    }

    if (sort) {
      const { field, dir } = sort;
      tests = tests.sort(sortFunc(field, dir));
    }
    content = tests.map((t) => <Test test={t} key={t.id}></Test>);
    count = tests.length;
  }

  const onSort = function (field) {
    let dir = !!sort?.dir;
    dir = !dir;
    setSort({ ...sort, field, dir });
  };

  const onFilter = function (filter) {
    setFilter(filter);
  };

  return (
    <div className="container">
      <h1>Dashboard</h1>
      <Search filter={filter} onFilter={onFilter} count={count}></Search>
      <Header sort={sort} onSort={onSort}></Header>
      <div className="content__wrapper">{content}</div>
    </div>
  );
}

function sortFunc(field, dir) {
  switch (field) {
    case "status": {
      return (a, b) => {
        const aIndex = testStatus.findIndex(
          (el) => el.toLowerCase() === a.status.toLowerCase()
        );
        const bIndex = testStatus.findIndex(
          (el) => el.toLowerCase() === b.status.toLowerCase()
        );
        let res = aIndex - bIndex;
        return dir ? res : -res;
      };
    }
    case "name":
    case "type":
    case "site":
    default: {
      return (a, b) => {
        let res = a[field].localeCompare(b[field]);
        return dir ? res : -res;
      };
    }
  }
}
