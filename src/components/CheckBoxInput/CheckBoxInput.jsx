import CheckBoxOutlineBlankIcon from '@mui/icons-material/CheckBoxOutlineBlank';
import CheckBoxIcon from '@mui/icons-material/CheckBox';
import styles from './CheckBoxInput.scss';
import { CHECKBOX_ICON_STYLE } from '../../constants/iconStyles';

const CheckBoxInput = ({ isDone, handleCheckBoxOnChange }) => {
	return (
		<label className={styles.checkboxLabel}>
			{isDone ? (
				<CheckBoxIcon sx={CHECKBOX_ICON_STYLE} />
			) : (
				<CheckBoxOutlineBlankIcon sx={CHECKBOX_ICON_STYLE} />
			)}
			<input
				type="checkbox"
				className={styles.checkboxInput}
				checked={isDone}
				onChange={handleCheckBoxOnChange}
			/>
		</label>
	);
};

export default CheckBoxInput;
