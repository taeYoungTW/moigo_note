# ✨ 모이고 노트 클론 프로젝트

## 📆 2021.10.18

- 모이고 노트 창 기능 분석

<br/>

## 📆 2021.10.19

- 개발 컴퓨터 환경 설정
  - vscode 설치 및 익스텐션 설정, nodejs(nvm), Git, Github
- 기본 프로젝트 환경 설정
  - CRA, SCSS, Nomalize CSS, 디렉토리 구조

<br/>

## 📆 2021.10.20

- Material UI Icons 사용을 위한 MUI 설정
- Header 컴포넌트 구성 (기능X, 스타일O)
- CreateNote, CreateNoteForm 컴포넌트 구성 (기능X, 스타일O)
  - CreateNote에서 클릭시 CreateNoteForm으로 변경 구현
    ![createNote](https://user-images.githubusercontent.com/92776202/138233669-cd567881-e7e9-4d0f-b469-3f58a6d9812f.png)

<br/>

## 📆 2021.10.21

- **Context API 도입**
  - 복잡한 상태를 막기위해 Context API에 맞는 디렉구조 개편
  - redux와 같이 단일 스토어 구성으로 1개의 AppStateContext만 운영
  - Hooks로 특징에 따라 Actions, States를 관리
  - 사용시 useAppState, useAppAction으로 나누어 컴포넌트 내에서 Action과 State를 잘 찾을 수 있도록 사용
- **CreateNoteForm 기능 구현** (제목만 받아서 uuid의 id와 함께 노트를 생성)
  - Create Note Submit
  - Sumbit 완료시 CreateNote로 다시 표시 구현
- ReadAllNotes 컴포넌트에 SummaryNote 연결 -> Read 구현
  ![readAllNotes](https://user-images.githubusercontent.com/92776202/138233771-b2a42597-2fe1-41ef-aab0-01f4b3e94185.png)

- **SummaryNote 컴포넌트 구성**

  - [x] 대략적인 스타일, hover시 Delete, Select 버튼 표시 구현
        ![summary_hover_ctrl](https://user-images.githubusercontent.com/92776202/138233828-6fbc5c2d-6824-467f-8631-7180678ef893.png)

  - [x] DeleteNote 구현
    - 해당 노트만 삭제하는 기능 구현
    - 일괄 삭제는 함수만 만들었으며, 아직 버튼에 달아 시험 X
  - [x] Select Note On/OFF 구현 (일괄 삭제 기능을 위한 Selection)
    - 선택 체크 박스 활성화 및 outline 생성 표시 구현
    - **선택된 상태에서 노트 삭제시 선택노트 배열에서 해당 노트도 해제 반영**
      ![summary_select](https://user-images.githubusercontent.com/92776202/138233874-ddd14bb1-e9c1-4d4e-89a8-c487b4893f46.png)

- header fixed 반영 작업
  - flex, fixed를 같이 쓰는 경우 문제가 발생하므로 한번더 다른 요소로 감싸서 외부 fixed, 내부 flex 사용

<br/>

## 📆 2021.10.22

SummaryNote 선택에 따른 선택된 노트들을 제어하는 헤더를 구성, 스타일링 하고 선택취소와 선택된 노트 삭제 기능 구현

- **NotesHeader (선택된 노트 일괄 삭제 기능 완료)**
  - [x] NotesHeader 컴포넌트 구성 및 스타일 작업
  - [x] NotesHeader에 선택된 노트 개수 표시 작업
  - [x] 선택된 노트들 일괄 삭제 기능 작업
  - [x] 선택된 노트들 일괄 선택 취소 기능 작업
    - 선택 취소시, 헤더 변경과 선택되어 표시된 outline, select Off btn을 없애 Update 시켜주는 작업
- **DetailNote**
  - [x] DetailNote 컴포넌트 구성 및 스타일 작업 (모달 형식)
  - [x] SummaryNote 클릭시 DetailNote 보이기 (SummaryNote hover시 버튼과 배경 z-index 조정)
  - [x] DetailNote 안보기, 노트 삭제 구현
- **main 영역 클릭시 CreateNoteForm -> CreateNote 표시 상태 변경 구현**
  - Main에 이벤트를 걸어 내부 이벤트 버블링으로 구현
  - 이벤트 버블링으로 구현했기에, 내부적으로 다른 요소는 StopPropagation, onClickCapture 형태로 제어 구현
- **UpdateNote**
  - DetailNote에서 수정 클릭시 UpdateNote로 표현되게 구현
  - UpdateNote 컴포넌트 구성 및 스타일 작업
  - 일단, title input만 수정 구현
  - allNote 중에서 수정된 항목이 제일 앞에 위치 하게 구현
- **SummaryNote Custom Scrollbar 구현**
  - 제목이 자동으로 멀티라인 가질 수있도록 pre-wrap, break-all 설정

<br/>

다음에 할 것

- Delete Confirm
- 선택되었을 경우, onDetailNote 불가하게 하기
