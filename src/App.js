import { useEffect } from "react";
import "./App.css";
import CONSTANTS from "./utils/constants";
import HeaderComponent from "./components/header/header.component";
import { Container, List, ListItem } from "@mui/material";

import { axiosHelper } from "./utils/axios-helper.util";
import { useDispatch } from "react-redux";
import CharacterSelect from "./components/character-select/character-select.component";
import { setCharacters } from "./store/character/character.action";
import Films from "./components/film-list/film-list.component";

const CHARACTER_API_URL = CONSTANTS.APIURL + "/people";

function App() {
	const dispatch = useDispatch();
	useEffect(() => {
		axiosHelper(CHARACTER_API_URL)
			.then((res) => {
				dispatch(setCharacters(res.results));
			})
			.catch((err) => {
				console.error(err);
			});
	}, [dispatch]);

	return (
		<div className="App">
			<HeaderComponent />
			<Container maxWidth="lg">
				<CharacterSelect />
				<Films />
			</Container>
		</div>
	);
}

export default App;
