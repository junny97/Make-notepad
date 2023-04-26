const addNoteBtn = document.querySelector(".add-note-btn");
const memoContainer = document.querySelector(".memo-container");
let data = JSON.parse(localStorage.getItem("data")) || [];

//m1 new
//메모 색 설정 랜덤함수
function getRandomColor() {
  const colors = ["#FFBB3F", "#F6D55C", "#F5AB99", "#FEB47B"];
  return colors[Math.floor(Math.random() * colors.length)];
}

//메모 생성함수
function createMemo(memoTextContent) {
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

  let memoTextarea = memo.querySelector("textarea");
  const bgColor = getRandomColor();
  memo.style.backgroundColor = bgColor;
  memoTextarea.style.backgroundColor = bgColor;
  
  //메모 저장 함수
  function saveMemo() {
    const memoTextContent = memoTextarea.value.trim();
    if (memoTextContent) {
      data.push(memoTextContent);
      localStorage.setItem("data", JSON.stringify(data));
      alert("메모가 성공적으로 저장되었습니다!");
      submitBtn.textContent = "수정하기";
      submitBtn.classList.replace("submit-btn", "modify-btn");
    } else {
      alert("메모를 작성해주세요!");
    }
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

  const deleteBtn = memo.querySelector(".delete-btn");
  deleteBtn.addEventListener("click", deleteMemo);

  const collapseBtn = memo.querySelector(".collapse-btn");
  collapseBtn.addEventListener("click", () => {
    if (!memo.classList.contains("pinned")) {
      memo.classList.toggle("collapsed");
    }
  });

  const pinBtn = memo.querySelector(".pin-btn");
  pinBtn.addEventListener("click", () => {
    memo.classList.toggle("pinned");
    if (memo.classList.contains("pinned")) {
      alert("메모가 고정되었습니다!");
    } else {
      alert("메모 고정이 해제되었습니다!");
    }
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
