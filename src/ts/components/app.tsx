import React from "react"
import { BrowserRouter, Route } from "react-router-dom"
import ListPage from "components/pages/list-page"
import Results from "components/pages/results"

export default function App() {
  return (
    <BrowserRouter basename="/test-task-kameleoon/">
      {/* basename="/test-task-kameleoon/"*/}
      <Route path="/" exact component={ListPage} />
      <Route
        path="/finalize/:testId"
        render={(props) => <Results title="Finalize" {...props}></Results>}
      />
      <Route
        path="/results/:testId"
        render={(props) => <Results title="Results" {...props}></Results>}
      />
    </BrowserRouter>
  )
}
