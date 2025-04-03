const { normalizeURL, getUrlsFromHTML } = require("./crawl.js");
const { test, expect } = require("@jest/globals");

test("normalizeURL", () => {
  const input = "https://blog.boot.dev/path";
  const actual = normalizeURL(input);
  const expected = "blog.boot.dev/path";
  expect(actual).toEqual(expected);
});

test("normalizeURL strip trailing slash", () => {
  const input = "https://blog.boot.dev/path/";
  const actual = normalizeURL(input);
  const expected = "blog.boot.dev/path";
  expect(actual).toEqual(expected);
});

test("normalizeURL capitals", () => {
  const input = "https://BLOG.boot.dev/path/";
  const actual = normalizeURL(input);
  const expected = "blog.boot.dev/path";
  expect(actual).toEqual(expected);
});

test("normalizeURL strip http", () => {
  const input = "http://blog.boot.dev/path/";
  const actual = normalizeURL(input);
  const expected = "blog.boot.dev/path";
  expect(actual).toEqual(expected);
});

test("getUrlsFromHTML absolute", () => {
  const inputHTMLBody =
    '<html><body><a href="https://blog.boot.dev/"><span>TEST</span></a></body></html>';
  const inputBaseURL = "https://blog.boot.dev";
  const actual = getUrlsFromHTML(inputHTMLBody, inputBaseURL);
  const expected = ["https://blog.boot.dev/"];
  expect(actual).toEqual(expected);
});

test("getUrlsFromHTML relative", () => {
  const inputHTMLBody =
    '<html><body><a href="/path/"><span>TEST</span></a></body></html>';
  const inputBaseURL = "https://blog.boot.dev";
  const actual = getUrlsFromHTML(inputHTMLBody, inputBaseURL);
  const expected = ["https://blog.boot.dev/path/"];
  expect(actual).toEqual(expected);
});

test("getUrlsFromHTML multiple", () => {
  const inputHTMLBody =
    '<html><body><a href="/path1/"><span>TEST 1</span></a><a href="https://blog.boot.dev/path2/"><span>TEST 2</span></a></body></html>';
  const inputBaseURL = "https://blog.boot.dev";
  const actual = getUrlsFromHTML(inputHTMLBody, inputBaseURL);
  const expected = [
    "https://blog.boot.dev/path1/",
    "https://blog.boot.dev/path2/",
  ];
  expect(actual).toEqual(expected);
});

test("getUrlsFromHTML invalidUrl", () => {
  const inputHTMLBody =
    '<html><body><a href="invalid"><span>TEST 1</span></a></body></html>';
  const inputBaseURL = "https://blog.boot.dev";
  const actual = getUrlsFromHTML(inputHTMLBody, inputBaseURL);
  const expected = [];
  expect(actual).toEqual(expected);
});
