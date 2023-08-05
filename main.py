from typing import Union

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

# static 폴더 생성해서 html,css,javascript 파일 전부 이동
app.mount("/", StaticFiles(directory="static",html=True), name="static")

