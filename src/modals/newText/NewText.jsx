import { useEffect, useState } from 'react';
import ReactDOM from 'react-dom';
import { useDispatch, useSelector } from 'react-redux';

import { postContents } from '../../store/actions/contents.js';
import { changeText } from '../../helpers/functions/formatText.js';
import Cross from '../Cross.jsx';
import styles from './NewText.module.css';

const MAX_CHARS = {
	title: 180,
	text: 3000,
};

const NewText = ({ setOpen, position }) => {
	const dispatch = useDispatch();
	const { isError, isLoading } = useSelector((state) => state.contents);
	const [title, setTitle] = useState('');
	const [text, setText] = useState('');
	const [clickCompleted, setClickCompleted] = useState(false); // пока будет так

	const handleSubmit = () => {
		const content = {
			title: title,
			position: position,
			type: 'TEXT',
			description: text,
		};
		const contentBlob = new Blob([JSON.stringify(content)], {
			type: 'application/json; charset=UTF-8',
		});
		console.log(content);

		const formData = new FormData();
		formData.append('content', contentBlob);

		const topicId =
			window.location.pathname.match(/\/course\/\d+\/(\d+)/)[1];
		const config = {
			data: formData,
			params: {
				topicId: topicId,
			},
		};
		dispatch(postContents(topicId, config)).then(() => {
			setClickCompleted(true);
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

	useEffect(() => {
		clickCompleted && !isError && !isLoading && setOpen(false);
	}, [clickCompleted, isError, isLoading]);

	return ReactDOM.createPortal(
		<div className={styles['modal-wrapper']}>
			<div
				className={styles['popup']}
				onClick={(e) => e.stopPropagation()}
			>
				<div className={styles['top-block']}>
					<h2 className={styles['title']}>Новый текст</h2>
					<button
						className={styles['cross']}
						onClick={() => setOpen(false)}
					>
						<Cross />
					</button>
				</div>
				<div className={styles['describe-block']}>
					<div className={styles['input-box']}>
						<input
							type="text"
							name="title"
							placeholder=" "
							required
							value={title}
							onChange={(e) =>
								changeText(
									e.target.value,
									MAX_CHARS['title'],
									setTitle
								)
							}
						/>
						<span>Заголовок</span>
					</div>
					<div className={styles['description-box']}>
						<textarea
							placeholder=" "
							className={styles['description-area']}
							required
							value={text}
							onChange={(e) =>
								changeText(
									e.target.value,
									MAX_CHARS['text'],
									setText
								)
							}
						></textarea>
						<span>Текст</span>
						<div className={styles['char-counter']}>
							{text.length} / {MAX_CHARS.text}
						</div>
					</div>
				</div>
				<div className={styles['btn-wrapper']}>
					<button
						className={`${styles.btn} ${
							title.length && text.length
								? styles.btn_success
								: styles.btn_disabled
						}`}
						onClick={handleSubmit}
						disabled={!(title.length && text.length)}
					>
						Готово
					</button>
				</div>
			</div>
		</div>,
		document.body
	);
};

export default NewText;
