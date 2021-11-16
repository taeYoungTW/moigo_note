import React from 'react';
import DnDListBlockHOC from '../DnDListBlockHOC/DnDListBlockHOC';
import { useAppAction } from '../../contexts/AppStateContext';
import useAddDefaultBlock from '../../hooks/useAddDefaultBlock';
import CreateBlock from '../CreateBlocks/CreateBlock';

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
					ComponentProp={{ block, isUpdateNote }}
					key={block.id}
					id={block.id}
					index={i}
				/>
			))}
		</div>
	);
};

export default CreateContent;
