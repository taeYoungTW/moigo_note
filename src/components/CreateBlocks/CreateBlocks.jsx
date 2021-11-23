import React from 'react';
import DnDListBlockHOC from '../DnDListBlockHOC/DnDListBlockHOC';
import { useAppAction, useAppState } from '../../contexts/AppStateContext';
import useAddDefaultBlock from '../../hooks/useAddDefaultBlock';
import CreateBlock from '../CreateBlock/CreateBlock';
import './CreateBlocks.scss';

const CreateBlocks = () => {
	// Global States & Actions --------------------------
	const { _addTypeBlock } = useAppAction();
	const { _blocks } = useAppState();

	// Hooks -----------------------------------------
	useAddDefaultBlock(_addTypeBlock, _blocks.length);

	return (
		<div className="create-blocks">
			{_blocks?.map((block, i) => (
				<DnDListBlockHOC
					Component={CreateBlock}
					ComponentProp={{ block, blockIndex: i }}
					key={block.id}
					blockId={block.id}
					blockIndex={i}
				/>
			))}
		</div>
	);
};

export default CreateBlocks;
