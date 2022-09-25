import { ARTISTS } from "./contants";

export const getRandomArtist = () => {
	const randomArtist = Math.floor(Math.random() * ARTISTS.length);
	return ARTISTS[randomArtist];
};
