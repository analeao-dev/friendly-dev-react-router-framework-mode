type PaginationProps = {
	totalPages: number;
	currentPage: number;
	OnPageChange: (page: number) => void;
};

const PaginationButton: React.FC<PaginationProps> = ({ totalPages, currentPage, OnPageChange }) => {
	if (totalPages <= 1) return null;

	return (
		<div className='flex justify-center gap-2 mt-8'>
			{Array.from({ length: totalPages }, (_, index) => (
				<button
					key={index + 1}
					className={`px-3 py-1 cursor-pointer rounded ${currentPage === index + 1 ? 'bg-blue-600 text-white' : 'bg-gray-700 text-gray-200'}`}
					onClick={() => OnPageChange(index + 1)}
				>
					{index + 1}
				</button>
			))}
		</div>
	);
};

export default PaginationButton;
