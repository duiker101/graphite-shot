import React from "react";
import styled from "styled-components";
import {useDispatch} from "react-redux";
import {Tooltip} from "react-tippy";
import {ShadowPicker} from "react-shadow-picker";
import {AppDispatch} from "../../store";
import {useSelectedWindow, setWindowShadow} from "../../store/windows";

const Button = styled.div`
	border-radius: 50%;
	border: 1px solid white;
	box-shadow: 1px 1px 3px 0px #000f;
	height: 20px;
	width: 20px;
	margin: 5px;
	user-select: none;
	color: white;
	cursor: pointer;
	box-sizing: border-box;
	padding: 3px;
	&:hover {
		background: rgba(200, 200, 200, 0.1);
		box-shadow: 1px 1px 3px 0px #ffff;
	}
`;

const TooltipBg = styled.div`
	padding: 0.3em;
	background: #2A2A2A;
	border:1px solid white;
`;

export default () => {
	const dispatch: AppDispatch = useDispatch();
	const selection = useSelectedWindow();

	const update = (shadow: string) => {
		dispatch(setWindowShadow({id: selection.id, shadow}));
	};

	return (
		<Tooltip
			trigger="click"
			position={"top-start"}
			interactive
			html={
				<TooltipBg>
					<ShadowPicker onChange={update} value={selection.shadow} />
				</TooltipBg>
			}>
			<Button></Button>
		</Tooltip>
	);
};
