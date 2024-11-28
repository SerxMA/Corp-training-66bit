import { useEffect, useState } from 'react';
import ReactDOM from 'react-dom';

import Cross from '../Cross.jsx';
import styles from './NewTask.module.css';

const MAX_CHARS = {
	question: 50,
	answer: 50,
};

const NewTask = ({ setOpen, type }) => {
	const [question, setQuestion] = useState('');
	const [answer, setAnswer] = useState('');
	const [pointCorrect, setPointCorrect] = useState(0);
	const [attemptsTest, setAttemptsTest] = useState(1);

	const titleContent =
		type === 'one'
			? 'Задание с кратким ответом'
			: type === 'multi'
			? 'Задание в свободной форме'
			: 'Неверный ТИП!';

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
				className={styles['popup']}
				onClick={(e) => e.stopPropagation()}
			>
				<div className={styles['top-block']}>
					<h2 className={styles['title']}>{titleContent}</h2>
					<button
						className={styles['cross']}
						onClick={() => setOpen(false)}
					>
						<Cross />
					</button>
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
								onChange={(e) =>
									setPointCorrect(e.target.value)
								}
							/>
							<span>Баллов за верный ответ</span>
						</div>
						<div className={styles['attempts-test-box']}>
							<input
								type="number"
								placeholder=""
								className={styles['number-input']}
								value={attemptsTest}
								onChange={(e) =>
									setAttemptsTest(e.target.value)
								}
							/>
							<span>Попыток на тест</span>
						</div>
					</div>
				</div>
				<button
					className={`${styles['btn']}
					${
						question &&
						(type === 'multi' || answer) &&
						pointCorrect >= 0 &&
						attemptsTest >= 1
							? styles['btn_success']
							: styles['btn_disabled']
					}`}
					disabled={
						!(
							question &&
							(type === 'multi' || answer) &&
							pointCorrect >= 0 &&
							attemptsTest >= 1
						)
					}
				>
					Готово
				</button>
			</div>
		</div>,
		document.body
	);
};

export default NewTask;
