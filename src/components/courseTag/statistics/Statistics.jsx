const Statistic = ({ color }) => {
	return (
		<svg
			xmlns="http://www.w3.org/2000/svg"
			width="20"
			height="20"
			viewBox="0 0 20 20"
			fill="none"
		>
			<path
				d="M10.7458 7.5H9.25417C8.7456 7.5 8.33333 7.91227 8.33333 8.42083V16.5792C8.33333 17.0877 8.7456 17.5 9.25417 17.5H10.7458C11.2544 17.5 11.6667 17.0877 11.6667 16.5792V8.42083C11.6667 7.91227 11.2544 7.5 10.7458 7.5Z"
				stroke={color}
				strokeWidth="2"
				strokeLinecap="round"
				strokeLinejoin="round"
			/>
			<path
				d="M16.5792 2.5H15.0875C14.5789 2.5 14.1667 2.91227 14.1667 3.42083V16.5792C14.1667 17.0877 14.5789 17.5 15.0875 17.5H16.5792C17.0877 17.5 17.5 17.0877 17.5 16.5792V3.42083C17.5 2.91227 17.0877 2.5 16.5792 2.5Z"
				stroke={color}
				strokeWidth="2"
				strokeLinecap="round"
				strokeLinejoin="round"
			/>
			<path
				d="M4.16667 17.5C5.08714 17.5 5.83333 16.7538 5.83333 15.8333C5.83333 14.9129 5.08714 14.1667 4.16667 14.1667C3.24619 14.1667 2.5 14.9129 2.5 15.8333C2.5 16.7538 3.24619 17.5 4.16667 17.5Z"
				stroke={color}
				strokeWidth="2"
				strokeLinecap="round"
				strokeLinejoin="round"
			/>
		</svg>
	);
};

export default Statistic;
