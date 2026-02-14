const chars = "!<>-_\\/[]{}—=+*^?#________";

// 文字亂碼函式
function scrambleTo(element, finalText, duration = 800) {
  let frame = 0;
  const originalText = element.innerText;
  const start = performance.now();
  
  function update(now) {
    const elapsed = now - start;
    const progress = Math.min(elapsed / duration, 1);
    
    // 亂碼邏輯：越接近結束，正確的字越多
    const result = finalText.split('').map((char, i) => {
      if (progress > (i / finalText.length) || progress > 0.8) {
        return char;
      }
      return chars[Math.floor(Math.random() * chars.length)];
    }).join('');

    element.innerText = result;

    if (progress < 1) {
      requestAnimationFrame(update);
    }
  }
  requestAnimationFrame(update);
}

// 監聽點擊
stack.addEventListener("click", (e) => {
  const card = e.target.closest(".card");
  if (!card) return;

  const workId = card.dataset.id;
  const work = WORKS.find(w => w.id === workId);
  
  // 執行 FLIP 動畫
  openDetail(card, work);
});

function openDetail(cardEl, work) {
  page.classList.add("is-detail");

  // 1. 建立一個暫時的動畫層（大圖）
  const rect = cardEl.getBoundingClientRect();
  const focusBox = document.createElement("div");
  focusBox.className = "focus-box";
  focusBox.id = "activeFocus";
  
  // 複製一張圖片放進去
  const img = document.createElement("img");
  img.src = work.img;
  focusBox.appendChild(img);
  document.body.appendChild(focusBox);

  // 2. 計算位置偏移（從卡片原本位置到左側目標位置）
  const targetX = 56; // 對應 CSS 的 --pad
  const targetY = window.innerHeight * 0.18; // 對應 CSS 的 18vh
  
  focusBox.animate([
    { 
      top: rect.top + 'px', 
      left: rect.left + 'px', 
      width: rect.width + 'px' 
    },
    { 
      top: targetY + 'px', 
      left: targetX + 'px', 
      width: '45vw' 
    }
  ], {
    duration: 600,
    easing: "cubic-bezier(0.2, 0.9, 0.2, 1)",
    fill: "forwards"
  });

  // 3. 右側文字亂碼變換
  scrambleTo(infoTitle, work.title);
  scrambleTo(infoBody, work.body);
  scrambleTo(infoMeta, work.meta);
}

// 返回首頁
backBtn.addEventListener("click", () => {
  const activeFocus = document.getElementById("activeFocus");
  if (activeFocus) activeFocus.remove();
  
  page.classList.remove("is-detail");
  
  // 恢復首頁文字
  scrambleTo(infoTitle, "liminalsynths");
  scrambleTo(infoBody, "signifies a synthesis in transition...");
});
