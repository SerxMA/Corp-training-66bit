import { useEffect, useState } from 'react';
import ReactDOM from 'react-dom';
import { useDispatch, useSelector } from 'react-redux';

import { postContents, putContents } from '../../store/actions/contents.js';
import styles from './NewTask.module.css';
import MainButton from '../../UI/buttons/mainButton/MainButton.jsx';
import ClosePopup from '../../UI/svg/closePopup/ClosePopup.jsx';

const MAX_CHARS = {
	question: 256,
	answer: 128,
};

const NewTask = ({ setOpen, type, position, data }) => {
	const dispatch = useDispatch();
	const { isError, isLoading } = useSelector((state) => state.contents);
	const [question, setQuestion] = useState(data ? data.description : '');
	const [answer, setAnswer] = useState(data ? data.answers?.[0].answer : '');
	const [pointCorrect, setPointCorrect] = useState(data ? data.score : 0);
	const [attemptsTest, setAttemptsTest] = useState(
		data ? data.countAttempts : 1
	);
	const [clickCompleted, setClickCompleted] = useState(false); // пока будет так

	const titleContent =
		type === 'one'
			? 'Задание с кратким ответом'
			: type === 'multi'
			? 'Задание в свободной форме'
			: 'Неверный ТИП!';

	const handleSubmit = () => {
		const content = {
			title: titleContent,
			position: position,
			type: type === 'one' ? 'DETAILED_ANSWER' : 'FREEFORM_ANSWER',
			description: question,
			score: pointCorrect,
		};
		if (type === 'one') {
			content.countAttempts = attemptsTest;
			content.answers = [{ answer, isRight: true }];
		}
		const contentBlob = new Blob([JSON.stringify(content)], {
			type: 'application/json; charset=UTF-8',
		});

		const formData = new FormData();
		formData.append('content', contentBlob);

		const topicId =
			window.location.pathname.match(/\/course\/\d+\/(\d+)/)[1];
		const config = {
			data: formData,
		};
		if (data) {
			config.url = data.id;
			dispatch(putContents(topicId, config)).then(() => {
				setClickCompleted(true);
			});
		} else {
			config.params = { topicId: topicId };
			dispatch(postContents(topicId, config)).then(() => {
				setClickCompleted(true);
			});
		}
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
					<h2 className={styles['title']}>{titleContent}</h2>
					<ClosePopup onClick={() => setOpen(false)} />
				</div>
				<div className={styles['describe-block']}>
					<div className={styles['question-block']}>
						<span>Вопрос</span>
						<div className={styles['question-box']}>
							<input
								type="text"
								placeholder=""
								className={styles['title-input']}
								value={question}
								onChange={(e) =>
									e.target.value.length <=
										MAX_CHARS.question &&
									setQuestion(
										e.target.value
											.trimStart()
											.replace('  ', ' ')
									)
								}
								maxLength={MAX_CHARS.question}
							/>
							<span>Задайте вопрос</span>
						</div>
					</div>
					{type === 'one' && (
						<div className={styles['question-block']}>
							<span>Правильный ответ</span>
							<div className={styles['answer-box']}>
								<input
									type="text"
									placeholder=""
									className={styles['answer-input']}
									value={answer}
									onChange={(e) =>
										e.target.value.length <=
											MAX_CHARS.answer &&
										setAnswer(
											e.target.value
												.trimStart()
												.replace('  ', ' ')
										)
									}
									maxLength={MAX_CHARS.question}
								/>
								<span>Введите ответ</span>
							</div>
						</div>
					)}
					<div className={styles['question-block']}>
						<span>Настройки</span>
						<div className={styles['correct-answer-box']}>
							<input
								type="number"
								placeholder=""
								className={styles['number-input']}
								value={pointCorrect}
								max={2000000000}
								onKeyDown={(e) => {
									if (
										['-', '+', 'e', 'E', '.', ','].includes(
											e.key
										)
									) {
										e.preventDefault();
									}
								}}
								onPaste={(e) => {
									const pasteData =
										e.clipboardData.getData('text');
									if (
										isNaN(pasteData) ||
										+pasteData >= 2000000000
									) {
										e.preventDefault();
									}
								}}
								onChange={(e) =>
									e.nativeEvent.data !== '.' &&
									e.nativeEvent.data !== ',' &&
									e.nativeEvent.data !== '-' &&
									e.nativeEvent.data !== '+' &&
									e.nativeEvent.data !== 'e' &&
									e.target.value < 2000000000 &&
									setPointCorrect(e.target.value)
								}
							/>
							<span>Баллов за верный ответ</span>
						</div>
						{type === 'one' && (
							<div className={styles['attempts-test-box']}>
								<input
									type="number"
									placeholder=""
									className={styles['number-input']}
									value={attemptsTest}
									max={2000000000}
									onKeyDown={(e) => {
										if (
											[
												'-',
												'+',
												'e',
												'E',
												'.',
												',',
											].includes(e.key)
										) {
											e.preventDefault();
										}
									}}
									onPaste={(e) => {
										const pasteData =
											e.clipboardData.getData('text');
										if (
											isNaN(pasteData) ||
											+pasteData >= 2000000000
										) {
											e.preventDefault();
										}
									}}
									onChange={(e) =>
										e.nativeEvent.data !== '.' &&
										e.nativeEvent.data !== ',' &&
										e.nativeEvent.data !== '-' &&
										e.nativeEvent.data !== '+' &&
										e.nativeEvent.data !== 'e' &&
										e.target.value < 2000000000 &&
										setAttemptsTest(e.target.value)
									}
								/>
								<span>Попыток на тест</span>
							</div>
						)}
					</div>
				</div>
				<div className={styles['btn-wrapper']}>
					<MainButton
						onClick={handleSubmit}
						type={
							question.length &&
							(type === 'multi' ||
								(answer && attemptsTest >= 1)) &&
							pointCorrect >= 0
								? 'primary'
								: 'disabled'
						}
						disabled={
							!(
								question.length &&
								(type === 'multi' ||
									(answer && attemptsTest >= 1)) &&
								pointCorrect >= 0
							)
						}
					>
						Готово
					</MainButton>
				</div>
			</div>
		</div>,
		document.body
	);
};

export default NewTask;
