import { useCallback, useState } from 'react';

// Manage Global States & Actions
const useBlock = () => {
	// ------ Init State : useState ------------------
	const [blocks, setBlocks] = useState([]);
	/*
  ex.

  [
    {
      id: '',
      type: 'text',
      text: ''
    },
    {
      id: '',
      type: 'checklist',
      isDone: false,
      content: ''
    }
  ]
  */

	// ------ Actions: useCallback -------------------
	const addBlock = useCallback((block) => {
		setBlocks((blocks) => [...blocks, block]);
	}, []);
	// ------ Combine States & Actions ---------------
	const combineStates = { blocks };
	const combineActions = { addBlock };

	return { ...combineStates, ...combineActions };
};

export default useBlock;
