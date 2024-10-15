const Front = ({ color }) => {
	return (
		<svg
			xmlns="http://www.w3.org/2000/svg"
			width="18"
			height="16"
			viewBox="0 0 18 16"
			fill="none"
		>
			<path
				d="M4.83333 4.66665L1.5 7.99998L4.83333 11.3333M13.1667 4.66665L16.5 7.99998L13.1667 11.3333M10.6667 1.33331L7.33333 14.6666"
				stroke={color}
				strokeWidth="2"
				strokeLinecap="round"
				strokeLinejoin="round"
			/>
		</svg>
	);
};

export default Front;
