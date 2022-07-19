import { combineReducers } from "redux";
import { characterReducer } from "./character/character-reducer";

export const rootReducer = combineReducers({
	character: characterReducer,
});
