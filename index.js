import { reelVideos, longVideos } from "./public/files.js";

document.addEventListener("DOMContentLoaded", function () {
  // dark-mode
  const toggleButton = document.getElementById("toggle-dark-mode");
  const body = document.body;
  toggleButton.addEventListener("click", () => {
    body.classList.toggle("dark-mode");
    toggleButton.textContent = body.classList.contains("dark-mode")
      ? "Disable Dark Mode"
      : "Enable Dark Mode";
  });

  function showDiv(id) {
    const reelVideoContainer = document.getElementById("reel-content-area");
    const longVideoContainer = document.getElementById("lv-content-area");
    let contentTypeDiv = document.getElementById(`${id}`);

    if (!contentTypeDiv) {
      contentTypeDiv = document.createElement("div");
      contentTypeDiv.id = id;
      contentTypeDiv.style = `
      gap: 30px;
      display: flex;
      justify-content: center
      `;
    }

    if (Object.keys(reelVideos).some((key) => contentTypeDiv.id === key)) {
      console.log(reelVideoContainer.children);

      for (let child of reelVideoContainer.children) {
        child.style.display = "none";
        console.log("for loop worked");
      }
      if (reelVideoContainer.querySelector(`#${id}`))
        contentTypeDiv.style.display = "flex";
      else reelVideoContainer.appendChild(contentTypeDiv);
      loadVideos(contentTypeDiv);
    }
    if (Object.keys(longVideos).some((key) => contentTypeDiv.id === key)) {
      for (let child of longVideoContainer.children)
        child.style.display = "none";
      if (longVideoContainer.querySelector(`#${id}`))
        contentTypeDiv.style.display = "flex";
      else longVideoContainer.appendChild(contentTypeDiv);
      loadVideos(contentTypeDiv);
    }
  }

  function loadVideos(contentTypeDiv) {
    const videos = contentTypeDiv.id.includes("vlogs")
      ? longVideos[contentTypeDiv.id]
      : reelVideos[contentTypeDiv.id];
    if (contentTypeDiv.innerHTML.trim() === "") {
      Object.entries(videos).forEach(([key, value]) => {
        const iFrameElement = document.createElement("iframe");
        if (contentTypeDiv.parentElement.id === "reel-content-area")
          if (!value.includes("1-IltCyOWkVSXaGHkeD4mItj7L2VbEMVw"))
            iFrameElement.classList.add("iframe-vertical");
        iFrameElement.src = value;
        iFrameElement.controls = true;
        iFrameElement.classList.add(
          // "card-img-top",
          // "img-fluid",
          // "rounded-3",
          "responsive-iframe"
        );

        const cardDiv = document.createElement("div");
        cardDiv.classList.add("content");
        cardDiv.appendChild(iFrameElement);
        contentTypeDiv.appendChild(cardDiv);
      });
    }
  }

  // ✅ Attach event listeners instead of using inline `onclick`
  document.querySelectorAll(".reels-nav-item").forEach((item) => {
    item.addEventListener("click", () => {
      const reelDivId = item.textContent
        .trim()
        .toLowerCase()
        .replace(/\s+/g, "-"); // Match ID format
      showDiv(reelDivId);
    });
  });
  document.querySelectorAll(".lv-nav-item").forEach((item) => {
    item.addEventListener("click", () => {
      const lvDivId = item.textContent
        .trim()
        .toLowerCase()
        .replace(/\s+/g, "-"); // Match ID format
      showDiv(lvDivId);
    });
  });

  // Show default section
  document.querySelectorAll("details").forEach((detail) => {
    detail.addEventListener("toggle", () => {
      if (
        detail.open &&
        detail.querySelector("summary").textContent === "Reels"
      ) {
        if (!document.getElementById("aesthetic-montage"))
          showDiv("aesthetic-montage");
      }
      if (
        detail.open &&
        detail.querySelector("summary").textContent === "Long Videos"
      ) {
        if (!document.getElementById("vlogs")) showDiv("vlogs");
      }
    });
  });
});
