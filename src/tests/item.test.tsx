import React from "react"
import Item from "ts/components/item"
import { render, screen } from "@testing-library/react"
import { BrowserRouter as Router } from "react-router-dom"
import { ITest } from "ts/model/test-model"

test("Item should render data", () => {
  const test: ITest = {
    id: 1,
    name: "💩",
    type: "CLASSIC",
    status: "PAUSED",
    siteId: 2,
    site: "delivery.company.com",
    color: "rgb(194,194,255)",
  }

  render(
    <Router>
      <Item test={test} />
    </Router>
  )

  const text = screen.getByText("💩")
  expect(text).toBeInTheDocument()

  const text1 = screen.getByText("CLASSIC")
  expect(text1).toBeInTheDocument()

  const text2 = screen.getByText("paused")
  expect(text2).toBeInTheDocument()

  const text3 = screen.getByText("delivery.company.com")
  expect(text3).toBeInTheDocument()

  const text4 = screen.getByText("results")
  expect(text4).toBeInTheDocument()
})
