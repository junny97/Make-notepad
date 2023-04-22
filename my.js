const addNoteBtn = document.querySelector(".add-note-btn");
const memoContainer = document.querySelector(".memo-container");


// "data"라는 key를 가진 값이 있으면 그 값을 JSON.parse를 통해 배열 형태로 파싱하여 data 변수에 할당하고, 값이 없는 경우 빈 배열을 할당합니다.
// let data = JSON.parse(localStorage.getItem("data")) || [];
 // 메모 데이터를 저장할 배열
 let data = [];
 if(localStorage.getItem("data")){
    data = JSON.parse(localStorage.getItem("data"));
 }


addNoteBtn.addEventListener("click", () => {
  const memo = document.createElement("div");
  memo.className = "memo";
  memo.innerHTML = `
    <textarea class="memo-textContent"></textarea>
    <div class="add-remove-Btn"> 
      <button class="submit-btn" type="submit">작성완료</button>
      <button class="delete-btn" type="button">삭제하기</button>
    </div>
    <div class="pin-collapse-Btn"> 
      <button class="pin-btn" type="button">&#128204;</button>
      <button class="collapse-btn" type="button">&#8595;</button>
    </div>
  `;

  memoContainer.appendChild(memo);
  memoContainer.classList.add("memo-container-change");

  memoContainer.style.display = "grid";
  memoContainer.style.gridAutoRows = "max-content";
  memoContainer.style.gridTemplateColumns = "repeat(auto-fill, minmax(300px, 1fr))";

  const memoTextarea = memo.querySelector("textarea");
  // memoTextarea.focus();

  const pinBtn = memo.querySelector(".pin-btn");
  pinBtn.addEventListener("click", () => {
    memo.classList.toggle("pin");
  });

  const submitBtn = memo.querySelector(".submit-btn");
  submitBtn.addEventListener("click", () => {
    const memoTextContent = memoTextarea.value.trim();
    if (memoTextContent) {
      data.push(memoTextContent);
      localStorage.setItem("data", JSON.stringify(data));
    //   memoTextarea.value = "";
    }
  });

  const deleteBtn = memo.querySelector(".delete-btn");
  deleteBtn.addEventListener("click", () => {
    const confirmed = confirm("정말 메모를 삭제하시겠습니까?");
    if (confirmed) {
      memo.remove();
      localStorage.removeItem("data");
    }
  });

  const collapseBtn = memo.querySelector(".collapse-btn");
  collapseBtn.addEventListener("click", () => {
    memo.classList.toggle("collapsed");
  });

});

// 삭제버튼을 누르면 로컬 스토리지에 저장된 텍스트 값들이 삭제되게 해줘