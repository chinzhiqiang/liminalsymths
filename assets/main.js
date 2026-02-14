// 點擊作品
stack.addEventListener("click", (e) => {
  const card = e.target.closest(".card");
  if (!card || page.classList.contains("is-detail")) return;

  const work = WORKS.find(w => w.id === card.dataset.id);
  const img = card.querySelector("img");
  const rect = img.getBoundingClientRect();

  // 標記這張卡片為 active 以隱藏原圖，防止兩張圖重疊
  card.classList.add("is-active");

  // 創建動畫分身 (FLIP)
  const clone = img.cloneNode(true);
  clone.id = "flipping-img";
  Object.assign(clone.style, {
    position: "fixed",
    top: rect.top + "px",
    left: rect.left + "px",
    width: rect.width + "px",
    height: rect.height + "px",
    transition: "all 0.8s cubic-bezier(0.2, 0.9, 0.2, 1)",
    zIndex: "99",
    objectFit: "contain"
  });
  document.body.appendChild(clone);

  // 進入詳情模式
  page.classList.add("is-detail");

  // 圖片向左滑至原本 Logo 的垂直置中位置
  setTimeout(() => {
    clone.style.top = "50%";
    clone.style.left = "var(--pad)";
    clone.style.transform = "translateY(-50%)"; // 垂直置中
    clone.style.width = "40vw";
    clone.style.height = "auto";
  }, 10);

  // 執行亂碼過渡 (資訊維持字級小兩倍)
  scramble(infoTitle, work.title);
  scramble(infoBody, work.body);
  scramble(infoMeta, work.meta);
});

// Back 按鈕修正
backBtn.addEventListener("click", () => {
  page.classList.remove("is-detail");
  document.getElementById("flipping-img")?.remove();
  
  // 顯示回原本的圖
  document.querySelector(".card.is-active")?.classList.remove("is-active");

  // 恢復首頁亂碼
  scramble(infoTitle, "liminalsynths");
  scramble(infoBody, "signifies a synthesis in transition...");
});
