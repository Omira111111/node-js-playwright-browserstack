const compareImages = require("resemblejs/compareImages");
const fs = require("mz/fs");
const canvasTemp = require('canvas')
const loadImageTemp = canvasTemp.loadImage;
 
async function getDiff(curr, base, diff, result) {
    const options = {
        output: {
            errorColor: {
                red: 255,
                green: 0,
                blue: 0
            },
            errorType: "flat",
            transparency: 0.05,
            largeImageThreshold: 1200, // skip pixels when image is larger than 1200px
            useCrossOrigin: false,
            outputDiff: true
        },
        scaleToSameSize: false,
        ignore: "antialiasing"
    };
 
    if (!fs.existsSync(base)) {
        console.log("Baseline does not exist");
        return;
    }
 
    var baseImage = await fs.readFile(base);
    var currImage = await fs.readFile(curr);
    const data = await compareImages(
        baseImage,
        currImage,
        options
    );
 
    if (data.rawMisMatchPercentage != 0) {
        await fs.writeFile(diff, data.getBuffer());
    }
 
    var baseData = await loadImageTemp(baseImage);
    var currData = await loadImageTemp(currImage);
    var width = baseData.width > currData.width ? baseData.width : currData.width;
    var height = baseData.height > currData.height ? baseData.height : currData.height;
    var diffCount = (data.rawMisMatchPercentage / 100) * (width * height);
 
    data["diffCount"] = diffCount;
    data["isSimilar"] = data.rawMisMatchPercentage == 0;
    await fs.writeFile(result, JSON.stringify(data));
}
 
(async () => {
    try {
        const currPath = process.argv[2];
        const basePath = process.argv[3];
        const diffPath = process.argv[4];
        const resultPath = process.argv[5];
 
        await getDiff(currPath, basePath, diffPath, resultPath);
    } catch (e) {
        console.log(e);
    }
})();