// スプレッドシートの「ウェブに公開」で取得したURLを入れる
const spreadSheetUrl = "https://docs.google.com/spreadsheets/d/e/2PACX-1vQJDfuNjcLeSf3DX101WXzIY2QGlieuZQhJ2YdY6d8-QZjWeB78GUSbXxAHxw2AH6KGfZHENB8Tx66s/pub?gid=0&single=true&output=csv";

async function loadFAQ() {
    try {
        const response = await fetch(spreadSheetUrl);
        const data = await response.text();

        const rows = data.split('\n').slice(1);
        const container = document.getElementById('faq-container');

        // 中身を一度空にする
        container.innerHTML = "";

        rows.forEach(row => {
            // カンマ区切りのデータを分解
            const columns = row.split(',');
            if (columns.length >= 2) {
                const question = columns[0].replace(/"/g, "");
                const answer = columns[1].replace(/"/g, "");

                const faqItem = `
                    <div class="faq-item">
                        <div class="faq-q">${question}</div>
                        <div class="faq-a">${answer}</div>
                    </div>
                `;
                container.innerHTML += faqItem;
            }
        });
    } catch (error) {
        console.error("データの読み込みに失敗しました", error);
    }
}

// ページが読み込まれたら実行
window.addEventListener('DOMContentLoaded', loadFAQ);

// TOPへ戻るボタンの制御
const pageTop = document.getElementById('page-top');

window.addEventListener('scroll', () => {
    // 300px以上スクロールしたらボタンを表示
    if (window.scrollY > 300) {
        pageTop.classList.add('is-show');
    } else {
        pageTop.classList.remove('is-show');
    }
});

// スムーズに上に戻る（最新のブラウザはこれだけでOK）
pageTop.addEventListener('click', (e) => {
    e.preventDefault(); // 本来のリンク動作を無効化
    window.scrollTo({
        top: 0,
        behavior: 'smooth' // スルスルと戻るアニメーション
    });
});

function startDesignScroll() {
  const grid = document.getElementById("designGrid");
  if (!grid) {
    console.warn("designGrid が見つかりません");
    return;
  }

  // 二重複製防止
  if (!grid.dataset.cloned) {
    grid.insertAdjacentHTML("beforeend", grid.innerHTML);
    grid.dataset.cloned = "1";
  }

  let x = 0;
  const speed = 0.6;

  const step = () => {
    x += speed;
    const half = grid.scrollWidth / 2;
    if (half > 0 && x >= half) x = 0;

    grid.style.transform = `translate3d(${-x}px, 0, 0)`;
    requestAnimationFrame(step);
  };

  requestAnimationFrame(step);
}

// DOMContentLoaded を取りこぼしても動くようにする
if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", startDesignScroll);
} else {
  startDesignScroll();
}


