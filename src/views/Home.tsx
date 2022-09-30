import React, { useEffect, useState } from "react";
import { AxiosResponse } from "axios";

import { AddToState, GameResponse, RequestBody } from "../utils/Interfaces";
import api from "../apis/ArtistApi";
import GameOver from "../components/GameOver";
import Button from "../components/Button";

interface Props {
	setUserScore: React.Dispatch<React.SetStateAction<number>>;
	setRound: React.Dispatch<React.SetStateAction<number>>;
}

const Home = ({ setUserScore, setRound }: Props) => {
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
	const [gameOver] = useState(false);
	const [error] = useState(false);
	const [reStart, setreStart] = useState(false);
	const [attemptScore, setAttemptScore] = useState(0);

	const timeOut = () =>
		setTimeout(() => {
			setHasUserGuess(false);
		}, 2000);

	const store_data_to_state: AddToState = (data) => {
		const { albums: album, user, attemptNumber } = data;
		setRound(user?.round);
		if (user.round > 5) {
			setRoundNumber(user.round);
			setScorePoint(user.scores);
			setUserScore(user.scores);
			return;
		}
		setArtistName(album.artistName);
		setRoundNumber(user?.round);
		setUserScore(user?.scores);
		setAttemptNum(attemptNumber);
		setAlbumName(album.collectionName);
		setArtwork(album.artworkUrl60 || album.artworkUrl100);
		setScorePoint(user.scores);
	};

	const handleGuessArtist = async (e: React.FormEvent<HTMLButtonElement>) => {
		e.preventDefault();
		if (guess) {
			setHasUserGuess(true);
			setGuess("");
			setAttemptScore(0);
			const modifiedUserInput = guess.replace("and", "&");
			if (
				modifiedUserInput.toLowerCase() === artistName.toLowerCase() ||
				attemptNum === 3
			) {
				setIsGuessRight(true);
				timeOut();
				let score = attemptNum === 1 ? 5 : attemptNum === 2 ? 3 : 1;
				setAttemptScore(score);
				if (
					attemptNum === 3 &&
					modifiedUserInput.toLowerCase() !== artistName.toLowerCase()
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
				const { msg } = data;
				if (msg) {
					setRoundNumber(6);
				}
				store_data_to_state(data);
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

					setRoundNumber(user?.round);
					setArtistName(album.artistName);
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
		store_data_to_state(data);
		setreStart(false);
	};

	const handleUserInput = (e: React.ChangeEvent<HTMLInputElement>) => {
		setGuess(e.target.value);
		setIsGuessRight(false);
	};

	const getUserAlbums = async () => {
		const res = await api.get<GameResponse>("/game/attempts");
		setGuess("");
		store_data_to_state(res.data);
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

	if (roundNumber > 5) {
		return (
			<GameOver
				onClick={handleRestartGame}
				text={reStart}
				numberInput={userScore}
			/>
		);
	}

	return (
		<div className="flex items-center justify-center h-screen flex-col">
			<ScoreNotification
				IsGuessRight={IsGuessRight}
				hasUserGuess={hasUserGuess}
				attemptScore={attemptScore}
			/>

			{attemptNum === 3 && (
				<div className="flex justify-center flex-col">
					<h2>Hint</h2>
					<img className="block w-[250px]" src={artwork} alt="hint" />
				</div>
			)}

			<div className=" w-11/12 h-screen sm:w-2/4 mx-auto text-center flex justify-start items-center flex-col">
				<div className="h-2/3 w-11/12 sm:w-full m-auto flex justify-start items-center flex-col">
					<h1 className="text-emerald-600 text-2xl mb-1">
						ROUND {roundNumber}
					</h1>
					<h1 className=" text-slate-800 text-lg">
						Guess the exact full name of artist for the album below
					</h1>

					<h6 className="text-green-400 text-lg p-2">Attempt: {attemptNum}</h6>

					<h3 className="text-blue-600 text-2xl">{albumName}</h3>

					<div className="w-[300px]">
						<input
							className="w-full h-11 bg-slate-200 block  border-0 focus:outline-none my-4 p-2"
							type="text"
							value={guess}
							onChange={handleUserInput}
						/>
						<div className="flex w-full items-center justify-between">
							<Button
								text={reStart ? "restarting..." : "Restart Game"}
								onClick={handleRestartGame}
								className="w-2/5"
							/>
							<Button
								text={loading ? "guessing..." : "Guess"}
								onClick={handleGuessArtist}
								color="bg-sky-400"
								className="w-2/5"
							/>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};

interface ScoreProps {
	hasUserGuess: boolean;
	IsGuessRight: boolean;
	attemptScore: number;
}

const ScoreNotification = ({
	hasUserGuess,
	IsGuessRight,
	attemptScore,
}: ScoreProps) =>
	hasUserGuess ? (
		<p
			className={`${
				IsGuessRight ? "text-green-400" : "text-red-400"
			} fixed top-[15%] left-[50%] translate-x--[70%] p-2 text-2xl`}
		>
			{IsGuessRight ? `${attemptScore} POINTS!!` : "WRONG"}
		</p>
	) : null;

export default Home;
