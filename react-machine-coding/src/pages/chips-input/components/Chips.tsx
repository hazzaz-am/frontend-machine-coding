type TChips = {
	chips: string[];
	handleChipDelete: (i: number) => void;
};

export default function Chips({ chips, handleChipDelete }: TChips) {
	return (
		<div className="flex flex-wrap gap-2 max-w-2/4">
			{chips.map((chip, i) => (
				<span key={i} className="bg-gray-200 p-2 rounded-full">
					{chip}{" "}
					<button
						className="cursor-pointer text-red-600 ml-1 px-2"
						onClick={() => handleChipDelete(i)}
					>
						X
					</button>
				</span>
			))}
		</div>
	);
}
