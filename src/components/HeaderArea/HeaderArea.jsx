import React from 'react';
import { useAppState } from '../../contexts/AppStateContext';
import Header from '../Header/Header';
import NotesHeader from '../NotesHeader/NotesHeader';
import './HeaderArea.scss';

const HeaderArea = () => {
	// Global States, Actions ---------------------------------------
	const { _selectedNoteIds } = useAppState();

	// Render -------------------------------------------------------
	return (
		<header className={_selectedNoteIds.length === 0 ? '' : 'note-header'}>
			<div className="header-fixed">
				{_selectedNoteIds.length === 0 ? <Header /> : <NotesHeader />}
			</div>
		</header>
	);
};

export default HeaderArea;
