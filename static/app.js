function displayMemo(memo) {
  const ul = document.querySelector("#memo-ul");
  const li = document.createElement("li");
  li.innerHTML = `[id:${memo.id}] ${memo.content}`;
  ul.appendChild(li);
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
