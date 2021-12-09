class BlockObjTemplate {
	constructor() {
		this.blockTypes = {
			TEXT: 'Text',
			CHECKLIST: 'Checklist',
			IMAGE: 'Image',
		};
	}

	get text() {
		return { id: '', type: this.blockTypes.TEXT, text: '' };
	}

	get checklist() {
		return {
			id: '',
			type: this.blockTypes.CHECKLIST,
			content: '',
			isDone: false,
		};
	}

	get image() {
		return { id: '', type: this.blockTypes.IMAGE, dataUrl: '' };
	}

	getBlock(type) {
		switch (type) {
			case this.blockTypes.TEXT:
				return { id: '', type, text: '' };
			case this.blockTypes.CHECKLIST:
				return {
					id: '',
					type,
					content: '',
					isDone: false,
				};
			case this.blockTypes.IMAGE:
				return { id: '', type, dataUrl: '' };
			default:
				console.error(`${type} is invalid Block Type!`);
				return;
		}
	}
}

const blockTemplate = new BlockObjTemplate();

export default blockTemplate;
