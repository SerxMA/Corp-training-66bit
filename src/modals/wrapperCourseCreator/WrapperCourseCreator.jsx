import { useEffect, useState } from 'react';
import ReactDOM from 'react-dom';
import { useDispatch } from 'react-redux';

import { api } from '../../api/index.js';
import { useAuth } from '../../customHooks/useAuth.js';
import { setCourse } from '../../store/actionCreators/courses.js';
import ChooseImgModal from '../chooseImgModal/ChooseImgModal.jsx';
import NewCourse from '../newCourse/NewCourse.jsx';
import Cross from '../Cross.jsx';
import styles from './WrapperCourseCreator.module.css';

const WrapperCourseCreator = ({
	setOpen,
	stage,
	id,
	courseObj,
	setIsCourseChanged,
}) => {
	const dispatch = useDispatch();
	const [step, setStep] = useState(stage ? stage : 1);
	const [courseData, setCourseData] = useState({
		title: courseObj ? courseObj.title : '',
		description: courseObj ? courseObj.description : '',
		tags: courseObj ? courseObj.tags : [],
		file: null,
	});
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

		const tempObj = {
			first: api.courses.postNewCourse,
			second: api.courses.putCourse,
		};
		const config = { data: formData };
		if (stage) config.url = id;
		tempObj[stage ? 'second' : 'first'](config).then((res) => {
			stage
				? setIsCourseChanged(true)
				: dispatch(setCourse({ course: res.data }));
			setOpen(false);
		});
	};

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
				onClick={(e) => e.stopPropagation()}
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
