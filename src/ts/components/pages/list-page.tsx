import React, { useEffect, useState } from "react"

import Item from "components/parts/item"
import Header from "components/parts/header"
import Search from "components/parts/search"
import Spinner from "components/parts/spinner"
import Empty from "components/parts/empty"

import TestModel, { ITest, ITestStringKeys } from "ts/model/test-model"
import { testStatus } from "ts/model/test-status"

import "css/list.scss"

interface ISort {
  field: ITestStringKeys
  dir: boolean
}

const ListPage: React.FC = () => {
  const [model, setModel] = useState<TestModel>(null)
  const [sort, setSort] = useState<ISort>(null)
  const [loading, setLoading] = useState<boolean>(true)
  const [filter, setFilter] = useState<string>(null)

  useEffect(() => {
    if (true || !model) {
      setLoading(true)
      const testModel = new TestModel()
      testModel.fetch().then(() => {
        setModel(testModel)
        setLoading(false)
      })
    }
  }, [])

  const onSort = function (field: ITestStringKeys) {
    let dir = !!sort?.dir
    dir = !dir
    setSort({ ...sort, field, dir })
  }

  const onFilter = function (filter: string) {
    setFilter(filter)
  }

  let tests = model?.tests
  let count = 0

  let content: JSX.Element | JSX.Element[] = <Spinner></Spinner>
  if (tests?.length) {
    if (filter) {
      tests = tests.filter(
        (el) => el.name.toLowerCase().indexOf(filter.toLowerCase()) !== -1
      )
    }

    if (sort) {
      const { field, dir } = sort
      tests = tests.sort(sortFunc(field, dir))
    }
    content = tests.map((t) => <Item test={t} key={t.id}></Item>)
    count = tests.length
  }

  if (!loading && !tests?.length) {
    content = <Empty onClear={() => onFilter("")}></Empty>
  }

  return (
    <div className="container">
      <h1 className="heading">Dashboard</h1>
      <Search filter={filter} onFilter={onFilter} count={count}></Search>
      <Header sort={sort} onSort={onSort}></Header>
      <div className="content__wrapper">{content}</div>
    </div>
  )
}

function sortFunc(field: ITestStringKeys, dir: boolean) {
  switch (field) {
    case "status": {
      return (a: ITest, b: ITest) => {
        const aIndex = testStatus.findIndex(
          (el) => el.toLowerCase() === a.status.toLowerCase()
        )
        const bIndex = testStatus.findIndex(
          (el) => el.toLowerCase() === b.status.toLowerCase()
        )
        let res = aIndex - bIndex
        return dir ? res : -res
      }
    }
    case "name":
    case "type":
    case "site":
    default: {
      return (a: ITest, b: ITest) => {
        let res = a[field].localeCompare(b[field])
        return dir ? res : -res
      }
    }
  }
}

export default ListPage
