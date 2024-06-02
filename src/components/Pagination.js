import { ArrowRightIcon, ArrowLeftIcon } from "@heroicons/react/24/outline";

function Pagination({
	page,
	countPage,
	increasePage,
	decreasePage,
	changePageByInput
}) {
	return (
		<div className="flex justify-end h-[25px]">
			<div className="flex justify-between w-[200px]">
				<div className="flex gap-[10px] w-[110px]">
					<input
						type="number"
						className="w-[50px] border border-[#EEEEEE] font-light text-[#505050] text-center"
						onChange={(e) => changePageByInput(e)}
						value={page}
					/>
					<p className="font-light text-[#505050] w-[50px]">
						of {countPage !== 0 ? countPage : 1}
					</p>
				</div>
				<div className="flex">
					<ArrowLeftIcon
						className="h-[25px] w-10 bg-[#EEEEEE] hover:bg-[#D0D0D0] cursor-pointer"
						onClick={decreasePage}
					/>
					<ArrowRightIcon
						className="h-[25px] w-10 bg-[#EEEEEE] hover:bg-[#D0D0D0] cursor-pointer"
						onClick={increasePage}
					/>
				</div>
			</div>
		</div>
	);
}

export default Pagination;
