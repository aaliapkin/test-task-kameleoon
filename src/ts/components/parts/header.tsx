import React from "react"

import "css/header.scss"
import { ITestStringKeys } from "ts/model/test-model"

interface IProps {
  sort: ISort
  onSort: (x: ITestStringKeys) => void
}

interface ISectionProps extends IProps {
  field: ITestStringKeys
}

interface ISort {
  field: ITestStringKeys
  dir: boolean
}

export default function Header(props: IProps) {
  return (
    <header className="header__grid">
      <Section field="name" {...props}></Section>
      <Section field="type" {...props}></Section>
      <Section field="status" {...props}></Section>
      <Section field="site" {...props}></Section>
      <section className="header__section"></section>
    </header>
  )
}

function Section(props: ISectionProps) {
  const { field, sort, onSort } = props
  const className = ["header__section"]
  if (sort && sort.field === field) {
    className.push("header__section-sort-" + (sort.dir ? "asc" : "desc"))
  }

  return (
    <section className={className.join(" ")}>
      <button onClick={() => onSort(field)}>
        <span tabIndex={-1}>{field}</span>
      </button>
    </section>
  )
}
