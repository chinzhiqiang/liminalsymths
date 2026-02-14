const page = document.getElementById("page");
const stack = document.getElementById("stack");
const infoTitle = document.getElementById("infoTitle");
const infoBody = document.getElementById("infoBody");

const WORKS = [
  { id: "01", title: "THRESHOLD — 01", body: "signifies a synthesis in transition. where liminal states meet synths of form and thought.", img: "assets/works/01.jpg" },
  { id: "02", title: "SYNTHESIS — 02", body: "It captures the generative tension between concepts and mediums.", img: "assets/works/01.jpg" }
];

// 初始化
stack.innerHTML = "";
WORKS.forEach(w => {
  const card = document.createElement("div");
  card.className = "card";
  card.dataset.id = w.id;
  card.innerHTML = `<span class="card-num">${w.id}</span><img src="${w.img}" alt="${w.id}">`;
  stack.appendChild(card);
});

// 終極加速亂碼：0.8s - 1.2s 內收斂
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
    i += 2.5; // 大幅增加步進，文字會極快出現
  }, 25);
}

stack.addEventListener("click", (e) => {
  const card = e.target.closest(".card");
  if (!card || page.classList.contains("is-detail")) return;

  const work = WORKS.find(w => w.id === card.dataset.id);
  const img = card.querySelector("img");
  const rect = img.getBoundingClientRect();

  card.classList.add("is-active");

  const clone = img.cloneNode(true);
  clone.id = "flipping-img";
  Object.assign(clone.style, {
    top: rect.top + "px", left: rect.left + "px",
    width: rect.width + "px", height: rect.height + "px"
  });
  document.body.appendChild(clone);

  setTimeout(() => {
    page.classList.add("is-detail");
    clone.style.top = "50%";
    clone.style.left = "var(--pad)";
    clone.style.transform = "translateY(-50%)"; 
    clone.style.width = "30vw"; // 詳情頁圖片寬度
    clone.style.height = "auto";
  }, 10);

  scramble(infoTitle, work.title);
  scramble(infoBody, work.body);
});
