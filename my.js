const addNoteBtn = document.querySelector(".add-note-btn");
const memoContainer = document.querySelector(".memo-container");

let data = JSON.parse(localStorage.getItem("data")) || [];


// 포스트잇 메모지 생성 함수 분리
function createMemo(memoTextContent) {

  //fragment를 사용하면 여러 번 DOM에 추가되는 것이 아니라 한 번에 추가가 가능하다
  const fragment = new DocumentFragment();

  const memo = document.createElement("div");
  memo.className = "memo";
  memo.innerHTML = `
    <textarea class="memo-textContent">${memoTextContent}</textarea>
    <div class="add-remove-Btn"> 
      <button class="submit-btn" type="button">작성완료</button>
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
  // memoContainer.appendChild(memo);
  memoContainer.style.display = "grid";
  memoContainer.style.gridAutoRows = "max-content";
  memoContainer.style.gridTemplateColumns = "repeat(auto-fill, minmax(300px, 1fr))";

  const memoTextarea = memo.querySelector("textarea");
  // memoTextarea.focus();

  // const pinBtn = memo.querySelector(".pin-btn");
  // pinBtn.addEventListener("click", () => {
  //   memo.classList.toggle("pin");
  // });

  const submitBtn = memo.querySelector(".submit-btn");
  submitBtn.addEventListener("click", () => {
    const memoTextContent = memoTextarea.value.trim();
    if (memoTextContent) {
      data.push(memoTextContent);
      localStorage.setItem("data", JSON.stringify(data));
      alert("메모가 성공적으로 저장되었습니다!");
    } else {
      alert("메모를 작성해주세요!");
     
    }
  });

  const deleteBtn = memo.querySelector(".delete-btn");
  deleteBtn.addEventListener("click", () => {
    const confirmed = confirm("정말 메모를 삭제하시겠습니까?");
    if (confirmed) {
      memo.remove();
      const memoTextContent = memoTextarea.value.trim();
      const index = data.indexOf(memoTextContent);
      if (index!== -1) {
        data.splice(index, 1);
        localStorage.setItem("data", JSON.stringify(data));
      }
    }
  });


  const collapseBtn = memo.querySelector(".collapse-btn");
  collapseBtn.addEventListener("click", () => {
    memo.classList.toggle("collapsed");
  });
}

// 저장된 메모 데이터를 이용해서 초기화면에 렌더링하는 함수 
function renderMemos() {
  data.forEach((memoTextContent) => {
    createMemo(memoTextContent);
  });
}

// 초기화면 렌더링
renderMemos();


addNoteBtn.addEventListener("click", () => {
  createMemo("");
});


