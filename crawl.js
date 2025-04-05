const { JSDOM } = require("jsdom");

async function crawlPage(currentURL) {
  console.log(`actively crwaling: ${currentURL}`);

  try {
    const resp = await fetch(currentURL);

    if (resp.status > 399) {
      console.log(
        `error in fetch with status code: ${resp.status} on page: ${currentURL}`
      );
      return;
    }

    const contentType = resp.headers.get("content-type");
    if (!contentType.includes("text/html")) {
      console.log(
        `non html response, content type: ${contentType} on page: ${currentURL}`
      );
      return;
    }

    console.log(await resp.text());
  } catch (err) {
    console.log(`error, on link: ${err}`);
  }
}

function getUrlsFromHTML(htmlBody, baseURL) {
  const urls = [];
  const dom = new JSDOM(htmlBody);
  const linkELements = dom.window.document.querySelectorAll("a");
  for (const linkELement of linkELements) {
    if (linkELement.href.slice(0, 1) === "/") {
      //relative
      try {
        const urlObj = new URL(`${baseURL}${linkELement.href}`);
        urls.push(urlObj.href);
      } catch (err) {
        console.log(`error: ${err.message}`);
      }
    } else {
      //absolute
      try {
        const urlObj = new URL(linkELement.href);
        urls.push(urlObj.href);
      } catch (err) {
        console.log(`error: ${err.message}`);
      }
    }
  }
  return urls;
}

function normalizeURL(urlString) {
  const urlObj = new URL(urlString);
  const hostpath = `${urlObj.hostname}${urlObj.pathname}`;
  if (hostpath.length > 0 && hostpath.slice(-1) === "/") {
    return hostpath.slice(0, -1);
  }
  return hostpath;
}

module.exports = {
  normalizeURL,
  getUrlsFromHTML,
  crawlPage,
};
