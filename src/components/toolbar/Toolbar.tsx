import React from "react";
import styled from "styled-components";
import ColorPicker from "../inputs/ColorPicker";
import downloadImg from "../../icons/download.svg";
import addImg from "../../icons/add.svg";
import directionImg from "../../icons/direction.svg";
import htmlToImage from "html-to-image";
import {saveAs} from "file-saver";
import {useDispatch} from "react-redux";
import {addWindow, useWindows,} from "../../store/windows";
import {AppDispatch} from "../../store";
import SelectionToolbar from "./SelectionToolbar";

const Wrapper = styled.div`
	display: flex;
	justify-content: space-between;
`;

const Pickers = styled.div`
	display: flex;
	align-items: center;
`;

const Divider = styled.div`
	width: 1px;
	height: 10px;
	background: white;
`;

const Button = styled.div`
	border-radius: 2px;
	border: 1px solid white;
	height: 32px;
	width: 32px;
	margin: 5px;
	user-select: none;
	color: white;
	cursor: pointer;
	box-sizing: border-box;
	padding: 3px;
	&:hover {
		background: rgba(200, 200, 200, 0.4);
	}
`;

const DirectionButton = styled(Button)<{horizontal: boolean}>`
	img {
		transition: transform 200ms ease-in-out;
		${({horizontal}) =>
			horizontal &&
			`
			transform: rotate(90deg);
		`}
	}
`;

interface Props {
	bgColor: string;
	onBgColor: (color: string) => void;
	onDirection: (horizontal: boolean) => void;
	horizontal: boolean;
	content: HTMLDivElement | null;
}

export default ({
	bgColor,
	onBgColor,
	content,
	horizontal,
	onDirection,
}: Props) => {
	const dispatch: AppDispatch = useDispatch();
	const windows = useWindows();

	const save = () => {
		if (!content) return;
		htmlToImage
			.toPng(content)
			.then(dataUrl => {
				saveAs(dataUrl, "graphite.png");
			})
			.catch(error => {
				console.error("oops, something went wrong!", error);
			});
	};

	return (
		<Wrapper>
			<Pickers>
				<ColorPicker
					color={bgColor}
					onChange={onBgColor}
					palette={[
						"#3D7BC7",
						"#17826D",
						"#F7EBD1",
						"#DFAC5D",
						"#44B87E",
					]}
				/>

				{Object.entries(windows).length > 1 && (
					<DirectionButton
						horizontal={horizontal}
						onClick={() => onDirection(!horizontal)}>
						<img alt={""} src={directionImg} />
					</DirectionButton>
				)}
				<Button onClick={() => dispatch(addWindow())}>
					<img alt={""} src={addImg} />
				</Button>
				<Divider />
				<SelectionToolbar />
			</Pickers>
			<div>
				<Button onClick={save}>
					<img alt={""} src={downloadImg} />
				</Button>
			</div>
		</Wrapper>
	);
};
