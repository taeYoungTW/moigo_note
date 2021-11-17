import React from 'react';
import DnDListBlockHOC from '../DnDListBlockHOC/DnDListBlockHOC';
import { useAppAction } from '../../contexts/AppStateContext';
import useAddDefaultBlock from '../../hooks/useAddDefaultBlock';
import CreateBlock from '../CreateBlock/CreateBlock';
import './CreateContent.scss';

const CreateContent = ({ blocks, isUpdateNote }) => {
	// Global States & Actions --------------------------
	const { _addTypeBlock } = useAppAction();

	// Hooks -----------------------------------------
	useAddDefaultBlock(_addTypeBlock, blocks.length);

	return (
		<div className="content">
			{blocks?.map((block, i) => (
				<DnDListBlockHOC
					Component={CreateBlock}
					ComponentProp={{ block, isUpdateNote, blockIndex: i }}
					key={block.id}
					blockId={block.id}
					blockIndex={i}
				/>
			))}
		</div>
	);
};

export default CreateContent;
