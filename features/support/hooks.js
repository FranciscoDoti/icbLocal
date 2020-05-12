var { After, AfterAll } = require('cucumber');
const { closeBrowser, resetBrowser, takeScreenshot } = require(`${process.cwd()}/app/driver`);
const { sleep } = require(`${process.cwd()}/app/utils`);
const { loginAchieveCw } = require(`${process.cwd()}/features/shared/steps/login.js`);

After(async function (scenario) {
  await resetBrowser();
});

AfterAll(async function () {
  await closeBrowser();
});

//***********           this After always needs to be at the bottom of this file           ***********//
After(async function (scenario) {
  if (this.screenshots.toLowerCase().includes('onfail') &&
        scenario.result.status.toLowerCase().includes('fail')) {
    await this.attach(await takeScreenshot(), 'image/png');
  }
});