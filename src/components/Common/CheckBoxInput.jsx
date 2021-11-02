import CheckBoxOutlineBlankIcon from '@mui/icons-material/CheckBoxOutlineBlank';
import CheckBoxIcon from '@mui/icons-material/CheckBox';
import {
	CHECKBOX_ICON_COLOR,
	CHECKBOX_ICON_FONT_SIZE,
} from '../../constants/constants';

const CheckBoxInput = ({
	blockId,
	isDone,
	location,
	handleCheckBoxOnChange,
}) => {
	return (
		<>
			<label htmlFor={`${location}_${blockId}`} className="checkbox_label">
				{isDone ? (
					<CheckBoxIcon
						sx={{
							fontSize: CHECKBOX_ICON_FONT_SIZE,
							color: CHECKBOX_ICON_COLOR,
						}}
					/>
				) : (
					<CheckBoxOutlineBlankIcon
						sx={{
							fontSize: CHECKBOX_ICON_FONT_SIZE,
							color: CHECKBOX_ICON_COLOR,
						}}
					/>
				)}
			</label>
			<input
				type="checkbox"
				id={`${location}_${blockId}`}
				className="checkbox_input"
				checked={isDone}
				onChange={handleCheckBoxOnChange}
			/>
		</>
	);
};

export default CheckBoxInput;
