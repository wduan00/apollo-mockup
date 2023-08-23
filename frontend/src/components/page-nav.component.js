export default function PageNav({ currentPage, setCurrentPage, numPages }) {
	// array of ints from 1 to numPages e.g. [1, 2, 3, . . ., numPages]
	// default to 3 due to Apollo API limitations for free users
	const pageNumbers = Array.from(Array(numPages), (_, i) => i + 1);

	const nextPage = () => {
		if (currentPage !== numPages) {
			setCurrentPage(currentPage + 1);
		}
	};

	const prevPage = () => {
		if (currentPage !== 1) {
			setCurrentPage(currentPage - 1);
		}
	};

	return (
		<nav>
			<ul className="pagination justify-content-center">
				<li className="page-item">
					<a
						className="page-link"
						href="/#"
						aria-label="Previous"
						onClick={prevPage}
					>
						<span aria-hidden="true">&laquo;</span>
					</a>
				</li>
				{pageNumbers.map((pageNum) => {
					return (
						<li
							key={pageNum}
							className={`page-item ${currentPage === pageNum ? "active" : ""}`}
						>
							<a
								className="page-link"
								href="/#"
								onClick={() => {
									setCurrentPage(pageNum);
								}}
							>
								{pageNum}
							</a>
						</li>
					);
				})}
				<li className="page-item">
					<a
						className="page-link"
						href="/#"
						aria-label="Next"
						onClick={nextPage}
					>
						<span aria-hidden="true">&raquo;</span>
					</a>
				</li>
			</ul>
		</nav>
	);
}
