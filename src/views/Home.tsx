import React, { useEffect, useState } from "react";
import api from "../apis/ArtistApi";
import { useNavigate } from "react-router-dom";
import { GameResponse, RequestBody } from "../utils/Interfaces";
import { AxiosResponse } from "axios";
import { useAuthContext } from "../components/ProtectedRoute";

interface Props {
	setUserScore: React.Dispatch<React.SetStateAction<number>>;
	setRound: React.Dispatch<React.SetStateAction<number>>;
}

const Home = ({ setUserScore, setRound }: Props) => {
	const navigate = useNavigate();

	const [artistName, setArtistName] = useState("");
	const [guess, setGuess] = useState("");
	const [albumName, setAlbumName] = useState("");
	const [attemptNum, setAttemptNum] = useState(0);
	const [roundNumber, setRoundNumber] = useState(0);
	const [artwork, setArtwork] = useState("");
	const [loading, setLoading] = useState(false);
	const [IsGuessRight, setIsGuessRight] = useState(false);
	const [hasUserGuess, setHasUserGuess] = useState(false);
	const [userScore, setScorePoint] = useState(0);
	const [gameOver, setGameOver] = useState(false);
	const [error, setError] = useState(false);
	const [reStart, setreStart] = useState(false);

	const timeOut = () =>
		setTimeout(() => {
			setHasUserGuess(false);
		}, 2000);

	const handleGuessArtist = async (e: React.FormEvent<HTMLButtonElement>) => {
		e.preventDefault();
		if (guess) {
			setHasUserGuess(true);
			setGuess("");
			let modifiedGuess = guess.replace("and", "&");
			if (
				modifiedGuess.toLowerCase() === artistName.toLowerCase() ||
				attemptNum === 3
			) {
				setIsGuessRight(true);
				timeOut();
				let score = attemptNum === 1 ? 5 : attemptNum === 2 ? 3 : 1;
				if (
					attemptNum === 3 &&
					modifiedGuess.toLowerCase() !== artistName.toLowerCase()
				) {
					score = userScore;
				} else {
					score = score + userScore;
				}
				setLoading(true);

				const { data } = await api.put<
					GameResponse,
					AxiosResponse<GameResponse>,
					RequestBody
				>("/game/rounds", {
					attemptNumber: 1,
					scores: score,
					round: roundNumber + 1,
				});
				const { user, albums: album, attemptNumber, msg } = data;
				if (msg) {
					setGameOver(true);
					setTimeout(() => {
						setGameOver(false);
						navigate("/dashboard");
					}, 3000);
				}
				setArtistName(album.artistName);
				setRoundNumber(user?.round);
				setUserScore(user?.scores);
				setRound(user?.round);
				setAttemptNum(attemptNumber);
				setAlbumName(album.collectionName);
				setArtwork(album.artworkUrl60 || album.artworkUrl100);
				setScorePoint(user.scores);
				setLoading(false);
			} else {
				timeOut();
				if (attemptNum <= 3) {
					setLoading(true);
					const res = await api.put<
						GameResponse,
						AxiosResponse<GameResponse>,
						RequestBody
					>("/game/attempts", {
						attemptNumber: attemptNum + 1,
						scores: userScore,
					});
					const { user, albums: album, attemptNumber } = res.data;

					setArtistName(album.artistName);
					setRoundNumber(user?.round);
					setAttemptNum(attemptNumber);
					setAlbumName(album.collectionName);
					setArtwork(album.artworkUrl60 || album.artworkUrl100);
					setScorePoint(user.scores);
					setLoading(false);
				}
			}
		}
	};

	const handleRestartGame = async (e: React.FormEvent<HTMLButtonElement>) => {
		setreStart(true);
		e.preventDefault();
		const { data } = await api.put<GameResponse>("game/restart");
		const { user, albums: album, attemptNumber } = data;
		setArtistName(album.artistName);
		setRoundNumber(user?.round);
		setAttemptNum(attemptNumber);
		setAlbumName(album.collectionName);
		setArtwork(album.artworkUrl60 || album.artworkUrl100);
		setScorePoint(user.scores);
		setUserScore(user?.scores);
		setRound(user?.round);
		setreStart(false);
	};

	const getUserAlbums = async () => {
		const res = await api.get<GameResponse>("/game/attempts");
		const { user, albums: album, attemptNumber } = res.data;

		setGuess("");
		setArtistName(album.artistName);
		setRoundNumber(user?.round);
		setUserScore(user?.scores);
		setRound(user?.round);
		setAttemptNum(attemptNumber);
		setAlbumName(album.collectionName);
		setArtwork(album.artworkUrl60 || album.artworkUrl100);
		setScorePoint(user.scores);
	};

	useEffect(() => {
		getUserAlbums();
	}, []);

	if (error) return <div>Error</div>;
	if (gameOver)
		return (
			<div className="flex items-center justify-center h-screen flex-col text-3xl text-amber-800">
				SCORES: {userScore}
			</div>
		);

	if (roundNumber >= 5) {
		return (
			<div className="flex w-full items-center justify-center p-2 h-screen">
				<button
					onClick={handleRestartGame}
					className="w-2/5 p-2 rounded-md bg-red-400 block text-white"
				>
					{reStart ? "restarting..." : "Restart Game"}
				</button>
			</div>
		);
	}

	return (
		<div className="flex items-center justify-center h-screen flex-col">
			{hasUserGuess && (
				<p className="text-red-400 fixed top-[15%] left-[50%] translate-x--[70%] p-2 text-2xl">
					{IsGuessRight ? `${userScore} POINTS!!` : "WRONG"}
				</p>
			)}

			{attemptNum === 3 && (
				<div className="flex justify-center flex-col">
					<h2>Hint</h2>
					<img className="block w-[250px]" src={artwork} alt="hint" />
				</div>
			)}

			{/* <h3 className="text-slate-900 text-2xl uppercase">Score: {userScore}</h3> */}

			<div className=" w-11/12 h-full sm:w-2/4 sm:h-2/4 mx-auto text-center flex justify-start items-center flex-col">
				<h1 className="text-emerald-600 text-2xl mb-1">ROUND {roundNumber}</h1>
				<h1 className=" text-slate-800 text-lg">
					Guess the exact full name of artist for the album below
				</h1>

				{/* <h6>Artist Name: {artistName}</h6> */}
				<h6 className="text-green-400 text-lg p-2">Attempt: {attemptNum}</h6>

				<h3 className="text-blue-600 text-2xl">{albumName}</h3>

				<div className="w-[300px]">
					<input
						className="w-[300px] h-11 bg-slate-200 block p-2 border-0 focus:outline-none m-4"
						type="text"
						value={guess}
						onChange={(e) => {
							setGuess(e.target.value);
							setIsGuessRight(false);
						}}
					/>
					<div className="flex w-full items-center justify-between p-2">
						<button
							onClick={handleRestartGame}
							className="w-2/5 p-2 rounded-md bg-red-400 block text-white"
						>
							{reStart ? "restarting..." : "Restart Game"}
						</button>
						<button
							onClick={handleGuessArtist}
							className="w-2/5 p-2 rounded-md bg-sky-400 block text-white"
						>
							{loading ? "guessing..." : "Guess"}
						</button>
					</div>
				</div>
			</div>
		</div>
	);
};

export default Home;
