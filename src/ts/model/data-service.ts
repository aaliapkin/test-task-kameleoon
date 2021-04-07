const BaseUrl = "http://localhost:3100/";

export const fetchSites = async function () {
  const url = `${BaseUrl}sites`;
  const res = await fetch(url);
  if (!res.ok) {
    throw new Error(`Could not fetch ${url}, received ${res.status}`);
  }
  return await res.json();
};

export const fetchTests = async function () {
  const url = `${BaseUrl}tests`;
  const res = await fetch(url);
  if (!res.ok) {
    throw new Error(`Could not fetch ${url}, received ${res.status}`);
  }
  return await res.json();
};
