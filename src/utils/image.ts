import {intToRGBA, Jimp} from "jimp";

export const processImage = (imageData: string) => {
    return Jimp.read(imageData).then((image) => {
        const colors: { [key: string]: number } = {};

        for (let x = 0; x < image.width; x += 2) {
            for (let y = 0; y < image.height; y += 2) {
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

        const {r, g, b} = intToRGBA(parseInt(color));
        const hex = [r, g, b]
            .map((n) => n.toString(16).padStart(2, "0"))
            .join("");

        return {color: "#" + hex, image};
    });
};
