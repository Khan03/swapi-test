import { CHARACTER_ACTION_TYPES } from "./character.types";

const INITIAL_STATE = { characters: null, movies: null, selectedCharacter: '' };

export const characterReducer = (state = INITIAL_STATE, action) => {
	const { type, payload } = action;
	switch (type) {
		case CHARACTER_ACTION_TYPES.SET_CHARACTERS:
			return {
				...state,
				characters: payload,
			};

		case CHARACTER_ACTION_TYPES.SET_MOVIES:
			return {
				...state,
				movies: payload,
			};

		case CHARACTER_ACTION_TYPES.SET_SELECTED_CHARACTER:
			return {
				...state,
				selectedCharacter: payload,
			};

		default:
			return state;
	}
};
