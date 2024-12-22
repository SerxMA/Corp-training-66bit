const ClosePopup = ({ className, onClick = () => {} }) => {
	return (
		<svg
			xmlns="http://www.w3.org/2000/svg"
			width="32"
			height="32"
			viewBox="0 0 32 32"
			fill="none"
			className={className}
			onClick={onClick}
		>
			<path
				d="M24 8L8 24M8 8L24 24"
				stroke="var(--content-primary)"
				strokeWidth="2.66667"
				strokeLinecap="round"
				strokeLinejoin="round"
			/>
		</svg>
	);
};

export default ClosePopup;
