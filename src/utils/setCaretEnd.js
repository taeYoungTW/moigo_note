const setCaretEnd = (targetDOM) => {
	targetDOM.focus();
	targetDOM.setSelectionRange(targetDOM.value.length, targetDOM.value.length);
};

export default setCaretEnd;
