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
	const resetBlocks = useCallback(() => {
		setBlocks([]);
	}, []);

	const initBlocks = useCallback((blocks) => {
		setBlocks(blocks);
	}, []);

	const addBlock = useCallback((block) => {
		setBlocks((blocks) => [...blocks, block]);
	}, []);

	const deleteBlock = useCallback((blockId) => {
		setBlocks((blocks) => blocks.filter((block) => block.id !== blockId));
	}, []);

	const updateBlock = useCallback(
		(targetBlock) => {
			if (blocks.find((block) => block.id === targetBlock.id)) {
				setBlocks((blocks) =>
					blocks.map((block) => {
						if (block.id === targetBlock.id) {
							return targetBlock;
						} else {
							return block;
						}
					})
				);
			} else {
				throw new Error('Error: updateBlock');
			}
		},
		[blocks]
	);
	// ------ Combine States & Actions ---------------
	const combineStates = { blocks };
	const combineActions = {
		addBlock,
		deleteBlock,
		updateBlock,
		resetBlocks,
		initBlocks,
	};

	return { ...combineStates, ...combineActions };
};

export default useBlock;
