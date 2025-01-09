import { useEffect } from 'react';
import { NavLink } from 'react-router-dom';
import ReactDOM from 'react-dom';
import { useDispatch } from 'react-redux';

import { useAuth } from '../../customHooks/useAuth.js';
import { postSignUpCourse } from '../../store/actions/courses.js';
import CourseTag from '../../components/courseTag/CourseTag.jsx';
import MainButton from '../../UI/buttons/mainButton/MainButton.jsx';
import ClosePopup from '../../UI/svg/closePopup/ClosePopup.jsx';
import styles from './CourseCardPopup.module.css';

const CourseCardPopup = ({
	title,
	img,
	tag,
	description,
	id,
	setOpen,
	enrolled,
}) => {
	const dispatch = useDispatch();
	const { username } = useAuth();
	const setIsPopupClosed = () => {
		setOpen(false);
	};

	const handleSignUp = () => {
		const config = {
			data: [username],
			params: { courseId: id },
		};
		dispatch(
			postSignUpCourse(config, {
				params: { username: username, enrolled: false },
			})
		);
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
				{enrolled ? (
					<NavLink
						className={styles['continue-link']}
						to={`/course/${id}`}
					>
						<MainButton sequel>К материалам курса</MainButton>
					</NavLink>
				) : (
					<MainButton
						className={styles['continue-link']}
						onClick={handleSignUp}
					>
						Записаться
					</MainButton>
				)}
			</div>
		</div>,
		document.body
	);
};

export default CourseCardPopup;
