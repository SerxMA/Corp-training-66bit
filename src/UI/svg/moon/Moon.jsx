import styles from './Moon.module.css';

const Moon = ({ className }) => {
	return (
		<svg
			className={`${styles.svg} ${className ? className : ''}`}
			xmlns="http://www.w3.org/2000/svg"
			width="24"
			height="24"
			viewBox="0 0 24 24"
			fill="none"
		>
			<path
				d="M19 10.9999H21M20 9.99994V11.9999M12 2.99994C12.132 2.99994 12.263 2.99994 12.393 2.99994C11.1084 4.19365 10.2826 5.79979 10.0593 7.53916C9.83602 9.27854 10.2293 11.0412 11.1708 12.5207C12.1122 14.0002 13.5424 15.103 15.2126 15.6374C16.8829 16.1718 18.6876 16.1041 20.313 15.4459C19.6878 16.9504 18.6658 18.257 17.3562 19.2262C16.0466 20.1954 14.4985 20.791 12.8769 20.9493C11.2554 21.1077 9.62129 20.8229 8.14892 20.1253C6.67654 19.4278 5.42114 18.3436 4.51661 16.9885C3.61209 15.6334 3.09238 14.0582 3.01291 12.4309C2.93345 10.8036 3.29721 9.18524 4.0654 7.74846C4.83359 6.31167 5.97739 5.11037 7.37479 4.27268C8.77219 3.43499 10.3708 2.99234 12 2.99194V2.99994ZM17 3.99994C17 4.53037 17.2107 5.03908 17.5858 5.41415C17.9609 5.78923 18.4696 5.99994 19 5.99994C18.4696 5.99994 17.9609 6.21065 17.5858 6.58573C17.2107 6.9608 17 7.46951 17 7.99994C17 7.46951 16.7893 6.9608 16.4142 6.58573C16.0391 6.21065 15.5304 5.99994 15 5.99994C15.5304 5.99994 16.0391 5.78923 16.4142 5.41415C16.7893 5.03908 17 4.53037 17 3.99994Z"
				stroke="var(--purple-main)"
				strokeWidth="2"
				strokeLinecap="round"
				strokeLinejoin="round"
			/>
		</svg>
	);
};

export default Moon;
