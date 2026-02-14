const page = document.getElementById("page");
const stack = document.getElementById("stack");
const backBtn = document.getElementById("backBtn");
const infoTitle = document.getElementById("infoTitle");
const infoBody = document.getElementById("infoBody");

// 作品假資料
const WORKS = [
  { id: "01", title: "THRESHOLD — 01", body: "Exploring digital liminality through generative forms and noise patterns.", img: "assets/works/01.jpg" },
  { id: "02", title: "SYNTHESIS — 02", body: "A study in transition states between organic and synthetic visual structures.", img: "assets/works/01.jpg" }
];

// 初始化
WORKS.forEach(w => {
  const card = document.createElement("div");
  card.className = "card";
  card.dataset.id = w.id;
  card.innerHTML = `<span class="card-num">${w.id}</span><img src="${w.img}" alt="${w.id}">`;
  stack.appendChild(card);
});

function scramble(el, txt) {
  const chars = "!<>-_\\/[]{}—=+*^?#________";
  let i = 0;
  clearInterval(el.iv);
  el.iv = setInterval(() => {
    el.innerText = txt.split("").map((c, n) => n < i ? txt[n] : chars[Math.floor(Math.random() * chars.length)]).join("");
    if (i >= txt.length) clearInterval(el.iv);
    i += 1/3;
  }, 30);
}

stack.addEventListener("click", (e) => {
  const card = e.target.closest(".card");
  if (!card || page.classList.contains("is-detail")) return;

  const work = WORKS.find(w => w.id === card.dataset.id);
  const img = card.querySelector("img");
  const rect = img.getBoundingClientRect();

  card.classList.add("is-active"); // 隱藏原圖

  const clone = img.cloneNode(true);
  clone.id = "flipping-img";
  Object.assign(clone.style, {
    top: rect.top + "px", left: rect.left + "px",
    width: rect.width + "px", height: rect.height + "px"
  });
  document.body.appendChild(clone);

  setTimeout(() => {
    page.classList.add("is-detail");
    // 飛向左側垂直置中位置
    clone.style.top = "50%";
    clone.style.left = "var(--pad)";
    clone.style.transform = "translateY(-50%)";
    clone.style.width = "26vw";
    clone.style.height = "auto";
  }, 10);

  scramble(infoTitle, work.title);
  scramble(infoBody, work.body);
});

backBtn.addEventListener("click", () => {
  page.classList.remove("is-detail");
  document.getElementById("flipping-img")?.remove();
  document.querySelector(".card.is-active")?.classList.remove("is-active");
  scramble(infoTitle, "liminalsynths");
  scramble(infoBody, "signifies a synthesis in transition...");
});
