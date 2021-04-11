import React, { useEffect, useState } from "react"

import Item from "components/parts/item"
import Header from "components/parts/header"
import Search from "components/parts/search"
import Spinner from "components/parts/spinner"
import Empty from "components/parts/empty"
import Error from "components/parts/error"

import TestModel, { ITest, ITestStringKeys } from "ts/model/test-model"
import { testStatus } from "ts/model/test-status"

import "css/list.scss"

interface ISort {
  field: ITestStringKeys
  dir: boolean
}

export default () => {
  const [model, setModel] = useState<TestModel>(null)
  const [sort, setSort] = useState<ISort>(null)
  const [loading, setLoading] = useState<boolean>(true)
  const [error, setError] = useState<boolean>(false)
  const [filter, setFilter] = useState<string>(null)

  useEffect(() => {
    let mounted = true
    if (true || !model) {
      setLoading(true)
      const testModel = new TestModel()
      testModel
        .fetch()
        .then(() => {
          if (mounted) {
            setModel(testModel)
            setLoading(false)
          }
        })
        .catch(() => {
          if (mounted) {
            setError(true)
          }
        })
    }
    return () => {
      mounted = false
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

    count = tests.length
  }

  return (
    <div className="container">
      <h1 className="heading">Dashboard</h1>
      <Search filter={filter} onFilter={onFilter} count={count}></Search>
      <Header sort={sort} onSort={onSort}></Header>
      <div className="content__wrapper">
        <Content
          loading={loading}
          error={error}
          tests={tests}
          onFilter={onFilter}
        ></Content>
      </div>
    </div>
  )
}

const Content = ({
  error,
  loading,
  tests,
  onFilter,
}: {
  error: boolean
  loading: boolean
  tests: Array<ITest>
  onFilter: (x: string) => void
}) => {
  if (error) {
    return <Error></Error>
  }

  if (loading) {
    return <Spinner></Spinner>
  }

  if (!tests?.length) {
    return <Empty onClear={() => onFilter("")}></Empty>
  }

  return (
    <>
      {tests.map((t) => (
        <Item test={t} key={t.id}></Item>
      ))}
    </>
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
