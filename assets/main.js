const page = document.getElementById("page");
const stack = document.getElementById("stack");
const backBtn = document.getElementById("backBtn");
const detailView = document.getElementById("detailView");
const infoTitle = document.getElementById("infoTitle");
const infoBody = document.getElementById("infoBody");

const WORKS = [
  { id: "01", title: "THRESHOLD — 01", body: "signifies a synthesis in transition. where liminal states meet synths of form and thought. It captures the generative tension between concepts and mediums.", img: "assets/works/01.jpg" },
  { id: "02", title: "SYNTHESIS — 02", body: "Manifesting in works that explore thresholds and hybridities. A study in digital materiality and noise.", img: "assets/works/01.jpg" }
];

// 初始化
stack.innerHTML = "";
WORKS.forEach(w => {
  const card = document.createElement("div");
  card.className = "card";
  card.innerHTML = `<span class="card-num">${w.id}</span><img src="${w.img}" data-id="${w.id}">`;
  stack.appendChild(card);
});

// 亂碼加速：i += 3 配合 20ms，1 秒內收斂
function scramble(el, txt) {
  const chars = "!<>-_\\/[]{}—=+*^?#________";
  let i = 0;
  clearInterval(el.iv);
  el.iv = setInterval(() => {
    el.innerText = txt.split("").map((c, n) => {
      if (n < i) return txt[n];
      return chars[Math.floor(Math.random() * chars.length)];
    }).join("");
    if (i >= txt.length) clearInterval(el.iv);
    i += 3; 
  }, 20);
}

// 點擊事件 (取消飛行動畫，直接切換狀態)
stack.addEventListener("click", (e) => {
  if (e.target.tagName !== "IMG") return;
  const work = WORKS.find(w => w.id === e.target.dataset.id);

  // 切換至詳情
  detailView.innerHTML = `<img src="${work.img}">`;
  page.classList.add("is-detail");

  scramble(infoTitle, work.title);
  scramble(infoBody, work.body);
});

// 返回
backBtn.addEventListener("click", () => {
  page.classList.remove("is-detail");
  detailView.innerHTML = "";

  scramble(infoTitle, "liminalsynths");
  scramble(infoBody, "signifies a synthesis in transition. where liminal states meet synths of form and thought.");
});
