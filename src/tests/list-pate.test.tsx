import React from "react"
import ListPage from "ts/components/pages/list-page"
import { render, screen, fireEvent } from "@testing-library/react"
import { BrowserRouter as Router, Route } from "react-router-dom"
import { ITest } from "ts/model/test-model"
import fetchMock from "jest-fetch-mock"

fetchMock.enableMocks()

const data = {
  returnedData: [
    {
      id: 1,
      name: "Prototype of the new map",
      type: "CLASSIC",
      status: "PAUSED",
      siteId: 2,
    },
    {
      id: 2,
      name: "Dark theme test",
      type: "MVT",
      status: "DRAFT",
      siteId: 3,
    },
  ],
}

const data1 = {
  returnedData: [
    {
      id: 2,
      url: "https://www.delivery.company.com",
    },
    {
      id: 3,
      url: "http://games.company.com",
    },
  ],
}

beforeEach(() => {
  fetchMock.resetMocks()
})
// test-task-kameleoon.herokuapp.com
beforeEach(() => {
  fetchMock.mockIf(
    /^https?:\/\/test-task-kameleoon\.herokuapp\.com\.*$/,
    (req) => {
      if (req.url.endsWith("/tests")) {
        return Promise.resolve(JSON.stringify(data))
      } else if (req.url.endsWith("/sites")) {
        return Promise.resolve(JSON.stringify(data1))
      } else {
        return Promise.resolve({
          status: 404,
          body: "Not Found",
        })
      }
    }
  )
})

test("list-page should render data", () => {
  render(
    <Router>
      <ListPage />
    </Router>
  )

  const text = screen.getByTestId("spinner-element")
  expect(text).toBeInTheDocument()
})

test("list-page should render data", async () => {
  render(
    <Router>
      <ListPage />
    </Router>
  )

  const text = await screen.findByText("Prototype of the new map")
  console.log(text)

  expect(text).toBeInTheDocument()

  const text1 = await screen.findByText("Dark theme test")
  console.log(text1)
  expect(text1).toBeInTheDocument()
})
