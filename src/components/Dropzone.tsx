import React, {PropsWithChildren, useCallback} from "react";
import styled from "styled-components";
import {useDropzone} from "react-dropzone";

const Wrapper = styled.div`
	position: relative;
	flex-direction: column;
	display: flex;
	flex: 1;
`;

const Placeholder = styled.div`
	border: 1px dashed white;
	border-radius: 4px;
	flex: 1;
	align-items: center;
	justify-content: center;
	display: flex;
	padding: 32px;
`;

const Cover = styled.div`
	position: absolute;
	top: 0;
	bottom: 0;
	left: 0;
	right: 0;
	background: hsla(218, 50%, 50%, 0.5);
`;

interface Props {
	onImage: (image: string) => void;
	hasImage: boolean;
}

export default ({children, onImage, hasImage}: PropsWithChildren<Props>) => {
	const onDrop = useCallback(
		acceptedFiles => {
			for (let file of acceptedFiles) {
				const reader = new FileReader();
				reader.addEventListener(
					"load",
					() => {
						onImage(reader.result as string);
					},
					false
				);
				reader.readAsDataURL(file);
				return;
			}
		},
		[onImage]
	);

	const {getRootProps, getInputProps, isDragActive} = useDropzone({onDrop});

	return (
		<Wrapper {...getRootProps()}>
			<input {...getInputProps()} />
			{children}
			{!hasImage && (
				<Placeholder>Drop or paste an image here.</Placeholder>
			)}
			{isDragActive && <Cover />}
		</Wrapper>
	);
};
