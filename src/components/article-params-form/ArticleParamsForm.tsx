import { ArrowButton } from 'src/ui/arrow-button';
import { Button } from 'src/ui/button';

import styles from './ArticleParamsForm.module.scss';
import clsx from 'clsx';
import {
	backgroundColors,
	contentWidthArr,
	defaultArticleState,
	fontColors,
	fontFamilyOptions,
	fontSizeOptions,
	OptionType,
} from 'src/constants/articleProps';
import { Select } from 'src/ui/select';
import { useEffect, useRef, useState } from 'react';
import { RadioGroup } from 'src/ui/radio-group';
import { Separator } from 'src/ui/separator';
import { Text } from 'src/ui/text';

type setFormParamsState = React.Dispatch<
	React.SetStateAction<typeof defaultArticleState>
>; // сеттер стейта настроек отображения статьи

type ArticleParamsFormProps = {
	formParams: typeof defaultArticleState;
	setCurrentArticleParams: setFormParamsState;
};

export const ArticleParamsForm = ({
	formParams,
	setCurrentArticleParams,
}: ArticleParamsFormProps) => {
	const [isOpen, setIsOpenState] = useState(false);
	const [usersFormParams, setUsersFormParams] = useState(formParams);

	function handleSubmitFormParameters(event: React.FormEvent<HTMLFormElement>) {
		event.preventDefault();
		setCurrentArticleParams(usersFormParams);
	}

	function handleResetFormParameters() {
		setCurrentArticleParams(defaultArticleState);
		setUsersFormParams(defaultArticleState);
	}

	const sidebarRef = useRef<HTMLElement | null>(null);

	useEffect(() => {
		const handleClickOutsideSidebar = (event: MouseEvent) => {
			if (
				sidebarRef.current &&
				!sidebarRef.current.contains(event.target as Node) &&
				isOpen
			)
				setIsOpenState(!isOpen);
		};
		if (isOpen)
			document.addEventListener('mousedown', handleClickOutsideSidebar);
		return () => {
			document.removeEventListener('mousedown', handleClickOutsideSidebar);
		};
	}, [isOpen]);

	return (
		<>
			<ArrowButton
				isOpen={isOpen}
				onClick={() => {
					setIsOpenState(!isOpen);
				}}
			/>
			<aside
				className={clsx(styles.container, isOpen && styles.container_open)}
				ref={sidebarRef}>
				<form
					className={styles.form}
					onSubmit={(event) => {
						handleSubmitFormParameters(event);
					}}
					onReset={() => {
						handleResetFormParameters();
					}}>
					<Text as='h2' size={31} weight={800} uppercase>
						Задайте параметры
					</Text>
					<Select
						title={'Шрифт'}
						selected={usersFormParams.fontFamilyOption}
						options={fontFamilyOptions}
						onChange={(option: OptionType) => {
							setUsersFormParams({
								...usersFormParams,
								fontFamilyOption: option,
							});
						}}
					/>
					<RadioGroup
						title={'Размер шрифта'}
						selected={usersFormParams.fontSizeOption}
						options={fontSizeOptions}
						name={'font-size-radio'}
						onChange={(option: OptionType) => {
							setUsersFormParams({
								...usersFormParams,
								fontSizeOption: option,
							});
						}}
					/>
					<Select
						title={'Цвет шрифта'}
						selected={usersFormParams.fontColor}
						options={fontColors}
						onChange={(option: OptionType) => {
							setUsersFormParams({
								...usersFormParams,
								fontColor: option,
							});
						}}
					/>
					<Separator />
					<Select
						title={'Цвет фона'}
						selected={usersFormParams.backgroundColor}
						options={backgroundColors}
						onChange={(option: OptionType) => {
							setUsersFormParams({
								...usersFormParams,
								backgroundColor: option,
							});
						}}
					/>
					<Select
						title={'Ширина контента'}
						selected={usersFormParams.contentWidth}
						options={contentWidthArr}
						onChange={(option: OptionType) => {
							setUsersFormParams({
								...usersFormParams,
								contentWidth: option,
							});
						}}
					/>
					<div className={styles.bottomContainer}>
						<Button title='Сбросить' htmlType='reset' type='clear' />
						<Button title='Применить' htmlType='submit' type='apply' />
					</div>
				</form>
			</aside>
		</>
	);
};
