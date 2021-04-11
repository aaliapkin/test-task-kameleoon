import React from "react"
import Item from "ts/components/parts/item"
import { render, screen, fireEvent } from "@testing-library/react"
import { BrowserRouter as Router, Route } from "react-router-dom"
import { ITest } from "ts/model/test-model"

test("Item should render data", () => {
  const test: ITest = {
    id: 1,
    name: "Dark theme test",
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

  const text = screen.getByText("Dark theme test")
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

test("Should link to results page", () => {
  const test: ITest = {
    id: 1,
    name: "Spring promotion",
    type: "CLASSIC",
    status: "PAUSED",
    siteId: 2,
    site: "delivery.company.com",
    color: "rgb(194,194,255)",
  }

  render(
    <Router>
      <Route path="/results/:id">
        <div>💩</div>
      </Route>
      <Route exact path="/">
        <Item test={test} />
      </Route>
    </Router>
  )

  const text = screen.getByText("results")
  expect(text).toBeInTheDocument()

  fireEvent(
    screen.getByText("results"),
    new MouseEvent("click", {
      bubbles: true,
      cancelable: true,
    })
  )

  expect(screen.getByText("💩")).toBeInTheDocument()
})
