import React, {useRef, useState} from "react";
import styled from "styled-components";
import Toolbar from "./components/toolbar/Toolbar";
import Window from "./components/Window";
import {useWindows} from "./store/windows";

const Wrapper = styled.div`
	min-width: 200px;
`;

/**
 * This border element is needed so that it will not be saved in the image
 * and the result will not have rounded corners
 */
const Border = styled.div`
	border: 2px solid white;
	border-radius: 4px;
`;

const Content = styled.div<{bg: string; horizontal: boolean}>`
	margin: auto;
	padding: 10px;
	background: ${p => p.bg};
	padding: 64px;
	display: grid;
	grid-auto-flow: ${({horizontal}) => (horizontal ? "column" : "row")};
	grid-gap: 64px;
	align-items: center;
	justify-items: center;
`;

export default () => {
	const [bgColor, setBgColor] = useState("cadetblue");
	const contentRef = useRef<HTMLDivElement>(null);
	const windows = useWindows();
	const [horizontal, setIsHorizontal] = useState(true);

	return (
		<Wrapper>
			<Toolbar
				onDirection={d => setIsHorizontal(d)}
				horizontal={horizontal}
				bgColor={bgColor}
				onBgColor={setBgColor}
				content={contentRef.current}
			/>

			<Border>
				<Content
					bg={bgColor}
					ref={contentRef as any}
					horizontal={horizontal}>
					{Object.entries(windows).map(([id, w]) => (
						<Window key={id} windowId={id} />
					))}
				</Content>
			</Border>
		</Wrapper>
	);
};
