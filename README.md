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
  - 대략적인 스타일, hover시 Delete, Select 버튼 표시 구현
  ![summary_hover_ctrl](https://user-images.githubusercontent.com/92776202/138233828-6fbc5c2d-6824-467f-8631-7180678ef893.png)

  - DeleteNote 구현
    - 해당 노트만 삭제하는 기능 구현
    - 일괄 삭제는 함수만 만들었으며, 아직 버튼에 달아 시험 X
  - Select Note On/OFF 구현 (일괄 삭제 기능을 위한 Selection)
    - 선택 체크 박스 활성화 및 outline 생성 표시 구현
    - **선택된 상태에서 노트 삭제시 선택노트 배열에서 해당 노트도 해제 반영**
    ![summary_select](https://user-images.githubusercontent.com/92776202/138233874-ddd14bb1-e9c1-4d4e-89a8-c487b4893f46.png)

- header fixed 반영 작업
  - flex, fixed를 같이 쓰는 경우 문제가 발생하므로 한번더 다른 요소로 감싸서 외부 fixed, 내부 flex 사용
