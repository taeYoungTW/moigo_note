import React from 'react';
import { INVALID_BLOCK_TYPE_TEXT } from '../../constants/constants';
import useError from '../../hooks/useError';
import CreateChecklistBlock from '../CreateBlocks/CreateChecklistBlock';
import CreateImgBlock from '../CreateBlocks/CreateImgBlock';
import CreateTextBlock from '../CreateBlocks/CreateTextBlock';
import DnDListBlockHOC from '../DnDListBlockHOC/DnDListBlockHOC';
import { useAppAction } from '../../contexts/AppStateContext';
import useAddDefaultBlock from '../../hooks/useAddDefaultBlock';

const CreateContent = ({ blocks, isUpdateNote }) => {
	// Global States & Actions --------------------------
	const { _addTypeBlock } = useAppAction();

	// Hooks -----------------------------------------
	useAddDefaultBlock(_addTypeBlock, blocks.length);

	const _setUseError = useError();

	return (
		<div className="content">
			{blocks?.map((block, i) => {
				switch (block.type) {
					case 'text':
						return (
							<DnDListBlockHOC
								Component={CreateTextBlock}
								ComponentProp={{ block }}
								key={block.id}
								id={block.id}
								index={i}
							/>
						);
					case 'checklist':
						return (
							<DnDListBlockHOC
								Component={CreateChecklistBlock}
								ComponentProp={{ block, isUpdate: isUpdateNote }}
								key={block.id}
								id={block.id}
								index={i}
							/>
						);
					case 'image':
						return (
							<DnDListBlockHOC
								Component={CreateImgBlock}
								ComponentProp={{ block, isUpdate: isUpdateNote }}
								key={block.id}
								id={block.id}
								index={i}
							/>
						);
					default:
						_setUseError({
							message: INVALID_BLOCK_TYPE_TEXT,
							location: `${
								isUpdateNote ? 'UpdateNote' : 'CreateNoteForm'
							}/CreateContent/switch`,
						});
						return <></>;
				}
			})}
		</div>
	);
};

export default CreateContent;
