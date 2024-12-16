import { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import ReactDOM from 'react-dom';
import { useDispatch, useSelector } from 'react-redux';

import { useAuth } from '../../customHooks/useAuth.js';
import { postCourse } from '../../store/actions/courses.js';
import { putCourse } from '../../store/actions/course.js';
import ChooseImgModal from '../chooseImgModal/ChooseImgModal.jsx';
import NewCourse from '../newCourse/NewCourse.jsx';
import Cross from '../Cross.jsx';
import styles from './WrapperCourseCreator.module.css';

const WrapperCourseCreator = ({ setOpen, stage, id, course }) => {
	const dispatch = useDispatch();
	const [searchParams] = useSearchParams();
	const { isError, isLoading } = useSelector((state) => state.courses);
	const [showDropDown, setShowDropDown] = useState(false);
	const [step, setStep] = useState(stage ? stage : 1);
	const [courseData, setCourseData] = useState({
		title: course ? course.title : '',
		description: course ? course.description : '',
		tags: course ? course.tags : [],
		file: null,
	});
	const [clickCompleted, setClickCompleted] = useState(false); // пока будет так
	const { username } = useAuth();

	const handleNext = () => {
		setStep((cv) => cv + 1);
	};

	const handlePrev = () => {
		setStep((cv) => cv - 1);
	};

	const handleSubmit = async () => {
		const formData = new FormData();
		if (!stage || stage === 1) {
			formData.append('title', courseData.title);
			formData.append('description', courseData.description);
			formData.append(
				'tags',
				JSON.stringify(courseData.tags.map(({ id, ...rest }) => rest))
			);
			formData.append('authorName', username);
		}
		if (!stage || stage === 2) {
			formData.append('image', courseData.file);
		}

		const config = { data: formData };
		const currentPage = searchParams.get('page');
		console.log(currentPage);
		if (stage) {
			dispatch(
				putCourse(id, config, stage === 2 ? 'image' : 'fields')
			).then(() => {
				setClickCompleted(true);
			});
		} else {
			dispatch(postCourse(config, currentPage - 1)).then(() => {
				setClickCompleted(true);
			});
		}
		setOpen(false);
	};

	useEffect(() => {
		clickCompleted && !isError && !isLoading && setOpen(false);
	}, [clickCompleted, isError, isLoading]);

	useEffect(() => {
		const closePopup = () => setOpen(false);
		document.body.style.overflowY = 'hidden';
		document.addEventListener('click', closePopup);

		return () => {
			document.removeEventListener('click', closePopup);
			document.body.style.overflowY = 'auto';
		};
	}, []);

	return ReactDOM.createPortal(
		<div className={styles['modal-wrapper']}>
			<div
				className={`${styles['popup']} ${
					step === 2 ? styles.popup_wide : ''
				}`}
				onClick={(e) => {
					setShowDropDown(false);
					e.stopPropagation();
				}}
			>
				<div className={styles['top-block']}>
					<h2 className={styles['title']}>
						{stage ? 'Изменить' : 'Новый курс'}
					</h2>
					<button
						className={styles['cross']}
						onClick={() => setOpen(false)}
					>
						<Cross />
					</button>
				</div>
				{step === 1 && (
					<NewCourse
						onNext={stage ? handleSubmit : handleNext}
						changeData={setCourseData}
						data={courseData}
						showDropDown={showDropDown}
						setShowDropDown={setShowDropDown}
						type={stage}
					/>
				)}
				{step === 2 && (
					<ChooseImgModal
						onNext={handleSubmit}
						onPrev={stage ? () => setOpen(false) : handlePrev}
						changeData={setCourseData}
						data={courseData}
						type={stage}
					/>
				)}
			</div>
		</div>,
		document.body
	);
};

export default WrapperCourseCreator;
