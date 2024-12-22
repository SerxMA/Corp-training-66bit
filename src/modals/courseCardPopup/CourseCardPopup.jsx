import { useEffect } from 'react';
import { NavLink } from 'react-router-dom';
import ReactDOM from 'react-dom';

import CourseTag from '../../components/courseTag/CourseTag.jsx';
import MainButton from '../../UI/buttons/mainButton/MainButton.jsx';
import styles from './CourseCardPopup.module.css';
import ClosePopup from '../../UI/svg/closePopup/ClosePopup.jsx';

const CourseCardPopup = ({ title, img, tag, description, id, setOpen }) => {
	const setIsPopupClosed = () => {
		setOpen(false);
	};

	useEffect(() => {
		const closePopup = () => {
			setOpen(false);
		};

		document.addEventListener('click', closePopup);

		return () => document.removeEventListener('click', closePopup);
	}, []);

	return ReactDOM.createPortal(
		<div className={styles['modal-wrapper']}>
			<div
				className={styles['popup']}
				onClick={(e) => e.stopPropagation()}
			>
				<div className={styles['top-block']}>
					<h2 className={styles['title']}>{title}</h2>
					<ClosePopup onClick={setIsPopupClosed} />
				</div>
				<div className={styles['visual-block']}>
					<img
						src={img}
						alt="course img"
						className={styles['course-img']}
					/>
					<CourseTag tag={tag} />
				</div>
				<div className={styles['description']}>{description}</div>
				<NavLink
					className={styles['continue-link']}
					to={`/course/${id}`}
				>
					<MainButton sequel>К материалам курса</MainButton>
				</NavLink>
			</div>
		</div>,
		document.body
	);
};

export default CourseCardPopup;
