// 亂碼函式
function scramble(element, targetText) {
  const chars = "!<>-_\\/[]{}—=+*^?#________";
  let iteration = 0;
  clearInterval(element.scrambleInterval);
  element.scrambleInterval = setInterval(() => {
    element.innerText = targetText.split("").map((char, index) => {
      if (index < iteration) return targetText[index];
      return chars[Math.floor(Math.random() * chars.length)];
    }).join("");
    if (iteration >= targetText.length) clearInterval(element.scrambleInterval);
    iteration += 1 / 3;
  }, 30);
}

// 監聽點擊
stack.addEventListener("click", (e) => {
  const card = e.target.closest(".card");
  if (!card || page.classList.contains("is-detail")) return;

  const img = card.querySelector("img");
  const rect = img.getBoundingClientRect();

  // 1. 隱藏原圖，解決重疊問題
  card.classList.add("is-hidden");

  // 2. 建立動畫分身
  const clone = img.cloneNode(true);
  clone.id = "flipping-img";
  Object.assign(clone.style, {
    position: "fixed",
    top: rect.top + "px",
    left: rect.left + "px",
    width: rect.width + "px",
    height: rect.height + "px",
    zIndex: "999",
    transition: "all 0.8s cubic-bezier(0.2, 0.9, 0.2, 1)",
    objectFit: "contain"
  });
  document.body.appendChild(clone);

  // 3. 執行位移：圖片移至左方且垂直置中
  requestAnimationFrame(() => {
    page.classList.add("is-detail");
    clone.style.top = "50%";
    clone.style.left = "var(--pad)";
    clone.style.transform = "translateY(-50%)"; // 垂直置中關鍵
    clone.style.width = "40vw";
    clone.style.height = "auto";
  });

  // 4. 右側文字亂碼切換 (假資訊)
  scramble(infoTitle, "WORK — " + card.dataset.id);
  scramble(infoBody, "This synthetic study explores the transition between states. Generated forms manifest as digital artifacts.");
});

// Back 返回按鈕
backBtn.addEventListener("click", () => {
  page.classList.remove("is-detail");
  document.getElementById("flipping-img")?.remove();
  document.querySelector(".card.is-hidden")?.classList.remove("is-hidden");

  scramble(infoTitle, "liminalsynths");
  scramble(infoBody, "signifies a synthesis in transition...");
});
