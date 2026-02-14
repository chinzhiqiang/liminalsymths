const page = document.getElementById("page");
const stack = document.getElementById("stack");
const backBtn = document.getElementById("backBtn");
const infoTitle = document.getElementById("infoTitle");
const infoBody = document.getElementById("infoBody");

// 模擬作品數據
const WORKS = [
  { id: "01", title: "Project Alpha", body: "A study in digital decay and synthetic texture.", img: "assets/works/01.jpg" },
  { id: "02", title: "Project Beta", body: "Exploring the boundary between noise and structure.", img: "assets/works/01.jpg" }, // 假設你有多張圖
];

// 初始化生成卡片
WORKS.forEach(work => {
  const card = document.createElement("div");
  card.className = "card";
  card.dataset.id = work.id;
  card.innerHTML = `<img src="${work.img}" alt="${work.id}">`;
  stack.appendChild(card);
});

// 文字亂碼效果
function scramble(element, newText) {
  const chars = "!<>-_\\/[]{}—=+*^?#________";
  let iteration = 0;
  const originalText = element.innerText;
  
  const interval = setInterval(() => {
    element.innerText = newText.split("")
      .map((char, index) => {
        if (index < iteration) return newText[index];
        return chars[Math.floor(Math.random() * chars.length)];
      })
      .join("");

    if (iteration >= newText.length) clearInterval(interval);
    iteration += 1 / 3;
  }, 30);
}

// 點擊圖片
stack.addEventListener("click", (e) => {
  const card = e.target.closest(".card");
  if (!card || page.classList.contains("is-detail")) return;

  const work = WORKS.find(w => w.id === card.dataset.id);
  const img = card.querySelector("img");
  const rect = img.getBoundingClientRect();

  // 1. 執行 FLIP 動畫：創建分身
  const clone = img.cloneNode(true);
  clone.id = "active-img";
  Object.assign(clone.style, {
    position: "fixed",
    top: rect.top + "px",
    left: rect.left + "px",
    width: rect.width + "px",
    height: rect.height + "px",
    transition: "all 0.8s cubic-bezier(0.2, 0.9, 0.2, 1)",
    zIndex: "95",
    objectFit: "contain"
  });
  document.body.appendChild(clone);

  // 2. 觸發狀態切換
  page.classList.add("is-detail");

  // 3. 讓分身飛向左側
  setTimeout(() => {
    clone.style.top = "18vh";
    clone.style.left = "var(--pad)";
    clone.style.width = "40vw";
    clone.style.height = "70vh";
  }, 10);

  // 4. 文字亂碼過渡
  scramble(infoTitle, work.title);
  scramble(infoBody, work.body);
});

// 返回功能
backBtn.addEventListener("click", () => {
  page.classList.remove("is-detail");
  const activeImg = document.getElementById("active-img");
  if (activeImg) activeImg.remove();

  // 恢復初始文字
  scramble(infoTitle, "liminalsynths");
  scramble(infoBody, "signifies a synthesis in transition...");
});
