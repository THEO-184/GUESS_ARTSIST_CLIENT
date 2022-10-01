interface ScoreProps {
	IsGuessRight: boolean;
	attemptScore: number;
}

const ScoreNotification = ({ IsGuessRight, attemptScore }: ScoreProps) => (
	<p
		className={`${
			IsGuessRight ? "text-green-400" : "text-red-400"
		} fixed top-[15%] left-[50%] translate-x--[70%] p-2 text-2xl`}
	>
		{IsGuessRight ? `${attemptScore} POINTS!!` : "WRONG"}
	</p>
);

export default ScoreNotification;
