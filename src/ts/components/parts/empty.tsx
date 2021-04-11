import React from "react"
import "css/empty.scss"

export default function Empty({ onClear }: { onClear: () => void }) {
  return (
    <div className="empty__wrapper">
      <h3 className="empty__message">Your search did not match any results.</h3>
      <button className="empty__reset-button" onClick={onClear}>
        reset
      </button>
    </div>
  )
}
