const reporter = require('cucumber-html-reporter');
const argv = require('minimist')(process.argv.slice(2));
const jsonfile = require('jsonfile');

const reportName = () => {
  let prefix = argv.prefix || '';
  prefix = (prefix !== '') ? `${prefix} ` : '';
  const date = new Date().toISOString().replace(/T/, ' ').replace(/\..+/, '');
  return `${prefix}Cucumber Report`;
};

const options = {
  theme: 'bootstrap',
  jsonFile: `${process.cwd()}/reports/cucumber_report.json`,
  output: `${process.cwd()}/reports/${reportName()}.html`,
  reportSuiteAsScenarios: true,
  launchReport: true,
  metadata: jsonfile.readFileSync(`${process.cwd()}/reports/cucumber_report.json`)[0].metadata,
};

reporter.generate(options);
process.exit();
