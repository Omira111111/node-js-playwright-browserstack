var fs = require('fs');
const { exec } = require('child_process');
const fsPromises = require('fs/promises');
const { expect } = require("@playwright/test");
const { name } = require('../playwright.config');

module.exports = {

  Compare: async function (testInfo, page, locator) {
    var name = testInfo.project.name;
    var deviceName = "";
    if (name.includes("browserstack")) {
      let combination = name.split(/@browserstack/)[0];
      let [browerCaps, osCaps] = combination.split(/:/);
      let [browser, device] = browerCaps.split(/@/);
      deviceName = device.replace(/\s/g, "");
    }
    else {
      deviceName = testInfo.project.name;
    }
    const baselinePath = `baselines/BL_${testInfo.title}-${deviceName}.png`;
    const screenshotPath = `screenshots/${testInfo.title}-${deviceName}.png`;
    if (locator) {
      await page.locator(locator).screenshot({ path: screenshotPath });
    }

    else {
      await page.screenshot({ path: screenshotPath });
    }

    if (!(await fs.existsSync(baselinePath))) {
      var inStr = fs.createReadStream(screenshotPath);
      var outStr = fs.createWriteStream(baselinePath);
      inStr.pipe(outStr);
    }
    var imageName = `${testInfo.title}-${deviceName}`;
    exec(`node.exe helpers/compareImages.js Baselines/BL_${imageName}.png Screenshots/${imageName}.png diff/${imageName}.png report.json`, async (err, stdout, stderr) => {
    });
    await page.evaluate((_) => { },
      `browserstack_executor: ${JSON.stringify({ action: "setSessionName", arguments: { name: testInfo.project.name } })}`);
    await page.waitForTimeout(5000);

    const data = await fsPromises.readFile('report.json');
    const res = JSON.parse(data);

    if (res.diffCount === 0) {
      await page.evaluate((_) => { },
        `browserstack_executor: ${JSON.stringify({ action: "setSessionStatus", arguments: { status: "passed", reason: "Test passed" } })}`);
    }
    else {
      await page.evaluate((_) => { },
        `browserstack_executor: ${JSON.stringify({ action: "setSessionStatus", arguments: { status: "failed", reason: "Test failed" } })}`);
    }

    expect(res.diffCount).toBe(0);

  }










}



