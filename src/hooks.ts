import {Dispatch, SetStateAction, useEffect, useState} from "react";

export const usePastedImage = (): [
	HTMLImageElement | undefined,
	Dispatch<SetStateAction<HTMLImageElement | undefined>>
] => {
	const [image, setImage] = useState<HTMLImageElement>();
	useEffect(() => {
		const listener = (e: Event) => {
			const {clipboardData: data} = e as ClipboardEvent;
			const items = data?.items || [];

			for (let item of items) {
				if (item.type.indexOf("image") == -1) continue;
				const blob = item.getAsFile();
				let img = new Image();
				let URLObj = window.URL || window.webkitURL;
				img.src = URLObj.createObjectURL(blob);
				setImage(img);
				return;
			}
		};

		window.addEventListener("paste", listener);
		return () => window.removeEventListener("paste", listener);
	}, []);

	return [image, setImage];
};

export const useImageColor = (
	canvas: HTMLCanvasElement | null,
	image: HTMLImageElement | null
) => {
	const [color, setColor] = useState<string | null>(null);
	useEffect(() => {
		if (!image) return;
		image.onload = () => {
			console.log("onload", canvas, image);
			if (!canvas || !image) return;
			let ctx = canvas.getContext("2d");
			if (!ctx) return;

			const w = image.width;
			const h = image.height;

			canvas.width = w;
			canvas.height = h;

			ctx.drawImage(image, 0, 0);

			let {data} = ctx.getImageData(0, 0, w, h);
			const colors: {[key: string]: number} = {};

			for (let i = 0, n = data.length; i < n; i += 4) {
				const key = data.slice(i, i + 4).join(",");
				colors[key] = colors[key] + 1 || 1;
			}
			const color = Object.entries(colors).reduce(
				(a, [key, value]) => {
					if (value > a[1]) return [key, value];
					return a;
				},
				["", 0]
			)[0];

			setColor(`rgba(${color})`);
		};
	}, [image]);
	return color;
};
