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
      ![select_header](https://user-images.githubusercontent.com/92776202/138415218-26192f53-06a3-449a-818c-4883aca3214b.png)

- **DetailNote**

  - [x] DetailNote 컴포넌트 구성 및 스타일 작업 (모달 형식)
  - [x] SummaryNote 클릭시 DetailNote 보이기 (SummaryNote hover시 버튼과 배경 z-index 조정)
  - [x] DetailNote 안보기, 노트 삭제 구현
        ![detailNote](https://user-images.githubusercontent.com/92776202/138415257-0572cc8f-143d-46af-8b8b-01d9c209aa5e.png)

- **main 영역 클릭시 CreateNoteForm -> CreateNote 표시 상태 변경 구현**
  - Main에 이벤트를 걸어 내부 이벤트 버블링으로 구현
  - 이벤트 버블링으로 구현했기에, 내부적으로 다른 요소는 StopPropagation, onClickCapture 형태로 제어 구현
- **UpdateNote**

  - DetailNote에서 수정 클릭시 UpdateNote로 표현되게 구현
  - UpdateNote 컴포넌트 구성 및 스타일 작업
  - 일단, title input만 수정 구현
  - allNote 중에서 수정된 항목이 제일 앞에 위치 하게 구현
    ![updateNote](https://user-images.githubusercontent.com/92776202/138415290-959035a6-d73b-4c2d-b8cb-2ff634811574.png)

- **SummaryNote Custom Scrollbar 구현**
  - 제목이 자동으로 멀티라인 가질 수있도록 pre-wrap, break-all 설정
    ![summary_note_scrollbar](https://user-images.githubusercontent.com/92776202/138415331-7932144b-ff6a-4186-ac72-33b6b927cd74.png)

<br/>

## 📆 2021.10.25

- CreateNote 진행시 제일 앞으로 추가하게 변경
- Note가 삭제를 위해 선택되었을 경우, onDetailNote 불가 구현
  - 선택되어 활성화되는 노트의 outline을 z-index 조정으로 구현
- Delete-Note-Confirm 모달 구현

  - Confirm 컴포넌트 구성 및 스타일 구현
  - SummaryNote, DetailNote, NotesHeader 컴포넌트에 삭제 클릭시 모두 confirm component template를 사용하도록 하고 confirm에 대한 질문, 버튼, 특정 기능은 prop으로 연결
  - 모달 스크롤 방지 (overflow-y: hidden)
    ![image](https://user-images.githubusercontent.com/92776202/138784125-7453a91f-41cc-48d7-aa75-f79b6538a766.png)

- Scrollbar 설정

  - body height를 viewport에 맞게 설정하여 scroll이 발생하지 않게 하였으며, main 영역에서만 scroll이 발생하도록 main height를 viewport 사이즈에 맞게 설정하고 overflow scroll로 설정하였습니다.
    ![main_slidebar](https://user-images.githubusercontent.com/92776202/138784328-0f65f8ac-8fc7-4fce-9c56-0208c5cf468d.png)

- Block 만들기
  - Block 어떻게 표시할지 구상
  - CreateTextBlock 컴포넌트 스타일링
    - textarea 줄바꿈에 따른 크기 조정 문제 (커지는것은 해결했으나 줄어들지 않음)
      ![create_text_block](https://user-images.githubusercontent.com/92776202/138784430-1ffb1eeb-1f54-478b-9717-26ec9bf1de14.png)

<br/>

1. 문제의식

- Action 구성에 대한 문제
  : 스토어의 Action에서 연관된 기능까지 구현 하여 묶어야 하는가?
  아니면, 독립성을 위해서 사용되는 컴포넌트 내부에서 함수를 통해서 연관되 기능 끼리의 조합을 해야하는가?
- Global states, actions들이 컴포넌트의 Local states, functions의 식별자 중복 가능성이 있기 때문에 `_`를 붙여 구분하여 사용할지 생각

<br/>

## 📆 2021.10.26

- textarea auto height 문제 해결
  - scrollheight와 sytle의 height를 같게 만들어 줌으로서 해결하였고, 계속해서 갱신시 height를 "" 빈값으로 만들어 늘어나서 돌아오지 않는 scrollheight를 초기화하여 줄수가 줄어드는 경우도 크기가 맞게 만들었습니다.

```js
// useEffect : textarea auto height
useEffect(() => {
	textRef.current.style.height = '';
	textRef.current.style.height = textRef.current.scrollHeight + 'px';
}, [textBlock]);
```

<br/>

- useBlock Hook 생성 (Block과 관련된 state, action을 관리합니다.)
  - createNoteForm에서 blocks state에 block을 추가하여 생성할 blocks를 관리합니다.
  - resetBlocks, addBlock, deleteBlock, updateBlock Action을 구현하였습니다.

<br/>

- 종류별 CreateBlocks 기능 구현

  - Block 공통 사항으로 deleteBlock 기능 구현
  - 블록 추가가 되는 경우 uuid를 통해 id를 받고 아래 형태로 Global State인 blocks에 추가 됩니다.
  - 해당 종류별 컴포넌트에서 각각의 state가지고, global state blocks에 바로 반영 됩니다. (updateBlock Action을 활용)

  ```js
  const textBlockStructure = {
  	id: '', // uuid v4 활용 ex. 23c5e02f-c89a-47d4-886a-3220c96ece8e
  	type: 'text',
  	text: '',
  };

  const checklistBlockStructure = {
  	id: '', // uuid v4 활용 ex. e2e7b1eb-1543-466e-bfd8-301a37860ac9
  	type: 'checklist',
  	isDone: false,
  	content: '',
  };
  ```

- ReadBlocks 구성 및 스타일링 (SummaryNote의 content 영역에서 보여질 컴포넌트)

  - ReadChecklistBlock, ReadTextBlock
  - 최대한, 실제 모이고 노트와 비슷한 스타일링을 구현하려고 하였습니다.
  - **ReadChecklistBlock의 경우 수정이 가능해야 하므로, 이미 완료된 allNotes를 직접 건드려 해당 노트의 해당 블럭의 isDone을 변경하게 구현하였습니다.**

  ```js
  // ~~~~~ Update specific Checklistblock of A Note
  const updateNoteChecklist = useCallback((noteId, targetBlock) => {
  	// allNotes를 직접 수정 합니다.
  	setAllNotes((AllNotes) => {
  		return AllNotes.map((note) => {
  			// AllNotes에서 해당 note를 찾습니다.
  			if (note.id === noteId) {
  				const newBlocks = note.blocks.map((block) => {
  					// 해당 note에서 해당 block을 찾습니다.
  					if (block.id === targetBlock.id) {
  						// 수정된 블록을 반영합니다.
  						return { ...targetBlock };
  					}
  					return { ...block };
  				});
  				return { ...note, blocks: newBlocks };
  			}
  			return { ...note };
  		});
  	});
  }, []);

  // 해당 부분에 있어서 많은 반복문이 필요합니다. note 개수 * block 개수 만큼 비교하기 때문에 개선이 필요합니다. O(n^2)
  ```

  <br/>

- 구현된 SummaryNote
  ![compare_web_real](https://user-images.githubusercontent.com/92776202/138836402-f03ebb0a-d751-4811-a54b-75ae893c41f9.png)

<br/>

## 📆 2021.10.26

- **DetailNote Content 영역 Block 표시 구현**
  - **DetailNote의 Content의 경우, 기존에 Summary에서 사용했던 Read\*\*Block을 재활용 하였습니다.**
  - Read\*\*Block이 SummaryNote, DetailNote 임을 판단하기 위해서 DetailNote일 경우 Read\*\*Block 컴포넌트로 isDetail이라는 Prop을 넣어 판별합니다.
  - 해당 `isDetail` (Prop)을 통해서 className을 조작하여 SummaryNote, DetailNote에서의 Read\*\*Block의 스타일을 구분하여 반영하게 됩니다. DetailNote의 Read\*\*Block의 경우 detail이라는 className이 read_block className과 함께 가지게 됩니다.
- **DetailNote Content 영역의 ChecklistBlock의 수정 기능 구현**
  - 25일에 SummaryNote 영역에서 ChecklistBlock의 isDone state를 변경하기 위해서 updateNoteChecklist를 만들어서 직접적으로 allNote에 수정을 가하였습니다.
  - DetailNote Content 영역의 ChecklistBlock의 경우에는 조금 달라 위와 같은 update 로직을 만들어야 합니다.
  - SummaryNote 영역의 경우 allNote에서 직접적으로 note의 정보들을 불러오지만, DetailNote의 경우 SummaryNote에서 해당 특정 note를 detailNote라는 global state에 저장하여 DetailNote로 전달하여 표시하게 됩니다.
  - **결국, allNote vs detailNote라는 state의 간극이 생기게 됨으로서 기존에 allNote Update 뿐만아니라, detailNote에서 수정이 발생하면 따로 detailNote에도 변경을 가해 반영시켜줘야 합니다.**
    - 이를 위해서 useNote Hook 부분에 updateDetailNoteChecklist Action을 생성하여 활용하였습니다.
- **input label 중복 id에 의한 문제 해결**
  - 기존의 컴포넌트를 재사용해서 사용하게되면, key와 input, label의 id가 다른 곳에서 중복이 되지 않나 확인해야 합니다.
  - 전에는 확인하지 못하여, onClick 발생시 id가 같은 input이 동시에 이벤트를 일으켜서 원하는 요소의 이벤트를 받을수 없게 되었습니다.
  - 이를 위해서, isDetail prop을 통해서 위치한 컴포넌트를 다르게 판단하여 input과 label에 상황에 따라 조금 다른 id 값으로 연결시켜 독립성을 보완하였습니다.
  ```js
  const textComponent = ({ block, isDetail }) => {
  	function onClickCheckbox() {
  		/* Do Something */
  	}
  	return (
  		<div>
  			<label
  				htmlFor={isDetail ? `DetailNote_${block.id}` : block.id}
  				className="checkbox_label"
  			></label>
  			<input
  				type="checkbox"
  				id={isDetail ? `DetailNote_${block.id}` : block.id}
  				className="checkbox_input"
  				onClick={onClickCheckbox}
  			/>
  		</div>
  	);
  };
  ```
- **UpdateNote에 기존 데이터를 불러와 수정하기 기능 구현 (Update)**
  - UpdateNote의 경우 CreateNoteForm과 매우 유사합니다. 모이고 노트 기능 분석에서 보았듯, 단지 우측 상단에 있는 닫기 버튼(취소 버튼)이 존재하는 점만 다릅니다.
  - 매우 유사함으로 CreateNoteForm에서 사용했던, Create\*\*Block을 재활용 합니다.
  - DetailNote의 Read\*\*Block 재활용처럼 어느 영역에서 사용되는지 구분할 수 있는 상태값을 전달하여 활용합니다.
  - summary, detail에서 구분하기 위해서 사용되었던 부분보다는 의미가 떨어지지만, Create와 Update 영역을 구분하여 영역에 맞게 label, input의 id 값을 변경하도록 로직을 구성하였습니다.
  - summary, detail에서는 조금 다른 스타일을 구분하여 적용하기 위해서 상태값을 전달하여 구분했지만, Create, Update 영역의 경우 스타일이 완전히 동일하여 변경을 가하지 않고 같은 스타일을 공유하여 사용하게 했습니다.
- **Block이 없는 경우 Default block 기능 구현**
  - Create 또는 Update의 경우, 최초 생성된 블럭을 모두 삭제하여 Block이 없는 경우 기본적으로 textBlock이 생성되도록 구현하였습니다.
- **상태 이해하기**

```js
const [allNotes, setAllNotes] = useState([]);
/* 
모든 노트를 Array로 관리하며, 배열 내부에 Object 형태로 각각의 노트들이 존재합니다. 서버에서 불러오거나, 서버에 저장 요청을 할 형태의 최종 데이터 구조 입니다.
[
  {title, id, blocks}, {title, id, blocks}, {title, id, blocks}, ... 
]
 */
const [detailNote, setDetailNote] = useState({});
/* 
allNotes의 데이터에서 사용자의 선택에 의해 DetailNote가 보여지는 경우 해당 Note의 데이터를 관리합니다. block 중에 checklist의 수정사항을 DetailNote에 표시하고, allNotes 데이터에도 반영시킬때 사용됩니다.
  {title, id, blocks}
*/
const [blocks, setBlocks] = useState([]);
/*
CreateNoteForm 또는 UpdateNote 컴포넌트에서 사용되어지는 blocks를 관리합니다. 나중에 detailNote와 합쳐져서 allNotes에 반영되어 집니다.
blocks를 useBlocks hook으로 따로 관리하면, block에 관한 state, action을 찾기 쉬기 때문에 분리하여 관리하고 있습니다.
[
  {id, type, text},
  {id, type, content, isDone}
]
 */
```

- 기본적인 기능 구현 완료
  - 노트 CRUD (노트 상세 보기 : Delete, Update 구현)
  - 체크리스트, 텍스트 블럭 CRUD
  - 선택된 노트들 삭제, 특정 노트 삭제
- 다음에 해야할 사항
  - 상태관리 코드 및 구조를 깔끔하게 개선할 필요가 있습니다.
  - 식별자명 관리가 필요합니다.
  - 특정 기준을 가지고 Global Action과 Local Function의 구분 그리고 이벤트에 직접적으로 붙인 익명함수를 기명 함수로 만들어 정리할 필요가 있습니다.
