import React, {useEffect, useMemo, useRef, useState} from "react";
import styled from "styled-components";
import {useImageColor, usePastedImage} from "./hooks";
import ColorPicker from "./ColorPicker";
import Dropzone from "./Dropzone";

const Wrapper = styled.div`
	min-width: 400px;
`;

const Content = styled.div<{bg: string}>`
	border: 2px solid white;
	margin: auto;
	border-radius: 4px;
	padding: 10px;
	background: ${p => p.bg};
	padding: 64px;
	box-sizing: border-box;
	//resize: both;
	//overflow: auto;
`;

const Toolbar = styled.div`
	display: flex;
`;

const Window = styled.div<{bg: string}>`
	background: ${p => p.bg};
	border-radius: 10px;
	box-shadow: 10px 10px 20px rgba(0, 0, 0, 0.4);
	min-height: 100px;
	height: 100%;
	padding: 8px;
	display: flex;
	flex-direction: column;
`;

const Header = styled.div`
	display: flex;
	margin-bottom: 8px;
`;

const Dot = styled.div<{color: string}>`
	background: ${p => p.color};
	width: 12px;
	height: 12px;
	border-radius: 50%;
	margin: 4px;
`;

export default () => {
	const canvas = useRef<HTMLCanvasElement>(null);
	const [image, setImage] = usePastedImage();
	const imageColor = useImageColor(canvas?.current, image ?? null);
	const [bgColor, setBgColor] = useState("cadetblue");
	const [windowColor, setWindowColor] = useState("#263238");

	useEffect(() => {
		if (imageColor) setWindowColor(imageColor);
	}, [imageColor]);

	const windowPalette = useMemo(() => {
		const c = ["#3D7BC7", "#17826D", "#F7EBD1", "#DFAC5D", "#44B87E"];
		if (imageColor) c.unshift(imageColor);
		return c;
	}, [imageColor]);

	return (
		<Wrapper>
			<Toolbar>
				<ColorPicker
					color={bgColor}
					onChange={setBgColor}
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
					onChange={setWindowColor}
					palette={windowPalette}
				/>
			</Toolbar>
			<Content bg={bgColor}>
				<Window bg={windowColor}>
					<Header>
						<Dot color={"#FF6259"} />
						<Dot color={"#FFBF2F"} />
						<Dot color={"#29CE42"} />
					</Header>
					<Dropzone
						hasImage={!!image}
						onImage={image => setImage(image)}>
						<canvas
							ref={canvas}
							style={{display: !!image ? "initial" : "none"}}
						/>
						{/*{image}*/}
					</Dropzone>
				</Window>
			</Content>
		</Wrapper>
	);
};
