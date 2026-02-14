const stack = document.getElementById("stack");
const page = document.getElementById("page");
const backBtn = document.getElementById("backBtn");
const infoTitle = document.getElementById("infoTitle");
const infoBody = document.getElementById("infoBody");

const WORKS = [
  { id: "01", title: "Project: Liminality", body: "Exploration of digital thresholds and synthetic forms in transition.", img: "assets/works/01.jpg" },
  { id: "02", title: "Project: Synth02", body: "Generative patterns emerging from noise and structure interference.", img: "assets/works/01.jpg" },
];

// 1. 初始化列表：加上 01, 02 編號
WORKS.forEach(w => {
  const card = document.createElement("div");
  card.className = "card";
  card.dataset.id = w.id;
  card.innerHTML = `
    <span class="card-num">${w.id}</span>
    <img src="${w.img}" alt="${w.id}">
  `;
  stack.appendChild(card);
});

// 2. 亂碼函式
function scramble(element, targetText) {
  const chars = "!<>-_\\/[]{}—=+*^?#________";
  let iteration = 0;
  const interval = setInterval(() => {
    element.innerText = targetText.split("").map((char, index) => {
      if (index < iteration) return targetText[index];
      return chars[Math.floor(Math.random() * chars.length)];
    }).join("");
    if (iteration >= targetText.length) clearInterval(interval);
    iteration += 1 / 3;
  }, 30);
}

// 3. 點擊圖片：執行位移與變換
stack.addEventListener("click", (e) => {
  const card = e.target.closest(".card");
  if (!card || page.classList.contains("is-detail")) return;

  const work = WORKS.find(w => w.id === card.dataset.id);
  const img = card.querySelector("img");
  const rect = img.getBoundingClientRect();

  // 創建動畫分身
  const clone = img.cloneNode(true);
  clone.id = "flipping-img";
  Object.assign(clone.style, {
    top: rect.top + "px",
    left: rect.left + "px",
    width: rect.width + "px",
    height: rect.height + "px"
  });
  document.body.appendChild(clone);

  // 切換狀態
  page.classList.add("is-detail");

  // 讓圖片飛向原本 Logo 的位置 (左側)
  setTimeout(() => {
    clone.style.top = "18vh";
    clone.style.left = "var(--pad)";
    clone.style.width = "26vw"; // 符合左欄寬度
    clone.style.height = "auto";
  }, 10);

  // 文字亂碼切換
  scramble(infoTitle, work.title);
  scramble(infoBody, work.body);
});

// 4. 返回
backBtn.addEventListener("click", () => {
  page.classList.remove("is-detail");
  document.getElementById("flipping-img")?.remove();

  scramble(infoTitle, "liminalsynths");
  scramble(infoBody, "signifies a synthesis in transition.\nwhere liminal states meet synths of\nform and thought.");
});
