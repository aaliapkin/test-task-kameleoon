import React from "react"
import "css/empty.scss"

export default function Error() {
  return (
    <div className="empty__wrapper">
      <h3 className="empty__message empty__message--error">
        Something went wrong. No data fetched.
      </h3>
    </div>
  )
}
