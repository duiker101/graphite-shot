import React from "react";
import {useDispatch} from "react-redux";
import {setWindowScaling, useSelectedWindow} from "../../store/windows";

export default () => {
	const dispatch = useDispatch();
	const selected = useSelectedWindow();

	const scales = [0.5, 1, 2];

	const onScalingChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
		dispatch(
			setWindowScaling({
				id: selected.id,
				scale: parseFloat(e.target.value),
			})
		);
	};

	return (
		<select
			onChange={onScalingChange}
			tabIndex={-1}
			title={"Image scale"}
			aria-label={"Image scale"}
			value={selected.scaling}>
			{scales.map(s => (
				<option key={s}>{s}</option>
			))}
		</select>
	);
};
