import { useState } from 'react';
import ReactDOM from 'react-dom';

import Arrow from '../Arrow.jsx';
import Cross from '../Cross.jsx';
import styles from './NewCourse.module.css';

const NewCourse = ({onNext}) => {
	const [description, setDescription] = useState('');
	const [title, setTitle] = useState('');
	const [tag, setTag] = useState('');

	const handleSubmit = () => {
		onNext({ title, description });
	  };

	const MAX_CHARS = {
		description: 360,
		title: 128,
		tag: 50,
	};

	const handleDescriptionChange = (event, maxChars, method) => {
		const input = event.target.value.trimStart().replace('  ', ' ');
		if (input.length <= maxChars) {
			method(input);
		}
	};

	return ReactDOM.createPortal(
		<div className={styles['modal-wrapper']}>
			<div className={styles['popup']}>
				<div className={styles['top-block']}>
					<h2 className={styles['title']}>Новый курс</h2>
					<button className={styles['cross']}>
						<Cross />
					</button>
				</div>
				<div className={styles['describe-block']}>
					<div className={styles['input-box']}>
						<input
							type="text"
							name="title"
							placeholder=""
							className={styles['title-input']}
							value={title}
							onChange={(event) =>
								handleDescriptionChange(
									event,
									MAX_CHARS.title,
									setTitle
								)
							}
							maxLength={MAX_CHARS.title}
						/>
						<span>Название</span>
					</div>
					<div className={styles['tag-box']}>
						<input
							type="text"
                            name="tag"
                            placeholder=""
                            className={styles['tag-input']}
                            value={tag}
                            maxLength={MAX_CHARS.tag}
							onChange={(event) =>
								handleDescriptionChange(
									event,
									MAX_CHARS.tag,
									setTag
								)
							}
                        />
						<span>Тег</span>
					</div>
					<div className={styles['description-box']}>
						<textarea
							placeholder=""
							className={styles['description-area']}
							value={description}
							onChange={(event) =>
								handleDescriptionChange(
									event,
									MAX_CHARS.description,
									setDescription
								)
							}
							maxLength={MAX_CHARS.description}
						></textarea>
						<span>Описание</span>
						<div className={styles['char-counter']}>
							{description.length} / {MAX_CHARS.description}
						</div>
					</div>
				</div>
				<button
					className={`${styles['continue-btn']}
					${
						description.length && title.length
							? styles['btn_success']
							: styles['btn_disabled']
					}`}
					disabled={!(description.length && title.length)}
					onClick={handleSubmit}
				>
					Продолжить
					<Arrow />
				</button>
			</div>
		</div>, document.body
	);
};

export default NewCourse; 