import React, { useEffect, useState } from "react"
import { RouteComponentProps, useHistory } from "react-router"

import TestModel from "ts/model/test-model"
import Spinner from "components/parts/spinner"
import "css/results.scss"

interface MatchParams {
  testId: string
}

interface IProps extends RouteComponentProps<MatchParams> {
  title: string
}

export default function Results(props: IProps) {
  const { title } = props
  const id = props?.match?.params?.testId
  const [model, setModel] = useState<TestModel>(null)
  const history = useHistory()

  useEffect(() => {
    let mounted = true
    if (!model) {
      const testModel = new TestModel()
      testModel.fetch().then(() => {
        if (mounted) {
          setModel(testModel)
        }
      })
    }

    return () => {
      mounted = false
    }
  }, [model])

  let content = <Spinner></Spinner>

  if (id && model?.tests) {
    const { name } = model.tests.find((el) => el.id === +id)
    content = (
      <React.Fragment>
        <h3 className="results__element">{name}</h3>
      </React.Fragment>
    )
  }

  return (
    <div className="container">
      <h1 className="heading">{title}</h1>
      <div className="results__wrapper">{content}</div>
      <button onClick={() => history.push("/")} className="results__back">
        back
      </button>
    </div>
  )
}
