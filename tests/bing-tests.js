// @ts-nocheck
const { test } = require("../fixture.js");
const comparer = require('../helpers/compareResults.js');
const URLGenerator = require('../helpers/URLGenerator.js');
const testUtilites = require('../helpers/testUtilites.js');
var URL = '';

test.beforeEach(async ({ page }) => {
  URL = await URLGenerator.Generate(page);
});

test("BingHamMenu", async ({ page }, testInfo) => {
  var fullURL = URL + "&testhooks=1&mkt=en-US&setmkt=en-US&atlahostname=localhost&bag=VP_VisualSystem.test";
  await page.goto(fullURL);
  await page.waitForLoadState('domcontentloaded');
  await page.locator('#mHamburger').click();

  var rightMenu = '#HBright';
  await comparer.Compare(testInfo, page, rightMenu);
})

test("DefaultChatResponse", async ({ page }, testInfo) => {
  var fullURL = URL + '&mkt=en-US&setmkt=en-US&q=facebook&atlahostname=localhost&acc=1&setvar=ms:0&rb=0&mockimages=1&addfeaturesnoexpansion=nonotifications,nosocialpane,nofab,nofbbadge,nowaitwrap,sydskipwl,sydconvscope,sydconvmode,usecibpill,sydinjectans&testhooks=~1&currentdate=20140501&chatbag=Sydney.DefaultChatResponseData&sendquery=1&convscope=1&codexvar=1&showconv=1&bag=VP_Web.Sydney.BingAI&setflight=&setflight=nofdtbody&setlang=en-us&setflight=-&setflight=userbasedstrategy&corpnet=0';
  await page.goto(fullURL);
  await page.waitForLoadState('domcontentloaded');
  await testUtilites.WaitForMic(page);
  await comparer.Compare(testInfo, page);
})


test("TableBlock", async ({ page }, testInfo) => {
  var fullURL = URL + '&mkt=en-US&setmkt=en-US&q=facebook&atlahostname=localhost&acc=1&setvar=ms:0&rb=0&mockimages=1&addfeaturesnoexpansion=nonotifications,nosocialpane,nofab,nofbbadge,nowaitwrap,sydskipwl,sydconvscope,sydconvmode,usecibpill,sydinjectans&testhooks=~1&currentdate=20140501&chatbag=Sydney.TableBlock&sendquery=1&convscope=1&codexvar=1&showconv=1&bag=VP_Web.Sydney.BingAI&setflight=&setflight=nofdtbody&setlang=en-us&setflight=-&setflight=userbasedstrategy&corpnet=0';
  await page.goto(fullURL);
  await page.waitForLoadState('domcontentloaded');
  await testUtilites.WaitForMic(page);
  await comparer.Compare(testInfo, page);
});

test("ClickOnCopilot", async ({ page }, testInfo) => {
  var fullURL = URL + '&mkt=en-US&setmkt=en-US&q=facebook&atlahostname=localhost&acc=1&setvar=ms:0&rb=0&mockimages=1&addfeaturesnoexpansion=nonotifications,nosocialpane,nofab,nofbbadge,nowaitwrap,sydskipwl,sydconvscope,sydconvmode,usecibpill,sydinjectans&testhooks=1&currentdate=20140501&chatbag=Sydney.DefaultChatResponseData&sendquery=1&convscope=1&codexvar=1&bag=VP_Web.Sydney.BingAI&setflight=&setflight=nofdtbody&setlang=en-us&setflight=-&setflight=userbasedstrategy&corpnet=0';
  await page.goto(fullURL);
  await page.waitForTimeout(20000);
  await page.waitForSelector('#b-scopeListItem-conv');
  await page.locator('#b-scopeListItem-conv').click();
  await testUtilites.WaitForMic(page);
  await comparer.Compare(testInfo, page);
});

