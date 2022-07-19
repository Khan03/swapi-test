import { actionCreator } from "../../utils/reducer.utils";
import { CHARACTER_ACTION_TYPES } from "./character.types";

export const setCharacters = (charactersArray) =>
	actionCreator(CHARACTER_ACTION_TYPES.SET_CHARACTERS, charactersArray);

export const setSelectedCharacter = (character) =>
	actionCreator(CHARACTER_ACTION_TYPES.SET_SELECTED_CHARACTER, character);

export const setMovies = (moviesArray) =>
	actionCreator(CHARACTER_ACTION_TYPES.SET_MOVIES, moviesArray);
