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

  const memoTextarea = memo.querySelector("textarea");
  // memoTextarea.focus();

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

  //메모 삭제 버튼 메모 자체와 data 둘 다 삭제
  const deleteBtn = memo.querySelector(".delete-btn");
  deleteBtn.addEventListener("click", () => {
    const confirmed = confirm("정말 메모를 삭제하시겠습니까?");
    if (confirmed) {
      memo.remove(); //메모 삭제
      const memoTextContent = memoTextarea.value.trim(); 
      const index = data.indexOf(memoTextContent);  //indexOf로 data 내에 값을 확인하고  index 매개변수에 저장 
      if (index !== -1) { // -1이 아니라면 => 해당 내용이 아직 배열안에 존재 한다는 뜻
        data.splice(index, 1); // index가 위치한값부터 1개의 값을 삭제 
        localStorage.setItem("data", JSON.stringify(data)); //삭제된 값이 로컬스토리지에도 적용되게 설정, 새로고침 후에도 삭제된 상태가 유지되게 수정 완료
    }
  }
  });

  const collapseBtn = memo.querySelector(".collapse-btn");
  collapseBtn.addEventListener("click", () => {
    //memo박스의 클래스 속성값에 toggle을 줘 collapsed가 없으면 넣어주고 있으면 제거합니다
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
