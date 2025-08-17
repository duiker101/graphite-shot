import React from "react";
import styled from "styled-components";
import ColorPicker from "../inputs/ColorPicker";
import DownloadImg from "../../icons/download.svg?react";
import AddImg from "../../icons/add.svg?react";
import DirectionImg from "../../icons/direction.svg?react";
import CogImg from "../../icons/cog.svg?react";
import {toPng} from "html-to-image";
import {saveAs} from "file-saver";
import {useDispatch} from "react-redux";
import {addWindow, useWindows} from "../../store/windows";
import {AppDispatch} from "../../store";
import SelectionToolbar from "./SelectionToolbar";
import Settings from "./Settings";

const Wrapper = styled.div``;

const TopBar = styled.div`
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
		toPng(content)
			.then((dataUrl) => {
				saveAs(dataUrl, "graphite.png");
			})
			.catch((error) => {
				console.error("oops, something went wrong!", error);
			});
	};

	return (
		<Wrapper>
			<TopBar>
				<Pickers>
					<Button>
						<CogImg />
					</Button>
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
							onClick={() => onDirection(!horizontal)}
						>
							<DirectionImg />
						</DirectionButton>
					)}
					<Button onClick={() => dispatch(addWindow())}>
						<AddImg />
					</Button>
					<Divider />
					<SelectionToolbar />
				</Pickers>
				<div>
					<Button onClick={save}>
						<DownloadImg />
					</Button>
				</div>
			</TopBar>
			<Settings />
		</Wrapper>
	);
};
