const { Given, When } = require('cucumber');
const { visitURL } = require(`${process.cwd()}/app/driver`);
const _ = require('lodash');
const pages = require(`${process.cwd()}/features/shared/pages/.page.js`).pages;

/* Verifies Sapling login */
Given(/^I login to AMS as "(.*)"/, async function (userType) {
  this.url = await _.get(this.urls, ['AMS', this.stack]);
  let user = this.users[userType];
  await visitURL(this.url);
  if (this.environment === 'local') {
    await pages.login.populate('username-local', user.username);
    await pages.login.populate('password-local', user.password);
    await pages.login.click('submit-local')
  } else {
    await pages.login.populate('username', user.username);
    await pages.login.populate('password', user.password);
    await pages.login.click('submit')
  };
});

// This step function was required as browser was retaining the username
// And was causing issue with second time user login in a graphing scenario

Given(/^I login back to AMS again as "(.*)"/, async function (userType) {
  let user = this.users[userType];

  await visitURL(this.url);
  if (this.environment === 'local') {
    await pages.login.populate('password-local', user.password);
    await pages.login.click('submit-local')
  } else {
    await pages.login.populate('password', user.password);
    await pages.login.click('submit')
  };
});

When(/^I go back to sapling page and logout$/, async function () {
  this.url = await _.get(this.urls, ['IBISCMS', this.stack]);
  await mathPages.saplingLearning.switchToTab('Sapling');
  await visitURL(this.url);
  await mathPages.saplingLearning.click('RaptorAdmin');
  await mathPages.saplingLearning.click('logout');
});

async function loginAchieveCw (userType, context) {
  let user = context.users[userType];
  await visitURL(context.url);
  await pages.login.waitForElementVisibility('Button', 'SIGN IN');
  await pages.login.click('Button', 'SIGN IN');
  await pages.login.populate('username', user.username);
  await pages.login.populate('password', user.password);
  await pages.login.click('signin');
};

Given(/^I login to Achieve-CW as "(.*)"/, async function(userType){
  this.url = await _.get(this.urls, ['Achieve-CW', this.stack]);
  this.apiserver = await _.get(this.endpoints, ['Achieve-CW', this.stack]);
  await loginAchieveCw(userType, this);
});

When('I sign out of Achieve', async function () {
  await pages.login.scrollElementIntoView('togglerMenu');
  await pages.login.assertElementExists('togglerMenu');
  await pages.login.click('togglerMenu');
  await pages.login.click('signOut');
  await pages.login.waitForElementVisibility('Button', 'SIGN IN');
});

Given(/^navigate to a course having course id "(.*)"$/, async function (courseid) {
  var currentURL = await pages.login.getCurrentURL();
  var courseURL = currentURL + 'course/view.php?id=' + courseid;
  await visitURL(courseURL);
});

Given("navigate to an assessment created before", async function () {
  var currentURL = await pages.login.getCurrentURL();
  var assessmentURL = currentURL + 'mod/flcn/view.php?id=' + this.data.get('assessmentID'); 
  await visitURL(assessmentURL);
});

Given('I login to IBISCMS as {string}', async function (userType) {
  this.url = await _.get(this.urls, ['IBISCMS', this.stack]);
  let user = this.users[userType];

  await visitURL(this.url);
  if (this.environment === 'local') {
    await pages.login.populate('username-local', user.username);
    await pages.login.populate('password-local', user.password);
    await pages.login.click('submit-local')
  } else {
    await pages.login.populate('username', user.username);
    await pages.login.populate('password', user.password);
    await pages.login.click('submit')
  };
});

Given(/^I login to Savi Verification as "(.*)"/, async function (userType) {
  this.url = await _.get(this.urls, ['savi', this.stack]);
  let user = this.users[userType];

  await visitURL(this.url);
  await pages.login.populate('username', user.username);
  await pages.login.populate('password', user.password);
  await pages.login.click('submit')
});

When('I logout IBISCMS', async function () {
  await pages.login.click('User Menu Button');
  await pages.login.click('Logout');
});

module.exports = {
  loginAchieveCw
};
