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
} from 'src/constants/articleProps';
import { Select } from 'src/ui/select';
import { SyntheticEvent, useState } from 'react';
import { RadioGroup } from 'src/ui/radio-group';
import { Separator } from 'src/ui/separator';

type ArticleParamsFormProps = {
	isOpen: boolean;
	toggleIsOpenState: Function;
	formParams: typeof defaultArticleState;
	setFormParams: Function;
};

export const ArticleParamsForm = ({
	isOpen,
	toggleIsOpenState,
	formParams,
	setFormParams,
}: ArticleParamsFormProps) => {
	const [changedFormParams, setChangedFormParams] = useState(formParams);
	return (
		<>
			<ArrowButton
				isOpen={isOpen}
				onClick={() => {
					toggleIsOpenState(!isOpen);
				}}
			/>
			<aside
				className={
					isOpen
						? clsx(styles.container, styles.container_open)
						: styles.container
				}>
				<form className={styles.form}>
					<Select
						title={'Шрифт'}
						selected={changedFormParams.fontFamilyOption}
						options={fontFamilyOptions}
						onChange={(e) => {
							setChangedFormParams({
								...changedFormParams,
								fontFamilyOption: e,
							});
						}}
					/>
					<RadioGroup
						title={'Размер шрифта'}
						selected={changedFormParams.fontSizeOption}
						options={fontSizeOptions}
						name={'font-size-radio'}
						onChange={(e) => {
							setChangedFormParams({ ...changedFormParams, fontSizeOption: e });
						}}
					/>
					<Select
						title={'Цвет шрифта'}
						selected={changedFormParams.fontColor}
						options={fontColors}
						onChange={(e) => {
							setChangedFormParams({
								...changedFormParams,
								fontColor: e,
							});
						}}
					/>
					<Separator />
					<Select
						title={'Цвет фона'}
						selected={changedFormParams.backgroundColor}
						options={backgroundColors}
						onChange={(e) => {
							setChangedFormParams({
								...changedFormParams,
								backgroundColor: e,
							});
						}}
					/>
					<Select
						title={'Ширина контента'}
						selected={changedFormParams.contentWidth}
						options={contentWidthArr}
						onChange={(e) => {
							setChangedFormParams({
								...changedFormParams,
								contentWidth: e,
							});
						}}
					/>
					<div className={styles.bottomContainer}>
						<Button
							title='Сбросить'
							htmlType='reset'
							type='clear'
							onClick={(e: SyntheticEvent) => {
								e.preventDefault();
								setFormParams(defaultArticleState);
								setChangedFormParams(defaultArticleState);
							}}
						/>
						<Button
							title='Применить'
							htmlType='submit'
							type='apply'
							onClick={(e: SyntheticEvent) => {
								e.preventDefault();
								setFormParams(changedFormParams);
							}}
						/>
					</div>
				</form>
			</aside>
		</>
	);
};
