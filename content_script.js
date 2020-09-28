"use strict";

document.ondblclick = function () {
  const selectedMessage = window.getSelection().toString();

  chrome.runtime.sendMessage({ word: selectedMessage }, async function (
    response
  ) {
    if (response.status === 200) {
      console.log(response.body);
    } else {
      console.log(response);
    }
  });
};
