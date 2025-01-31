const RedEllipse = ({ className }) => {
	return (
		<svg
			className={className}
			xmlns="http://www.w3.org/2000/svg"
			width="5"
			height="5"
			viewBox="0 0 5 5"
			fill="none"
		>
			<circle
				cx="2.5"
				cy="2.5"
				r="2.5"
				fill="var(--system-error-primary)"
			/>
		</svg>
	);
};

export default RedEllipse;
