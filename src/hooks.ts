import {Dispatch, SetStateAction, useEffect, useState} from "react";

export const usePastedImage = (): [
	string | undefined,
	Dispatch<SetStateAction<string | undefined>>
] => {
	const [imageData, setImageData] = useState<string>();
	useEffect(() => {
		const listener = (e: Event) => {
			const {clipboardData: data} = e as ClipboardEvent;
			const items = data?.items || [];

			for (let item of items) {
				if (item.type.indexOf("image") === -1) continue;
				const blob = item.getAsFile();
				let URLObj = window.URL || window.webkitURL;
				setImageData(URLObj.createObjectURL(blob));
				return;
			}
		};

		window.addEventListener("paste", listener);
		return () => window.removeEventListener("paste", listener);
	}, []);

	return [imageData, setImageData];
};
