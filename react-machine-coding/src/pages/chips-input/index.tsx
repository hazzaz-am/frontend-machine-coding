import { useState, type KeyboardEvent } from "react";
import Chips from "./components/Chips";

export function ChipsInputPage() {
	const [inputText, setInputText] = useState("");
	const [chips, setChips] = useState<string[]>([]);

	const handleKeyDown = (event: KeyboardEvent<HTMLInputElement>) => {
		if (event.key === "Enter" && inputText.trim().length !== 0) {
			setChips((prev) => {
				return [...prev, inputText];
			});
			setInputText("");
		}
	};

	const handleChipDelete = (i: number) => {
		const result = [...chips];
		result.splice(i, 1);
		setChips(result);
	};

	return (
		<div className="flex flex-col gap-4 items-center my-10">
			<h2>Chips Input</h2>
			<input
				type="text"
				placeholder="Type a chip and press tag"
				className="p-2 w-3xs border"
				value={inputText}
				onChange={(e) => setInputText(e.target.value)}
				onKeyDown={(e) => handleKeyDown(e)}
			/>

			<Chips chips={chips} handleChipDelete={handleChipDelete} />
		</div>
	);
}
