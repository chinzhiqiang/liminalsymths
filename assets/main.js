(() => {
  const page = document.getElementById("page");
  const stack = document.getElementById("stack");
  const focus = document.getElementById("focus");
  const backBtn = document.getElementById("backBtn");

  const infoTitle = document.getElementById("infoTitle");
  const infoBody = document.getElementById("infoBody");
  const infoMeta = document.getElementById("infoMeta");
  const infoContact = document.getElementById("infoContact");

  // ✅ 這裡只要加作品就好
  // img 可先不放，沒圖就維持灰塊+X（更像附圖）
  const WORKS = [
    {
      id:"01",
      img:"assets/works/01.jpg",
      title:"Work 01 — Threshold Study",
      body:
        "A study on liminal surfaces and typographic tension.\n" +
        "Material experiments, compression, and release.\n" +
        "Placeholder description for now.",
      meta:"Graphic / Identity / System",
      contact:"2026 · liminalsynths"
    },
    {
      id:"02",
      img:"assets/works/02.jpg",
      title:"Work 02 — Hybrid Signal",
      body:
        "A hybrid visual system for transitional states.\n" +
        "Grid discipline vs. noise drift.\n" +
        "Placeholder description for now.",
      meta:"Motion / Posters / Direction",
      contact:"2026 · liminalsynths"
    },
    {
      id:"03",
      img:"assets/works/03.jpg",
      title:"Work 03 — Liminal Key",
      body:
        "Interaction as narrative cue.\n" +
        "A key-like object locked in a page.\n" +
        "Placeholder description for now.",
      meta:"Interactive / Web",
      contact:"2026 · liminalsynths"
    }
  ];

  // ---- 建立卡片（直向堆疊） ----
  function build(){
    stack.innerHTML = "";

    WORKS.forEach((w) => {
      const card = document.createElement("div");
      card.className = "card";
      card.dataset.workId = w.id;

      const label = document.createElement("span");
      label.className = "label";
      label.textContent = w.id;

      // 作品圖（可不存在：不存在就保持灰塊+X）
      const img = document.createElement("img");
      img.className = "thumb";
      img.alt = `work ${w.id}`;
      img.src = w.img;
      img.loading = "lazy";
      img.onerror = () => img.remove();

      card.appendChild(img);
      card.appendChild(label);

      card.addEventListener("click", () => openDetail(w, card));
      stack.appendChild(card);
    });
  }

  // ---- 亂碼過渡（&*^$...） ----
  function scrambleTo(el, finalText, duration = 700){
    const chars = "!@#$%^&*()_+-=[]{};:,.<>?/|~";
    const start = performance.now();
    const from = el.textContent;
    const final = finalText;

    const isP = el.tagName.toLowerCase() === "p";

    function tick(t){
      const p = Math.min(1, (t - start) / duration);
      const outLen = Math.max(from.length, final.length);

      let out = "";
      const reveal = p * outLen;

      for (let i=0;i<outLen;i++){
        if (i < reveal) out += (final[i] ?? "");
        else out += chars[Math.floor(Math.random()*chars.length)];
      }

      if (isP) el.innerHTML = out.replace(/\n/g, "<br>");
      else el.textContent = out;

      if (p < 1) requestAnimationFrame(tick);
      else {
        if (isP) el.innerHTML = final.replace(/\n/g, "<br>");
        else el.textContent = final;
      }
    }
    requestAnimationFrame(tick);
  }

  // ---- 點擊進 detail：卡片放大移左 + logo 滑出 + 右側文字亂碼變更 ----
  function openDetail(work, cardEl){
    if (page.classList.contains("is-detail")) return;

    page.classList.add("is-detail");

    // focus box
    focus.innerHTML = "";
    const box = document.createElement("div");
    box.className = "focusBox";

    // 如果卡片有圖，就放圖；沒有就保持灰塊
    const imgInCard = cardEl.querySelector("img");
    if (imgInCard){
      const img = document.createElement("img");
      img.src = imgInCard.currentSrc || imgInCard.src;
      img.alt = work.title;
      box.appendChild(img);
    }
    focus.appendChild(box);

    // ✅ FLIP 動畫：從卡片位置飛到左側 focusBox
    const from = cardEl.getBoundingClientRect();
    const to = box.getBoundingClientRect();

    const dx = from.left - to.left;
    const dy = from.top - to.top;
    const sx = from.width / to.width;
    const sy = from.height / to.height;

    box.animate(
      [
        { transform: `translate(${dx}px, ${dy}px) scale(${sx}, ${sy})` },
        { transform: `translate(0px, 0px) scale(1,1)` }
      ],
      { duration: 520, easing: "cubic-bezier(.2,.9,.2,1)", fill:"both" }
    );

    // 右側資訊亂碼切換（先假資訊）
    scrambleTo(infoTitle, work.title, 520);
    scrambleTo(infoBody, work.body, 860);
    scrambleTo(infoMeta, work.meta, 620);
    scrambleTo(infoContact, work.contact, 620);
  }

  // ---- Back 回首頁 ----
  function closeDetail(){
    if (!page.classList.contains("is-detail")) return;

    page.classList.remove("is-detail");
    focus.innerHTML = "";

    scrambleTo(infoTitle, "liminalsynths", 520);
    scrambleTo(
      infoBody,
      "signifies a synthesis in transition.\nwhere liminal states meet synths of\nform and thought.\nIt captures the generative tension\nbetween concepts and mediums,\nmanifesting in works that\nexplore thresholds and hybridities.",
      860
    );
    scrambleTo(infoMeta, "by zhiqiangchin", 620);
    scrambleTo(infoContact, "liminalsynths@gmail.com\n@liminalsynths", 620);
  }

  backBtn.addEventListener("click", closeDetail);

  build();
})();
