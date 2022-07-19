import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux/es/exports";
import Axios from "axios";

import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Skeleton from "@mui/material/Skeleton";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import ListSubheader from "@mui/material/ListSubheader";
import ListItemButton from "@mui/material/ListItemButton";

import {
	charactersSelector,
	moviesSelector,
	selectedCharacterSelector,
} from "../../store/character/character.selector";
import { setMovies } from "../../store/character/character.action";

const Films = () => {
	const moviesArray = useSelector(moviesSelector);
	const charactersArray = useSelector(charactersSelector);
	const selectedCharacter = useSelector(selectedCharacterSelector);
	const dispatch = useDispatch();
	const [latestMovie, setLatestMovie] = useState({
		title: "",
		release_date: "",
	});
	useEffect(() => {
		if (charactersArray && charactersArray.length > 0) {
			const selectedCharacterData = charactersArray.filter(
				(character) => character.name === selectedCharacter
			);
			const { films } =
				selectedCharacterData && selectedCharacterData.length
					? selectedCharacterData[0]
					: [];
			if (films) {
				Axios.all(films.map((film) => Axios.get(film)))
					.then(
						Axios.spread((...responses) => {
							const filmArr = new Array(
								responses.map((response) => {
									let film;
									if (response.status === 200) {
										const { title, release_date } = response.data;
										film = { title: title, release_date: release_date };
									}
									return film;
								})
							);
							return filmArr;
						})
					)
					.then((filmArr) => dispatch(setMovies(...filmArr)))
					.catch((err) => console.error(err));
			}
		}
	}, [selectedCharacter]);

	useEffect(() => {
		getLatestMovie();
	}, [moviesArray]);

	const getLatestMovie = () => {
		if (moviesArray && moviesArray.length > 0) {
			console.log(moviesArray, "movies array", moviesArray.length);
			let latestMovie = moviesArray[moviesArray.length - 1];
			console.log(latestMovie, "latestMovie");
			setLatestMovie(latestMovie);
		}
	};

	return (
		<>
			<Box
				display="flex"
				justifyContent="center"
				alignItems="center"
				border="1px">
				<Card
					sx={{
						width: "100%",
						maxWidth: "300px",
						bgcolor: "background.paper",
						marginTop: "10px",
					}}>
					<CardContent>
						<List subheader={<ListSubheader>Character Movies</ListSubheader>}>
							{moviesArray && moviesArray.length > 0 ? (
								moviesArray.map((movie) => {
									return (
										<ListItem disablePadding key={movie.title}>
											<ListItemButton>
												<ListItemText primary={movie.title}></ListItemText>
											</ListItemButton>
										</ListItem>
									);
								})
							) : (
								<>
									<Skeleton></Skeleton>
									<Skeleton></Skeleton>
									<Skeleton></Skeleton>
								</>
							)}
						</List>
					</CardContent>
				</Card>
			</Box>
			<Box display={"flex"} justifyContent="center" alignItems="center">
				<Card
					sx={{
						mt: "10px",
						mb: "20px",
						width: "100%",
						maxWidth: "300px",
					}}>
					<CardContent>
						{latestMovie && latestMovie.title !== "" ? (
							<>
								<span id="latest-movie" style={{ marginBottom: "5px" }}>
									Latest Movie
								</span>
								<div>
									<span>{`${latestMovie.title} ${latestMovie.release_date}`}</span>
								</div>
							</>
						) : (
							<Skeleton sx={{ width: "100%", maxWidth: "300px" }}></Skeleton>
						)}
					</CardContent>
				</Card>
			</Box>
		</>
	);
};

export default Films;
