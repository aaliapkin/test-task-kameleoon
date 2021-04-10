import React from "react"
import { Link } from "react-router-dom"
import "css/test.scss"
import { ITest, TStatus } from "ts/model/test-model"

interface IProps {
  test: ITest
}

export default function Test(props: IProps) {
  const {
    test: { id, name, site, status, type, color },
  } = props

  let style = {}
  if (color) {
    style = { borderColor: color }
  }

  return (
    <div className="test__container" style={style}>
      <div className="test__grid">
        <section className="test__section test__section-name">
          <h3>{name}</h3>
        </section>
        <section className="test__section test__section-type">{type}</section>
        <Status status={status}></Status>
        <section className="test__section test__section-site">{site}</section>
        <TestButton status={status} id={id}></TestButton>
      </div>
    </div>
  )
}

function TestButton({ status, id }: { status: string; id: number }) {
  let className = ["test__button"]
  let dest
  switch (status) {
    case "DRAFT":
      dest = "finalize"
      className.push(` test__button-${dest}`)
      break
    case "ONLINE":
    case "PAUSED":
    case "STOPPED":
    default:
      dest = "results"
      className.push(` test__button-${dest}`)
  }
  return (
    <Link to={`/${dest}/${id}`} className={className.join(" ")}>
      {dest}
    </Link>
  )
}

function Status({ status }: { status: TStatus }) {
  let className = ["test__section-status"]
  switch (status) {
    case "DRAFT":
      className.push("test__section-status-draft")
      break
    case "ONLINE":
      className.push("test__section-status-online")
      break
    case "PAUSED":
      className.push("test__section-status-paused")
      break
    case "STOPPED":
      className.push("test__section-status-stopped")
      break
  }
  return (
    <section className={className.join(" ")}>{status.toLowerCase()}</section>
  )
}
