const page = document.getElementById("page");
const stack = document.getElementById("stack");
const backBtn = document.getElementById("backBtn");
const detailView = document.getElementById("detailView");
const infoTitle = document.getElementById("infoTitle");
const infoBody = document.getElementById("infoBody");

const WORKS = [
  { id: "01", title: "THRESHOLD — 01", body: "signifies a synthesis in transition. where liminal states meet synths of form and thought.", img: "assets/works/01.jpg" },
  { id: "02", title: "SYNTHESIS — 02", body: "It captures the generative tension between concepts and mediums.", img: "assets/works/01.jpg" }
];

// 初始化
WORKS.forEach(w => {
  const card = document.createElement("div");
  card.className = "card";
  card.innerHTML = `<span class="card-num">${w.id}</span><img src="${w.img}" data-id="${w.id}">`;
  stack.appendChild(card);
});

function scramble(el, txt) {
  const chars = "!<>-_\\/[]{}—=+*^?#________";
  let i = 0;
  clearInterval(el.iv);
  el.iv = setInterval(() => {
    el.innerText = txt.split("").map((c, n) => n < i ? txt[n] : chars[Math.floor(Math.random() * chars.length)]).join("");
    if (i >= txt.length) clearInterval(el.iv);
    i += 3; // 超快速出現 (約0.8秒)
  }, 20);
}

// 點擊事件：直接切換
stack.addEventListener("click", (e) => {
  if (e.target.tagName !== "IMG") return;
  const work = WORKS.find(w => w.id === e.target.dataset.id);

  // 1. 設置詳情圖並切換頁面狀態
  detailView.innerHTML = `<img src="${work.img}">`;
  page.classList.add("is-detail");

  // 2. 文字亂碼
  scramble(infoTitle, work.title);
  scramble(infoBody, work.body);
});

// 返回首頁
backBtn.addEventListener("click", () => {
  page.classList.remove("is-detail");
  detailView.innerHTML = "";
  
  scramble(infoTitle, "liminalsynths");
  scramble(infoBody, "signifies a synthesis in transition...");
});
