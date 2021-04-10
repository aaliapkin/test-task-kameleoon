//const BaseUrl = "http://localhost:3100/"

const BaseUrl = "https://test-task-kameleoon.herokuapp.com/"

import { ISite, ITest } from "ts/model/test-model"

export const fetchSites = async function (): Promise<Array<ISite>> {
  const url = `${BaseUrl}sites`
  const res = await fetch(url)
  if (!res.ok) {
    throw new Error(`Could not fetch ${url}, received ${res.status}`)
  }
  return await res.json()
}

export const fetchTests = async function (): Promise<Array<ITest>> {
  const url = `${BaseUrl}tests`
  const res = await fetch(url)
  if (!res.ok) {
    throw new Error(`Could not fetch ${url}, received ${res.status}`)
  }
  return await res.json()
}
