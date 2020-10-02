"use strict";

document.ondblclick = function (e) {
  const selectedMessage = window.getSelection().toString();

  if (!selectedMessage.trim() || !chrome.runtime) return;

  chrome.runtime.sendMessage({ word: selectedMessage }, async function (
    response
  ) {
    if (response.status === 200) {
      const div = document.createElement("div");
      div.classList.add("_daum_dict");
      div.setAttribute("id", `_daum_dict`);

      const ul = document.createElement("ul");

      response.body.forEach((word) => {
        const li = document.createElement("li");
        li.textContent = word;
        ul.appendChild(li);
      });

      div.style.zIndex = "999";
      div.style.position = "absolute";
      div.style.backgroundColor = "white";

      const targetRect = e.target.getBoundingClientRect();

      div.style.top = `${
        parseInt(e.clientY + window.scrollY + e.target.style.height) + 15
      }px`;
      div.style.left = `${e.clientX}px`;

      div.onmouseleave = function (e) {
        div.parentNode.removeChild(div);
      };

      div.appendChild(ul);
      document.body.appendChild(div);
    }
  });
};
