(() => {
  const page = document.getElementById("page");
  const rail = document.getElementById("rail");
  const focus = document.getElementById("focus");
  const backBtn = document.getElementById("backBtn");

  const infoTitle = document.getElementById("infoTitle");
  const infoBody = document.getElementById("infoBody");
  const infoMeta = document.getElementById("infoMeta");
  const infoContact = document.getElementById("infoContact");

  // 你之後只要在這裡加作品就好
  // img 先用 placeholder，你可以換成 assets/works/01.jpg 之類
  const WORKS = [
    {
      id: "01",
      img: "assets/works/01.jpg", // 沒有也沒關係，會顯示灰底
      title: "Work 01 — Threshold Study",
      body:
        "A study on liminal surfaces and typographic tension.\n" +
        "Material experiments, compression, and release.\n" +
        "This is placeholder copy.",
      meta: "Graphic / Identity / System",
      contact: "2026 · liminalsynths"
    },
    {
      id: "02",
      img: "assets/works/02.jpg",
      title: "Work 02 — Hybrid Signal",
      body:
        "A hybrid visual system for transitional states.\n" +
        "Grid discipline vs. noise drift.\n" +
        "This is placeholder copy.",
      meta: "Motion / Posters / Direction",
      contact: "2026 · liminalsynths"
    },
    {
      id: "03",
      img: "assets/works/03.jpg",
      title: "Work 03 — Liminal Key",
      body:
        "A key-like object locked inside a page-frame.\n" +
        "Interaction as a narrative cue.\n" +
        "This is placeholder copy.",
      meta: "Interactive / Web / Installation",
      contact: "2026 · liminalsynths"
    }
  ];

  // --------- 生成卡片 ---------
  function buildCards() {
    rail.innerHTML = "";
    WORKS.forEach((w, idx) => {
      const card = document.createElement("div");
      card.className = "card";
      card.dataset.workId = w.id;

      const num = document.createElement("span");
      num.className = "num";
      num.textContent = w.id;

      // img 可不存在：用 onerror fallback
      const img = document.createElement("img");
      img.className = "thumb";
      img.alt = `work ${w.id}`;
      img.src = w.img;
      img.loading = "lazy";
      img.onerror = () => {
        img.remove(); // 沒圖就留灰底
      };

      card.appendChild(img);
      card.appendChild(num);

      card.addEventListener("click", () => openWork(w, card));

      rail.appendChild(card);
    });
  }

  // --------- 中間滑動體驗：滑鼠滾輪橫移 ---------
  rail.addEventListener(
    "wheel",
    (e) => {
      // 觸控板水平滾動就放行；垂直滾動轉水平
      if (Math.abs(e.deltaY) > Math.abs(e.deltaX)) {
        e.preventDefault();
        rail.scrollLeft += e.deltaY;
      }
    },
    { passive: false }
  );

  // 也支援拖曳滑動（桌機更直覺）
  let dragging = false;
  let dragX = 0;
  let startLeft = 0;

  rail.addEventListener("pointerdown", (e) => {
    if (page.classList.contains("is-detail")) return;
    dragging = true;
    dragX = e.clientX;
    startLeft = rail.scrollLeft;
    rail.setPointerCapture?.(e.pointerId);
  });

  rail.addEventListener("pointermove", (e) => {
    if (!dragging) return;
    const dx = e.clientX - dragX;
    rail.scrollLeft = startLeft - dx;
  });

  const endDrag = (e) => {
    dragging = false;
    try { rail.releasePointerCapture?.(e.pointerId); } catch (_) {}
  };
  rail.addEventListener("pointerup", endDrag);
  rail.addEventListener("pointercancel", endDrag);

  // --------- 亂碼過渡（scramble）---------
  function scrambleTo(el, finalText, duration = 620) {
    const chars = "!@#$%^&*()_+-=[]{};:,.<>?/|~";
    const start = performance.now();
    const from = el.textContent;

    // 保留換行（用 \n 轉 <br>）
    const isHTML = el.tagName.toLowerCase() === "p";
    const final = finalText;

    function frame(t) {
      const p = Math.min(1, (t - start) / duration);
      const outLen = Math.max(from.length, final.length);

      let out = "";
      for (let i = 0; i < outLen; i++) {
        const reveal = p * outLen;
        if (i < reveal) {
          out += final[i] ?? "";
        } else {
          out += chars[Math.floor(Math.random() * chars.length)];
        }
      }

      if (isHTML) {
        el.innerHTML = out.replace(/\n/g, "<br>");
      } else {
        el.textContent = out;
      }

      if (p < 1) requestAnimationFrame(frame);
      else {
        if (isHTML) el.innerHTML = final.replace(/\n/g, "<br>");
        else el.textContent = final;
      }
    }
    requestAnimationFrame(frame);
  }

  // --------- 開啟作品（放大移左 + logo 滑出 + 右側亂碼變資訊）---------
  function openWork(work, cardEl) {
    if (page.classList.contains("is-detail")) return;

    page.classList.add("is-detail");

    // Focus 圖：複製 img / 或用純灰底
    focus.innerHTML = "";
    const wrap = document.createElement("div");
    wrap.className = "focus-img";

    const imgInCard = cardEl.querySelector("img");
    if (imgInCard) {
      const img = document.createElement("img");
      img.src = imgInCard.currentSrc || imgInCard.src;
      img.alt = `work ${work.id}`;
      wrap.appendChild(img);
    }

    focus.appendChild(wrap);

    // 右側文字 scramble → 作品資訊
    scrambleTo(infoTitle, work.title, 520);
    scrambleTo(infoBody, work.body, 780);
    scrambleTo(infoMeta, work.meta, 620);
    scrambleTo(infoContact, work.contact, 620);
  }

  // --------- 回到首頁 ----------
  function closeWork() {
    if (!page.classList.contains("is-detail")) return;

    page.classList.remove("is-detail");
    focus.innerHTML = "";

    // scramble 回首頁文案
    scrambleTo(infoTitle, "liminalsynths", 520);
    scrambleTo(
      infoBody,
      "signifies a synthesis in transition.\nwhere liminal states meet synths of\nform and thought.\nIt captures the generative tension\nbetween concepts and mediums,\nmanifesting in works that explore\nthresholds and hybridities.",
      780
    );
    scrambleTo(infoMeta, "by zhiqiangchin", 620);
    scrambleTo(infoContact, "liminalsynths@gmail.com\n@liminalsynths", 620);
  }

  backBtn.addEventListener("click", closeWork);

  buildCards();
})();
