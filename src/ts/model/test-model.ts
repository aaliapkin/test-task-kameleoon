import { fetchSites, fetchTests } from "./data-service";

interface Test {
  id: number;
  name: string;
  type: string;
  status: string;
  site: string;
}

interface Site {
  id: number;
  url: string;
}

export default class TestModel {
  tests: Array<Test> = [];

  async fetch() {
    const tests = await fetchTests();
    const sites = await fetchSites();
    this.tests = tests.map((t) => {
      const url = sites.find((s: Site) => s.id === t.siteId).url;
      return { ...t, site: url };
    });
  }
}
