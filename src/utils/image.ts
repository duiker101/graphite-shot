export const drawImageOnCanvas = (image: HTMLImageElement, canvas: HTMLCanvasElement) => {
    const ctx = canvas.getContext("2d");

    if (!ctx) return;

    const w = image.width;
    const h = image.height;

    // apply scaling based on pixel ratio?
    // todo review this
    canvas.width = w / window.devicePixelRatio;
    canvas.height = h / window.devicePixelRatio;

    (ctx as any).mozImageSmoothingEnabled = false;
    (ctx as any).imageSmoothingEnabled = false;

    ctx.drawImage(image, 0, 0, w, h, 0, 0, canvas.width, canvas.height);

}
export const getCanvasColor = (canvas: HTMLCanvasElement): null | string => {
    const ctx = canvas.getContext("2d");
    if (!ctx) return null;

    let {data} = ctx.getImageData(0, 0, canvas.width, canvas.height);
    const colors: { [key: string]: number } = {};

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

    return `rgba(${color})`;
}
