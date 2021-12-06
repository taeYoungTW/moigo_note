const setCaretEnd = (targetDOM) => {
	// For #4 issue
	targetDOM.focus();
	targetDOM.setSelectionRange(targetDOM.value.length, targetDOM.value.length);
};

export default setCaretEnd;
