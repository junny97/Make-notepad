const addNoteBtn = document.querySelector(".add-note-btn");
const memoContainer = document.querySelector(".memo-container");

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
    memoTextarea.focus();

    const pinBtn = memo.querySelector(".pin-btn");
    pinBtn.addEventListener("click", () => {
        memo.classList.toggle("pin");
    });

    const submitBtn = memo.querySelector(".submit-btn");
    submitBtn.addEventListener("click", () => {
        const memoTextContent = memoTextarea.value.trim();
        if (memoTextContent) {
            memoTextarea.value = "";
        }
    });

    const deleteBtn = memo.querySelector(".delete-btn");
    deleteBtn.addEventListener("click", () => {
        const confirmed = confirm("정말 메모를 삭제하시겠습니까?");
        if (confirmed) {
            memo.remove();
        }
    });

    const collapseBtn = memo.querySelector(".collapse-btn");
    collapseBtn.addEventListener("click", () => {
        memo.classList.toggle("collapsed");
    });
});
