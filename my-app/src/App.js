import styles from './App.module.css';
import { useState } from 'react';

export const App = () => {
	let [value, setValue] = useState('');
	const [list, setList] = useState([]);
	let [error, setError] = useState('');

	const onInputButtonClick = () => {
		const promptValue = prompt('Введите значение');
		console.log(promptValue);
		if (promptValue.length < 3) {
			setError('Введенное значение должно содержать минимум 3 символа');
		} else {
			setValue(promptValue);
			setError('');
		}
	};

	const errorMessage = <div className={styles.error}>{error} </div>;

	let isValueVaild;
	if (value.length < 3) {
		isValueVaild = false;
	} else {
		isValueVaild = true;
	}

	const onAddButtonClick = () => {
		if (value.length >= 3) {
			const updatedList = [...list, { id: Date.now(), value: value }];
			setList(updatedList);
			value = '';
			error = '';
			console.log(updatedList);
		}
	};

	return (
		<div className={styles.app}>
			<h1 className={styles['page-heading']}>Ввод значения</h1>
			<p className={styles['no-margin-text']}>
				Текущее значение <code>value</code>: "
				<output className={styles['current-value']}>{value}</output>"
			</p>
			{error && errorMessage}
			<div className={styles['buttons-container']}>
				<button className={styles.button} onClick={onInputButtonClick}>
					Ввести новое
				</button>
				<button
					className={styles.button}
					disabled={!isValueVaild}
					onClick={onAddButtonClick}
				>
					Добавить в список
				</button>
			</div>
			<div className={styles['list-container']}>
				<h2 className={styles['list-heading']}>Список:</h2>
				<p className={styles['no-margin-text']}>
					{list.length > 0 ? '' : 'Нет добавленных элементов'}
				</p>
				<ul className={styles.list}>
					{list.map(({ id, value }) => (
						<li className={styles['list-item']} key={id}>
							{value + ' ' + new Date().toLocaleString('ru-RU')}
						</li>
					))}
				</ul>
			</div>
		</div>
	);
};
