document.addEventListener("DOMContentLoaded", function () {
  const grid = document.getElementById("grid");
  const modal = document.getElementById("modal");
  const inputBox = document.getElementById("inputBox");
  const confirmButton = document.getElementById("confirmButton");
  const clearDataButton = document.getElementById("clearDataButton");
  const clearContentButton = document.getElementById("clearContentButton");

  let savedData = JSON.parse(localStorage.getItem("quitReasons")) || Array(100).fill("");
  let selectedCell = null;

  // 初始化格子
  savedData.forEach((text, index) => {
    const cell = document.createElement("div");
    cell.classList.add("cell");
    if (text) {
      cell.classList.add("filled");
      addDayCompletionAnimation(cell, index + 1);
    }
    cell.setAttribute("data-index", index);

    cell.addEventListener("click", () => {
      selectedCell = cell;
      inputBox.value = text;
      modal.style.display = "flex";
    });

    grid.appendChild(cell);
  });

  confirmButton.addEventListener("click", () => {
    const index = selectedCell.getAttribute("data-index");
    const newText = inputBox.value;

    savedData[index] = newText;
    if (newText) {
      selectedCell.classList.add("filled");
      addDayCompletionAnimation(selectedCell, index + 1);
    } else {
      selectedCell.classList.remove("filled");
    }

    localStorage.setItem("quitReasons", JSON.stringify(savedData));
    modal.style.display = "none";
    inputBox.value = "";
  });

  clearDataButton.addEventListener("click", () => {
    // 彈出確認對話框
    const confirmClear = confirm("您確定要清除所有資料嗎？這將無法恢復！");
    if (confirmClear) {
      savedData = Array(100).fill("");
      localStorage.setItem("quitReasons", JSON.stringify(savedData));
      document.querySelectorAll(".cell").forEach(cell => {
        cell.classList.remove("filled");
        cell.classList.remove("completed-animation");
      });
      alert("所有資料已清除！");
    }
  });

  clearContentButton.addEventListener("click", () => {
    const index = selectedCell.getAttribute("data-index");
    savedData[index] = "";  // 清除當前格子的內容
    selectedCell.classList.remove("filled");
    selectedCell.classList.remove("completed-animation");
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
