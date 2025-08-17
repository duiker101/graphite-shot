import React, {useMemo} from "react";
import styled from "styled-components";
import {useDispatch} from "react-redux";
import ColorPicker from "../inputs/ColorPicker";
import {
	removeWindow,
	setWindowColor,
	useSelectedWindow,
	useWindows,
} from "../../store/windows";
import ScalingSelect from "./ScaleSelect";
import CrossImg from "../../icons/cross.svg";
import ShadowSelector from "./ShadowSelector";

const Remove = styled.div`
	border: 1px solid transparent;
	border-radius: 4px;
	height: 20px;
	width: 20px;
	user-select: none;
	color: white;
	cursor: pointer;
	margin-left: 0.8ch;

	svg {
		height: 100%;
		width: 100%;
	}

	&:hover {
		background: rgba(200, 200, 200, 0.4);
	}
`;

export default () => {
	const dispatch = useDispatch();
	const selection = useSelectedWindow();
	const windows = useWindows();

	const palette = useMemo(() => {
		const windowColors = [
			...new Set(Object.entries(windows).map(([id, w]) => w.color)),
		];
		return [
			"#3D7BC7",
			"#17826D",
			"#F7EBD1",
			"#DFAC5D",
			"#44B87E",
			...windowColors,
		];
	}, [windows]);

	return (
		<>
			<ColorPicker
				color={selection.color}
				onChange={(c) =>
					dispatch(setWindowColor({id: selection.id, color: c}))
				}
				palette={palette}
			/>

			<ScalingSelect />
			<ShadowSelector />

			{Object.values(windows).length > 1 && (
				<Remove onClick={() => dispatch(removeWindow(selection.id))}>
					<CrossImg />
				</Remove>
			)}
		</>
	);
};
