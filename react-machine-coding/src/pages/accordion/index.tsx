import { useState } from "react";
import { items } from "./data";
import { FaChevronDown, FaChevronUp } from "react-icons/fa";

export default function AccordionPage() {
	const [activeIndex, setActiveIndex] = useState<null | number>(null);

	function handleActiveIndex(index: number) {
		setActiveIndex(activeIndex === index ? null : index);
	}

	return (
		<section className="h-screen flex items-center justify-center">
			<div className="w-full max-w-[400px] m-auto p-5 border border-[#ddd] rounded-[8px] bg-[#f9f9f9]">
				{items.map((item, idx) => (
					<div
						key={idx}
						className="mb-[10px] border border-[#ddd] rounded-[5px] bg-white"
					>
						<button
							onClick={() => handleActiveIndex(idx)}
							className="w-full p-[15px] text-left bg-[#f1f1f1] border-0 rounded-[5px] cursor-pointer text-[16px] font-bold transition-colors duration-300 ease-in hover:bg-[#e0e0e0] [aria-expanded='true']:bg-[#d0d0d0] flex items-center justify-between"
						>
							{item.title}
							{activeIndex === idx ? <FaChevronUp /> : <FaChevronDown />}
						</button>
						{activeIndex === idx && (
							<div className="p-[15px] bg-[#fafafa] border-t border-t-[#ddd]">
								{item.content}
							</div>
						)}
					</div>
				))}
			</div>
		</section>
	);
}
