const fs = require("mz/fs");
const fsPromises = require('fs/promises');

(async () => {
    try {

        var testName = process.argv[2];
        const baselinePath = `baselines/BL_${testName}.png`;
        const screenshotPath = `screenshots/${testName}.png`;

        if (testName) {
            if ((await fs.existsSync(baselinePath))) {
                await fs.promises.unlink(baselinePath);
            }

            if ((await fs.existsSync(screenshotPath))) {
                var inStr = fs.createReadStream(screenshotPath);
                var outStr = fs.createWriteStream(baselinePath);
                inStr.pipe(outStr);
            }
            else {
                console.log('Please run the test first');
            }
        }
        else {
            console.log('Please add test name');
        }

    } catch (e) {
        console.log(e);
    }
})();