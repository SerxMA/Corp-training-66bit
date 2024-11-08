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

const WrapperCourseCreator = ({ setOpen }) => {
	const dispatch = useDispatch();
	const [step, setStep] = useState(1);
	const [courseData, setCourseData] = useState({
		title: '',
		description: '',
		tags: [],
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
		formData.append('title', courseData.title);
		formData.append('description', courseData.description);
		formData.append('authorName', username);
		formData.append('image', courseData.file);
		formData.append(
			'tags',
			JSON.stringify(courseData.tags.map(({ id, ...rest }) => rest))
		);
		api.courses.postNewCourse({ data: formData }).then((res) => {
			dispatch(setCourse({ course: res.data }));
			setOpen(false);
		});
	};

	useEffect(() => {
		document.body.style.overflowY = 'hidden';

		return () => (document.body.style.overflowY = 'auto');
	}, []);

	return ReactDOM.createPortal(
		<div className={styles['modal-wrapper']}>
			<div
				className={`${styles['popup']} ${
					step === 2 ? styles.popup_wide : ''
				}`}
			>
				<div className={styles['top-block']}>
					<h2 className={styles['title']}>Новый курс</h2>
					<button
						className={styles['cross']}
						onClick={() => setOpen(false)}
					>
						<Cross />
					</button>
				</div>
				{step === 1 && (
					<NewCourse
						onNext={handleNext}
						changeData={setCourseData}
						data={courseData}
					/>
				)}
				{step === 2 && (
					<ChooseImgModal
						onNext={handleSubmit}
						onPrev={handlePrev}
						changeData={setCourseData}
						data={courseData}
					/>
				)}
			</div>
		</div>,
		document.body
	);
};

export default WrapperCourseCreator;
