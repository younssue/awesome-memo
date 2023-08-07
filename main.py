

from fastapi import FastAPI
# post 로 보내게 될 변수들의 형식을 지정
from pydantic import BaseModel
# html,css,javascript 등 정적 파일을 주입시키는 방법
from fastapi.staticfiles import StaticFiles

class Memo(BaseModel):
    id: int
    content:str
    
memos=[]

app = FastAPI()

@app.post("/memos")
def create_memo(memo:Memo):
    memos.append(memo)
    return '메모 추가에 성공했습니다'   

@app.get("/memos")
def read_memo():
    return memos 

# 수정
@app.put("/memos/{memo_id}")
def put_memo(req_memo:Memo):
    for memo in memos:
        if memo.id == req_memo.id:
            memo.content =req_memo.content
            return '수정 성공'
    return '그런 메모는 없습니다'

# 삭제
@app.delete("/memos/{memo_id}")
# meno_id만 적을때는 memo_id가 int라는 것을 설명해줘야지 삭제가 실행됨
# delete_memo 함수에서 memo_id를 문자열로 전달 받고, 이를 비교할 때 memo.id를 정수로 비교하려고 하면 오류가 발생할 것
def delete_memo(memo_id:int):
    # enumerate: 배열에서 index와 값을 같이 뽑아내주는 함수
    for index,memo in enumerate(memos):
        if memo.id == memo_id:
            # pop:없앤다
            memos.pop(index)
            return '성공했습니다'
    return '그런 메모는 없습니다'


# static 폴더 생성해서 html,css,javascript 파일 전부 이동
app.mount("/", StaticFiles(directory="static",html=True), name="static")

