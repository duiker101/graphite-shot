import React, {useEffect, useState} from "react";
import styled from "styled-components";
import Dropzone from "./Dropzone";
import {usePastedImage} from "../hooks";
import {useDispatch} from "react-redux";
import {processImage} from "../utils/image";
import Jimp from "jimp";
import {
	selectWindow,
	setWindowColor,
	setWindowImage,
	useWindow,
} from "../store/windows";
import {AppDispatch} from "../store";

const Wrapper = styled.div<{bg: string}>`
	background: ${p => p.bg};
	border-radius: 10px;
	box-shadow: 10px 10px 20px rgba(0, 0, 0, 0.4);
	min-height: 20px;
	padding: 8px;
	display: flex;
	flex-direction: column;
	border: 1px solid transparent;
	cursor: pointer;
	&:hover {
		border: 1px solid white;
	}
`;

const Header = styled.div`
	display: flex;
	margin-bottom: 8px;
`;

const Image = styled.img<{width?: number; height?: number}>`
	width: ${p => (p.width ? p.width + "px" : "auto")};
	height: ${p => (p.height ? p.height + "px" : "auto")};
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
	const [srcImage, setSrcImage] = usePastedImage();
	const dispatch: AppDispatch = useDispatch();
	const {color: bgColor, image: imageData, scaling} = useWindow(windowId);
	const [size, setSize] = useState<{
		width?: number;
		height?: number;
	}>({width: undefined, height: undefined});

	useEffect(() => {
		if (!srcImage) return;

		processImage(srcImage).then(([color, image]) => {
			setSize({width: image.getWidth(), height: image.getHeight()});
			image.getBase64Async(Jimp.MIME_PNG).then(base => {
				dispatch(setWindowImage({id: windowId, image: base}));
			});
			dispatch(setWindowColor({id: windowId, color}));
		});
	}, [srcImage, dispatch, windowId]);

	const imgWidth = size.width ? size.width * scaling : undefined;
	const imgHeight = size.height ? size.height * scaling : undefined;

	const selected = () => {
		dispatch(selectWindow(windowId));
	};
	return (
		<Wrapper bg={bgColor} onClick={selected}>
			<Header>
				<Dot color={"#FF6259"} />
				<Dot color={"#FFBF2F"} />
				<Dot color={"#29CE42"} />
			</Header>
			<Dropzone
				hasImage={!!imageData}
				onImage={image => setSrcImage(image)}>
				{imageData && (
					<Image
						src={imageData}
						height={imgHeight}
						width={imgWidth}
					/>
				)}
			</Dropzone>
		</Wrapper>
	);
};
