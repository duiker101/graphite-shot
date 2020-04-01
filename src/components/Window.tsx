import React, {useEffect, useRef} from "react";
import styled from "styled-components";
import Dropzone from "./Dropzone";
import {usePastedImage} from "../hooks";
import {drawImageOnCanvas, getCanvasColor} from "../utils/image";
import {useWindow} from "../store/windows/hooks";
import {useDispatch} from "react-redux";
import {windowSetColor} from "../store/windows/actions";

const Wrapper = styled.div<{bg: string}>`
	background: ${p => p.bg};
	border-radius: 10px;
	box-shadow: 10px 10px 20px rgba(0, 0, 0, 0.4);
	min-height: 20px;
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

interface Props {
	windowId: string;
}

export default ({windowId}: Props) => {
	const canvas = useRef<HTMLCanvasElement>(null);
	const [image, setImage] = usePastedImage();
	const dispatch = useDispatch();
	const {color: bgColor} = useWindow(windowId);

	useEffect(() => {
		const listener = () => {
			if (!canvas.current || !image) return;
			drawImageOnCanvas(image, canvas.current);
			const color = getCanvasColor(canvas.current);
			color && dispatch(windowSetColor(windowId, color));
		};

		if (!image) return;

		if (image.complete) listener();
		else image.addEventListener("load", listener);

		return () => image.removeEventListener("load", listener);
	}, [image, dispatch, windowId]);

	return (
		<Wrapper bg={bgColor}>
			<Header>
				<Dot color={"#FF6259"} />
				<Dot color={"#FFBF2F"} />
				<Dot color={"#29CE42"} />
			</Header>
			<Dropzone hasImage={!!image} onImage={image => setImage(image)}>
				<canvas
					ref={canvas}
					style={{display: !!image ? "initial" : "none"}}
				/>
			</Dropzone>
		</Wrapper>
	);
};
