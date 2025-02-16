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

  // Pause other videos on play of current one.
  document.addEventListener(
    "play",
    function (event) {
      document.querySelectorAll("video").forEach((video) => {
        if (video !== event.target) video.pause();
      });
    },
    true
  );

  function showDiv(id) {
    const contentTypeDiv = document.createElement("div");
    contentTypeDiv.id = id;
    contentTypeDiv.style = `
    gap: 30px;
    display: flex;
    justify-content: center
    `;

    const reelVideoContainer = document.getElementById("reel-content-area");
    const longVideoContainer = document.getElementById("lv-content-area");
    if (Object.keys(reelVideos).some((key) => contentTypeDiv.id === key)) {
      reelVideoContainer.innerHTML = "";
      reelVideoContainer.appendChild(contentTypeDiv);
      reelVideoContainer
        .querySelectorAll(".content")
        .forEach((div) => (div.style.display = "none"));
      document.getElementById(id).style.display = "flex";
      loadVideos(contentTypeDiv);
    }
    if (Object.keys(longVideos).some((key) => contentTypeDiv.id === key)) {
      longVideoContainer.innerHTML = "";
      longVideoContainer.appendChild(contentTypeDiv);
      longVideoContainer
        .querySelectorAll(".content")
        .forEach((div) => (div.style.display = "none"));
      document.getElementById(id).style.display = "flex";
      loadVideos(contentTypeDiv);
    }
  }

  function loadVideos(contentTypeDiv) {
    const videos = contentTypeDiv.id.includes("vlogs")
      ? longVideos[contentTypeDiv.id]
      : reelVideos[contentTypeDiv.id];

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
        showDiv("aesthetic-montage");
      }
      if (
        detail.open &&
        detail.querySelector("summary").textContent === "Long Videos"
      ) {
        showDiv("vlogs");
      }
    });
  });
});
