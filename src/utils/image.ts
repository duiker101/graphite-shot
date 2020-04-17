import Jimp from "jimp";

export const processImage = (imageData: string): Promise<[string, Jimp]> => {
	return Jimp.read(imageData).then(image => {
		const colors: {[key: string]: number} = {};

		for (let x = 0; x < image.getWidth(); x += 2) {
			for (let y = 0; y < image.getHeight(); y += 2) {
				const key = image.getPixelColor(x, y);
				colors[key] = colors[key] + 1 || 1;
			}
		}

		const color = Object.entries(colors).reduce(
			(a, [key, value]) => {
				if (value > a[1]) return [key, value];
				return a;
			},
			["", 0]
		)[0];

		return ["#" + parseInt(color).toString(16), image];
	});
};
