import React from "react";

interface Props {
	numberInput: number;
	text: boolean;
	onClick: (e: React.FormEvent<HTMLButtonElement>) => Promise<void>;
}

const GameOver = (props: Props) => {
	const { numberInput, onClick, text } = props;
	return (
		<div className="flex w-full items-center justify-center p-2 h-screen flex-col">
			<div className="text-3xl text-amber-800 my-3 w-full">
				SCORES: {numberInput}
			</div>
			<div className="w-full flex justify-center">
				<button
					onClick={onClick}
					className="w-2/5 p-2 rounded-md bg-red-400 block text-white"
				>
					{text ? "restarting..." : "Restart Game"}
				</button>
			</div>
		</div>
	);
};

export default GameOver;
