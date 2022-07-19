import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import InputLabel from "@mui/material/InputLabel";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import OutlinedInput from "@mui/material/OutlinedInput";
import Skeleton from "@mui/material/Skeleton";

import { setSelectedCharacter } from "../../store/character/character.action";
import {
	charactersSelector,
	selectedCharacterSelector,
} from "../../store/character/character.selector";

import CONSTANTS from "../../utils/constants";

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
	PaperProps: {
		style: {
			maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
			width: 250,
		},
	},
};

const CharacterSelect = () => {
	const charactersMap = useSelector(charactersSelector);
	const selectedCharacter = useSelector(selectedCharacterSelector);
	const dispatch = useDispatch();
	const [characters, setCharacters] = useState(charactersMap);

	useEffect(() => {
		setCharacters(charactersMap);
	}, [charactersMap]);

	const handleInputChange = (e) => {
		const {
			target: { value },
		} = e;
		dispatch(setSelectedCharacter(value));
	};

	return (
		<div>
			<FormControl sx={{ m: 1, width: 300, mt: 3 }}>
				<InputLabel id="select-character">Select Character</InputLabel>
				<Select
					name="select-character"
					id="select-character"
					labelId="character-select"
					displayEmpty
					value={selectedCharacter}
					onChange={handleInputChange}
					input={<OutlinedInput />}
					defaultValue=""
					MenuProps={MenuProps}
					inputProps={{ "aria-label": "Select Character" }}>
					{/* <MenuItem disabled value="">
						<em>Select Character</em>
					</MenuItem> */}
					{characters && characters.length > 0 ? (
						characters.map((character, key) => (
							<MenuItem
								id={character.name}
								key={character.name}
								value={character.name}>
								{character.name}
							</MenuItem>
						))
					) : (
						<>
							<Skeleton></Skeleton>
							<Skeleton></Skeleton>
							<Skeleton></Skeleton>
							<Skeleton></Skeleton>
						</>
					)}
				</Select>
			</FormControl>
		</div>
	);
};

export default CharacterSelect;
