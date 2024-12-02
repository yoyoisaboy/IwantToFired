document.addEventListener("DOMContentLoaded", function () {
  const grid = document.getElementById("grid");
  const modal = document.getElementById("modal");
  const inputBox = document.getElementById("inputBox");
  const confirmButton = document.getElementById("confirmButton");
  const clearDataButton = document.getElementById("clearDataButton");
  const clearContentButton = document.getElementById("clearContentButton");

  // 初始化格子資料
  let savedData = JSON.parse(localStorage.getItem("quitReasons")) || Array(100).fill({ text: "", image: "" });

  let selectedCell = null;

  // 隨機選取天竺鼠圖片
  const guineaPigImages = [
    "img/guinea1.jpg",
    "img/guinea2.jpg",
    "img/guinea3.jpg",
    "img/guinea4.jpg",
    "img/guinea5.jpg",
    "img/guinea6.jpg",
    "img/guinea7.jpg"
  ];

  function getRandomImage() {
    const randomIndex = Math.floor(Math.random() * guineaPigImages.length);
    return guineaPigImages[randomIndex];
  }

  // 初始化格子
  savedData.forEach((data, index) => {
    const cell = document.createElement("div");
    cell.classList.add("cell");

    if (data.text) {
      cell.classList.add("filled");
      addDayCompletionAnimation(cell, index + 1);

      // 設定背景圖片
      if (data.image) {
        cell.style.backgroundImage = `url('${data.image}')`;
        cell.style.backgroundSize = "cover";
        cell.style.backgroundPosition = "center";
        cell.style.backgroundRepeat = "no-repeat";
      }
    }

    cell.setAttribute("data-index", index);

    cell.addEventListener("click", () => {
      selectedCell = cell;
      inputBox.value = data.text || ''; // 確保不是 undefined，若沒有文字顯示空字串
      modal.style.display = "flex";
    });

    grid.appendChild(cell);
  });

  // 點擊確認後，更新格子的資料並儲存
  confirmButton.addEventListener("click", () => {
    const index = selectedCell.getAttribute("data-index");
    const newText = inputBox.value;

    // 隨機選取圖片
    const randomImage = getRandomImage();

    // 更新格子的資料
    savedData[index] = { text: newText || "", image: newText ? randomImage : "" };

    if (newText) {
      selectedCell.classList.add("filled");
      addDayCompletionAnimation(selectedCell, index + 1);

      // 設定格子的背景圖片
      selectedCell.style.backgroundImage = `url('${randomImage}')`;
      selectedCell.style.backgroundSize = "cover";
      selectedCell.style.backgroundPosition = "center";
      selectedCell.style.backgroundRepeat = "no-repeat";
    } else {
      selectedCell.classList.remove("filled");
      selectedCell.style.backgroundImage = ""; // 清空背景圖片
    }

    // 儲存資料到 localStorage
    localStorage.setItem("quitReasons", JSON.stringify(savedData));

    // 關閉彈出視窗
    modal.style.display = "none";
    inputBox.value = "";  // 清空輸入框
  });

  // 清除所有資料
  clearDataButton.addEventListener("click", () => {
    const confirmClear = confirm("您確定要清除所有資料嗎？這將無法恢復！");
    if (confirmClear) {
      savedData = Array(100).fill({ text: "", image: "" });
      localStorage.setItem("quitReasons", JSON.stringify(savedData));
      document.querySelectorAll(".cell").forEach(cell => {
        cell.classList.remove("filled");
        cell.classList.remove("completed-animation");
        cell.style.backgroundImage = ""; // 清空圖片
      });
      alert("所有資料已清除！");
    }
  });

  // 清除選取格子的內容
  clearContentButton.addEventListener("click", () => {
    const index = selectedCell.getAttribute("data-index");
    savedData[index] = { text: "", image: "" };  // 清空格子的內容
    selectedCell.classList.remove("filled");
    selectedCell.classList.remove("completed-animation");
    selectedCell.style.backgroundImage = "";  // 清空背景圖片
    localStorage.setItem("quitReasons", JSON.stringify(savedData));
    inputBox.value = "";  // 清空輸入框
    modal.style.display = "none";  // 關閉彈出視窗
  });

  window.addEventListener("click", (event) => {
    if (event.target === modal) {
      modal.style.display = "none";
      inputBox.value = "";
    }
  });

  function addDayCompletionAnimation(cell, day) {
    if (day % 10 === 0) {
      // 每 10, 20, 30...天添加動畫
      cell.classList.add("completed-animation");
    }
  }
});
