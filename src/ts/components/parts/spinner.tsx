import React from "react"
import "css/spinner.scss"

export default function Spinner() {
  return (
    <div className="spinner__container">
      <div className="spinner" data-testid="spinner-element"></div>
    </div>
  )
}
