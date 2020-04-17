import React, {useState} from "react";
import styled from "styled-components";
import {ChromePicker, ColorResult} from "react-color";

const Wrapper = styled.div`
	position: relative;
`;

const Button = styled.div<{color: string}>`
	background: ${p => p.color};
	border-radius: 2px;
	border: 1px solid white;
	height: 30px;
	width: 30px;
	margin: 5px;
	cursor: pointer;
	&:hover {
		filter: brightness(1.4);
	}
`;

const Popover = styled.div`
	position: absolute;
	z-index: 2;
`;

const Cover = styled.div`
	position: fixed;
	top: 0;
	bottom: 0;
	left: 0;
	right: 0;
`;

const Palette = styled.div`
	display: flex;
	width: 225px;
	background: white;
	padding: 4px 4px;
	box-sizing: border-box;
`;

const Item = styled.div<{color: string}>`
	width: 12px;
	height: 12px;
	background: ${p => p.color};
	border-radius: 2px;
	margin: 4px;
	box-shadow: inset 0px 0px 2px rgba(0, 0, 0, 0.2);
	cursor: pointer;
`;

interface Props {
	onChange: (color: string) => void;
	color: string;
	palette?: string[];
}

export default ({color, onChange, palette}: Props) => {
	const [open, setOpen] = useState(false);

	const onColorChange = (result: ColorResult) => {
		const {r, g, b, a} = result.rgb;
		onChange(`rgba(${r},${g},${b},${a})`);
	};

	return (
		<Wrapper>
			<Button color={color} onClick={() => setOpen(true)} />
			{open && (
				<>
					<Cover onClick={() => setOpen(false)} />
					<Popover>
						<ChromePicker color={color} onChange={onColorChange} />
						{palette && (
							<Palette>
								{palette.map((c, i) => (
									<Item
										onClick={() => onChange(c)}
										color={c}
										key={i}
									/>
								))}
							</Palette>
						)}
					</Popover>
				</>
			)}
		</Wrapper>
	);
};
