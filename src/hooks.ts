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
				if (item.type.indexOf("image") === -1) continue;
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
