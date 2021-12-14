import styles from './Header.scss';
import SearchIcon from '@mui/icons-material/Search';
import CloseIcon from '@mui/icons-material/Close';
import MinimizeIcon from '@mui/icons-material/Minimize';
import CropSquareIcon from '@mui/icons-material/CropSquare';
import { MOIGO_TEXT, NOTE_TEXT, SEARCH_TEXT } from '../../constants/constants';
import { useAppAction } from '../../contexts/AppStateContext';
import { useCallback } from 'react';
import { HEADER_SEARCH_ICON_STYLE } from '../../constants/iconStyles';
import CtrlWindowBtn from '../CtrlWindowBtn/CtrlWindowBtn';

const Header = () => {
	// Global States, Actions ---------------------------------------
	const { _setSearchInput } = useAppAction();
	// Render -------------------------------------------------------
	const handleSearchInputChange = useCallback(
		(e) => {
			const {
				target: { value },
			} = e;
			_setSearchInput(value);
		},
		[_setSearchInput]
	);
	return (
		<div className={styles.defaultHeader}>
			<div className={styles.alignLeft}>
				<div className={styles.titleContainer}>
					<h1 className={styles.logo}>{MOIGO_TEXT}</h1>
					<h2 className={styles.title}>{NOTE_TEXT}</h2>
				</div>
				<div className={styles.searchContainer}>
					<SearchIcon sx={HEADER_SEARCH_ICON_STYLE} />
					<input
						className={styles.searchInput}
						type="text"
						placeholder={SEARCH_TEXT}
						onChange={handleSearchInputChange}
					/>
				</div>
			</div>
			<div className={styles.windowCtrlBtns}>
				<CtrlWindowBtn Icon={MinimizeIcon} />
				<CtrlWindowBtn Icon={CropSquareIcon} />
				<CtrlWindowBtn Icon={CloseIcon} />
			</div>
		</div>
	);
};

export default Header;
