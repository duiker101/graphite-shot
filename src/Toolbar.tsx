import React, {useMemo} from "react";
import styled from "styled-components";
import ColorPicker from "./ColorPicker";
import downloadImg from "./icons/download.svg";
import htmlToImage from "html-to-image";
import {saveAs} from "file-saver";

const Wrapper = styled.div`
	display: flex;
	justify-content: space-between;
`;

const Pickers = styled.div`
	display: flex;
`;

const Button = styled.div`
	border-radius: 2px;
	border: 1px solid white;
	height: 30px;
	width: 30px;
	margin: 5px;
	color: white;
	cursor: pointer;
	box-sizing: border-box;
	padding: 1px;
	&:hover {
		background: rgba(200, 200, 200, 0.4);
	}
`;

interface Props {
	bgColor: string;
	onBgColor: (color: string) => void;
	windowColor: string;
	onWindowColor: (color: string) => void;
	imageColor: string | null;
	content: HTMLDivElement | null;
}

export default ({
	bgColor,
	onBgColor,
	windowColor,
	onWindowColor,
	imageColor,
	content,
}: Props) => {
	const save = () => {
		if (!content) return;
		htmlToImage
			.toPng(content)
			.then(dataUrl => {
				console.log(dataUrl);
				saveAs(dataUrl, "graphite.png");
			})
			.catch(error => {
				console.error("oops, something went wrong!", error);
			});
	};

	const windowPalette = useMemo(() => {
		const c = ["#3D7BC7", "#17826D", "#F7EBD1", "#DFAC5D", "#44B87E"];
		if (imageColor) c.unshift(imageColor);
		return c;
	}, [imageColor]);

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
				<ColorPicker
					color={windowColor}
					onChange={onWindowColor}
					palette={windowPalette}
				/>
			</Pickers>
			{content && (
				<Button onClick={save}>
					<img src={downloadImg} />
				</Button>
			)}
		</Wrapper>
	);
};
