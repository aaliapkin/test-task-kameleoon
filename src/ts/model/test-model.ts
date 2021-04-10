import { fetchSites, fetchTests } from "./data-service"

const colors = ["rgb(134, 134, 255)", "rgb(225, 65, 101)", "rgb(194,194,255)"]

export type TStatus = "DRAFT" | "ONLINE" | "PAUSED" | "STOPPED"
export type ITestStringKeys = "status" | "name" | "site" | "type"

export interface ITest {
  id: number
  name: string
  type: string
  status: TStatus
  siteId: number
  color: string
  site: string
}

export interface ISite {
  id: number
  url: string
}

export default class TestModel {
  tests: Array<ITest> = []

  async fetch(): Promise<void> {
    const tests = await fetchTests()
    const sites = await fetchSites()
    this.tests = tests.map((t: ITest) => {
      let url = sites.find((s: ISite) => s.id === t.siteId).url
      url = url.replace(/https?:\/\/(?:www.)?/, "")
      return { ...t, site: url, color: addColor(t.siteId) }
    })
  }
}
function addColor(id: number) {
  return colors[Math.floor(id % colors.length)]
}
