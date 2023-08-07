//수정 함수
async function editMemo(event) {
  //이벤트가 눌렸는 지 확인하는 속성
  //event.target
  //event.target.dataset.id : 이벤트가 눌렸을 때, data-id도 가져오는지 확인
  console.log(event.target.dataset.id);
  const id = event.target.dataset.id;
  //alert처럼 웹브라우저에서 수정할 값을 받을 수 있음
  const editInput = prompt("수정할 값을 입력하세요");
  console.log(editInput);
  const res = await fetch(`/memos/${id}`, {
    //PUT메서드: 특정값이 있을 때 이 값으로 바꾸는 메서드
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      id,
      content: editInput,
    }),
  });
  readMemo();
}

//삭제 함수
async function deleteMemo(event) {
  const id = event.target.dataset.id;
  const res = await fetch(`/memos/${id}`, {
    method: "DELETE",
  });
  readMemo();
}

function displayMemo(memo) {
  const ul = document.querySelector("#memo-ul");
  const li = document.createElement("li");
  li.innerHTML = `[id:${memo.id}] ${memo.content}`;

  //수정버튼
  const editBtn = document.createElement("button");

  editBtn.innerText = "수정하기";
  editBtn.addEventListener("click", editMemo);
  //dataset이라는 속성에 id값에 메모의 id를 넣어준다
  //즉, 메모 1개당의 data-id 값을 처리해주는 것
  editBtn.dataset.id = memo.id;

  //삭제버튼
  const delBtn = document.createElement("button");

  delBtn.innerText = "삭제하기";
  delBtn.addEventListener("click", deleteMemo);
  delBtn.dataset.id = memo.id;

  ul.appendChild(li);
  li.appendChild(editBtn);
  li.appendChild(delBtn);
}

async function readMemo() {
  //get요청
  const res = await fetch("/memos");
  const jsonRes = await res.json();
  console.log("read", jsonRes);
  //jsonRes 는 배열로 오는데 배열에서 하나만 memo로 전달
  //["a","b"].foreach(func): 각각의 요소에 대하여 함수가 각각 실행 총 3번실행
  const ul = document.querySelector("#memo-ul");
  ul.innerHTML = "";
  jsonRes.forEach(displayMemo);
}

async function createMemo(value) {
  // post요청
  const res = await fetch("/memos", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      id: new Date().getTime(),
      content: value,
    }),
  });
  //const jsonRes = await res.json();
  //console.log(jsonRes);
  //   console.log("값은!", value);
  readMemo();
}

function handleSubmit(event) {
  event.preventDefault();
  const input = document.querySelector("#memo-input");
  console.log("input_Value", input.value);
  createMemo(input.value);

  input.value = "";
}

readMemo();
const form = document.querySelector("#memo-form");
form.addEventListener("submit", handleSubmit);
