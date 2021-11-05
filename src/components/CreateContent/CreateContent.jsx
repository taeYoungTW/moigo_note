import React from 'react';
import { INVALID_BLOCK_TYPE_TEXT } from '../../constants/constants';
import useError from '../../hooks/useError';
import CreateChecklistBlock from '../CreateBlocks/CreateChecklistBlock';
import CreateTextBlock from '../CreateBlocks/CreateTextBlock';
import DnDListBlockHOC from '../DnDListBlockHOC/DnDListBlockHOC';

const CreateContent = ({ blocks, isUpdateNote }) => {
	const _setUseError = useError();

	return (
		<div className="content">
			{blocks?.map((block, i) => {
				switch (block.type) {
					case 'text':
						return (
							<DnDListBlockHOC
								Component={CreateTextBlock}
								ComponentProp={{ block: block }}
								key={block.id}
								id={block.id}
								index={i}
							/>
						);
					case 'checklist':
						return (
							<DnDListBlockHOC
								Component={CreateChecklistBlock}
								ComponentProp={{ block: block, isUpdate: isUpdateNote }}
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
