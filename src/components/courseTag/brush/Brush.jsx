const Brush = ({ color }) => {
	return (
		<svg
			xmlns="http://www.w3.org/2000/svg"
			width="18"
			height="18"
			viewBox="0 0 18 18"
			fill="none"
		>
			<path
				d="M9.74583 6.5H8.25417C7.7456 6.5 7.33333 6.91227 7.33333 7.42083V15.5792C7.33333 16.0877 7.7456 16.5 8.25417 16.5H9.74583C10.2544 16.5 10.6667 16.0877 10.6667 15.5792V7.42083C10.6667 6.91227 10.2544 6.5 9.74583 6.5Z"
				stroke={color}
				strokeWidth="2"
				strokeLinecap="round"
				strokeLinejoin="round"
			/>
			<path
				d="M15.5792 1.5H14.0875C13.5789 1.5 13.1667 1.91227 13.1667 2.42083V15.5792C13.1667 16.0877 13.5789 16.5 14.0875 16.5H15.5792C16.0877 16.5 16.5 16.0877 16.5 15.5792V2.42083C16.5 1.91227 16.0877 1.5 15.5792 1.5Z"
				stroke={color}
				strokeWidth="2"
				strokeLinecap="round"
				strokeLinejoin="round"
			/>
			<path
				d="M3.16667 16.5C4.08714 16.5 4.83333 15.7538 4.83333 14.8333C4.83333 13.9129 4.08714 13.1667 3.16667 13.1667C2.24619 13.1667 1.5 13.9129 1.5 14.8333C1.5 15.7538 2.24619 16.5 3.16667 16.5Z"
				stroke={color}
				strokeWidth="2"
				strokeLinecap="round"
				strokeLinejoin="round"
			/>
		</svg>
	);
};

export default Brush;
