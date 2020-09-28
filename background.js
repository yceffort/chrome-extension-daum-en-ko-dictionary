"use strict";

chrome.runtime.onMessage.addListener(function (request, sender, sendResponse) {
  const { word } = request;

  fetch(`https://dic.daum.net/search.do?q=${word}`).then((response) => {
    if (response.status === 200) {
      response.text().then((text) => {
        const parser = new DOMParser();
        const daumDocument = parser.parseFromString(text, "text/html");
        const searchResults = daumDocument.querySelector(".search_box");

        if (searchResults) {
          const searchLi = searchResults.getElementsByTagName("li");

          const results = [...searchLi].map((li) =>
            [...li.getElementsByClassName("txt_search")]
              .map((txt) => txt.innerHTML.replace(/(<([^>]+)>)/gi, ""))
              .join("")
          );

          sendResponse({
            status: response.status,
            body: results,
          });
        }
      });
    } else {
      sendResponse({
        status: response.status,
      });
    }
  });

  // const response = await fetch(`https://dic.daum.net/search.do?q=${word}`);

  return true;
});
