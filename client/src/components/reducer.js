export const initialState = {
	id: "",
	questions: [
		{
			questionText: "Question",
			questionType: "radio",
			options: [{ optionText: "Option 1" }],
			open: true,
			required: false,
		},
	],
	questionType: "radio",
	doc_name: "Untitled form ",
	doc_desc: "add the description",
};

export const actionTypes = {
	SET_QUESTIONS: "SET_QUESTIONS",
	CHANGE_TYPE: "CHANGE_TYPE",
	SET_DOC_NAME: "SET_DOC_NAME",
	SET_DOC_DESC: "SET_DOC_DESC",
	SET_DOC_ID: "SET_DOC_ID",
};

const reducer = (state = initialState, action) => {
	switch (action.type) {
		case actionTypes.SET_QUESTIONS:
			return {
				...state,
				questions: action.questions,
			};
		case actionTypes.CHANGE_TYPE:
			return {
				...state,
				questionType: action.questionType,
			};
		case actionTypes.SET_DOC_NAME:
			return {
				...state,
				doc_name: action.doc_name,
			};
		case actionTypes.SET_DOC_DESC:
			return {
				...state,
				doc_desc: action.doc_desc,
			};
		case actionTypes.SET_DOC_ID:
			return {
				...state,
				id: action.id,
			};
		default:
			return state;
	}
};

export default reducer;
