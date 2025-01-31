import { useState } from 'react';

import CourseTag from '../courseTag/CourseTag.jsx';
import styles from './CourseCard.module.css';
import CourseCardPopup from '../../modals/courseCardPopup/CourseCardPopup.jsx';

const CourseCard = ({ img, tags, title, description, id, enrolled }) => {
	const [isPopupOpen, setIsPopupOpen] = useState(false);

	const handleClick = (e) => {
		setIsPopupOpen(true);
		e.stopPropagation();
	};

	return (
		<>
			<li className={styles['card']} onClick={handleClick}>
				<img src={img} alt="" className={styles['course-img']} />
				<ul className={styles['tags-list']}>
					{tags &&
						tags.map((tag, index) => (
							<CourseTag key={index} tag={tag} />
						))}
				</ul>
				<h4 className={styles['title']}>{title}</h4>
				<span className={styles['description']}>{description}</span>
			</li>
			{isPopupOpen && (
				<CourseCardPopup
					title={title}
					img={img}
					tag={tags[0]}
					id={id}
					description={description}
					setOpen={setIsPopupOpen}
					enrolled={enrolled}
				/>
			)}
		</>
	);
};

export default CourseCard;
