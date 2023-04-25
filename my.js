const addNoteBtn = document.querySelector(".add-note-btn");
const memoContainer = document.querySelector(".memo-container");

let data = JSON.parse(localStorage.getItem("data")) || [];

function createMemo(memoTextContent) {
  const fragment = new DocumentFragment();

  const memo = document.createElement("div");
  memo.className = "memo";
  memo.innerHTML = `
    <textarea class="memo-textContent">${memoTextContent}</textarea>
    <div class="add-remove-Btn"> 
      <button class="submit-btn" type="button">작성완료</button>
      <button class="modify-btn" type="button">수정하기</button>
      <button class="delete-btn" type="button">삭제하기</button>
    </div>
    <div class="pin-collapse-Btn"> 
      <button class="pin-btn" type="button">&#128204;</button>
      <button class="collapse-btn" type="button">&#8595;</button>
    </div>
  `;

  fragment.appendChild(memo);
  memoContainer.appendChild(fragment);
  memoContainer.classList.add("memo-container-change");


  const memoTextarea = memo.querySelector("textarea");
  
   //메모 저장 함수
  function saveMemo() {
    const memoTextContent = memoTextarea.value.trim();
    if (memoTextContent) {
      data.push(memoTextContent);
      localStorage.setItem("data", JSON.stringify(data));
      alert("메모가 성공적으로 저장되었습니다!");
    } else {
      alert("메모를 작성해주세요!");
    }
  }

  //메모 수정함수
  function modifyMemo() {
   

  }

//메모 삭제 함수
  function deleteMemo() {
    const confirmed = confirm("정말 메모를 삭제하시겠습니까?");
    if (confirmed) {
      memo.remove();
      const memoTextContent = memoTextarea.value.trim();
      const index = data.indexOf(memoTextContent);
      if (index !== -1) {
        data.splice(index, 1);
        localStorage.setItem("data", JSON.stringify(data));
      }
    }
  }

  const submitBtn = memo.querySelector(".submit-btn");
  submitBtn.addEventListener("click", saveMemo);

  const modifyBtn = memo.querySelector(".modify-btn");
  modifyBtn.addEventListener("click", modifyMemo);

  const deleteBtn = memo.querySelector(".delete-btn");
  deleteBtn.addEventListener("click", deleteMemo);

  const collapseBtn = memo.querySelector(".collapse-btn");
  collapseBtn.addEventListener("click", () => {
    memo.classList.toggle("collapsed");
  });
}

function renderMemos() {
  data.forEach((memoTextContent) => {
    createMemo(memoTextContent);
  });
}

renderMemos();

addNoteBtn.addEventListener("click", () => {
  createMemo("");
});
