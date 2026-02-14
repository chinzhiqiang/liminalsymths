const chars = "!<>-_\\/[]{}—=+*^?#________";

// 亂碼動畫函式
function scrambleText(element, targetText) {
  let iteration = 0;
  const interval = setInterval(() => {
    element.innerText = targetText
      .split("")
      .map((char, index) => {
        if (index < iteration) return targetText[index];
        return chars[Math.floor(Math.random() * chars.length)];
      })
      .join("");

    if (iteration >= targetText.length) clearInterval(interval);
    iteration += 1 / 3;
  }, 30);
}

// 點擊圖片邏輯
stack.addEventListener("click", (e) => {
  const card = e.target.closest(".card");
  if (!card || page.classList.contains("is-detail")) return;

  const img = card.querySelector("img");
  const rect = img.getBoundingClientRect();
  
  // 進入詳情模式
  page.classList.add("is-detail");

  // 創建一個用來做動畫的複製品
  const clone = img.cloneNode(true);
  clone.classList.add("flipping-img");
  Object.assign(clone.style, {
    position: "fixed",
    top: `${rect.top}px`,
    left: `${rect.left}px`,
    width: `${rect.width}px`,
    height: `${rect.height}px`,
    transition: "all 0.7s cubic-bezier(0.2, 0.9, 0.2, 1)",
    zIndex: "99"
  });
  document.body.appendChild(clone);

  // 下一幀觸移動：放大並移至左側
  requestAnimationFrame(() => {
    clone.style.top = "18vh";
    clone.style.left = "var(--pad)";
    clone.style.width = "40vw";
    clone.style.height = "auto";
  });

  // 右側文字亂碼過渡
  scrambleText(infoTitle, "WORK — " + card.dataset.id);
  scrambleText(infoBody, "This is a generative experiment exploring digital liminality. Simulated data and synthetic forms converge in this study.");
});

// 返回首頁
backBtn.addEventListener("click", () => {
  page.classList.remove("is-detail");
  document.querySelector(".flipping-img")?.remove();
  
  // 恢復首頁文字
  scrambleText(infoTitle, "liminalsynths");
  scrambleText(infoBody, "signifies a synthesis in transition...");
});
