import React, {useEffect, useRef, useState} from "react";
import styled from "styled-components";
import {useImageColor, usePastedImage} from "./hooks";
import Dropzone from "./Dropzone";
import Toolbar from "./Toolbar";

const Wrapper = styled.div`
	min-width: 400px;
`;

/**
 * This border element is needed so that it will not be saved in the image
 * and the result will not have rounded corners
 */
const Border = styled.div`
	border: 2px solid white;
	border-radius: 4px;
	overflow: hidden;
`;

const Content = styled.div<{bg: string}>`
	margin: auto;
	padding: 10px;
	background: ${p => p.bg};
	padding: 64px;
	box-sizing: border-box;
	//resize: both;
	//overflow: auto;
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
	const contentRef = useRef<HTMLDivElement>(null);

	useEffect(() => {
		if (imageColor) setWindowColor(imageColor);
	}, [imageColor]);

	return (
		<Wrapper>
			<Toolbar
				{...{bgColor, windowColor, imageColor}}
				content={contentRef.current}
				onBgColor={setBgColor}
				onWindowColor={setWindowColor}
			/>

			<Border>
				<Content bg={bgColor} ref={contentRef as any}>
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
						</Dropzone>
					</Window>
				</Content>
			</Border>
		</Wrapper>
	);
};
