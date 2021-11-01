import React from 'react';
import { INVALID_BLOCK_TYPE_TEXT } from '../../constants/constants';
import useError from '../../hooks/useError';
import CreateChecklistBlock from '../CreateBlocks/CreateChecklistBlock';
import CreateTextBlock from '../CreateBlocks/CreateTextBlock';

const CreateContent = ({ blocks, isUpdateNote }) => {
	const _setUseError = useError();

	return (
		<div className="content">
			{blocks?.map((block) => {
				switch (block.type) {
					case 'text':
						return (
							<CreateTextBlock
								block={block}
								key={`${isUpdateNote ? 'UpdateNote_' : 'CreateNoteForm_'}${
									block.id
								}`}
							/>
						);
					case 'checklist':
						return (
							<CreateChecklistBlock
								block={block}
								key={`${isUpdateNote ? 'UpdateNote_' : 'CreateNoteForm_'}${
									block.id
								}`}
								isUpdate={true}
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
