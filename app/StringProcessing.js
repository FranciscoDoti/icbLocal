/**
 * http://usejsdoc.org/
 */

const faker = require('faker');
const parseDate = require(`${process.cwd()}/app/DateProcessing`);
const ScenarioData = require(`${process.cwd()}/app/ScenarioData`);
const { log } = require(`${process.cwd()}/app/logger`);
const { loadData, loadLogin } = require(`${process.cwd()}/app/util`);

const EVAL_BEGIN = '<';
const EVAL_END = '>';
const PARAM_BEGIN = '(';
const PARAM_END = ')';

const VARIABLE_PREFIX = '$';
const FUNCTION_PREFIX = '@';

const StringProcessing = function (ScenarioDataInput) {
  let that = {};
  that.ScenarioData = ScenarioDataInput || ScenarioData;

  const getEvalSection = function (inputString, beginString, endString) {
    var begin = beginString || EVAL_BEGIN;
    var end = endString || EVAL_END;

    let firstOccurance = inputString.indexOf(begin);
    if (firstOccurance >= 0) {
      firstOccurance += 1;
    }
    let lastOccurance = inputString.lastIndexOf(end);
    return inputString.slice(firstOccurance, lastOccurance);
  };

  const strEval = function (inputString) {
    let string1 = '';
    let string2 = '';
    let string3 = '';
    let returnString = inputString || '';

    if (returnString.indexOf(EVAL_BEGIN) >= 0 && returnString.indexOf(EVAL_END) > 0) {
      string1 = returnString.slice(0, returnString.indexOf(EVAL_BEGIN));
      string2 = getEvalSection(returnString);
      string3 = returnString.substr(returnString.lastIndexOf(EVAL_BEGIN));

      returnString = string1 + strEval(string2) + string3;
    } else if (inputString.startsWith(VARIABLE_PREFIX)) {
      // return core data variable
      that.ScenarioData.get(inputString.indexOf(1));
      log.debug('retrieving variable: ' + inputString);
    } else {
      if (inputString.startsWith(FUNCTION_PREFIX)) {
        // Get function name
        let functionName;
        if (inputString.indexOf(PARAM_BEGIN) > -1) {
          functionName = inputString.slice(1, inputString.indexOf(PARAM_BEGIN));
        } else {
          functionName = inputString.slice(1);
        }

        // Get parameters
        let parameters = [];
        if (inputString.indexOf(PARAM_BEGIN) > -1) {
          const parameterString = getEvalSection(returnString, PARAM_BEGIN, PARAM_END);
          parameters = parameterString.indexOf(',') > -1 ? parameterString.split(',') : [ parameterString ];
        }
        returnString = functionEval(functionName, parameters);
      }
    }
    return returnString;
  };

  const functionEval = function (functionName, parameters) {
    switch (functionName.trim()) {
      case 'login':
        if (!parameters || parameters.length !== 2) {
          throw new Error('Parameters either don\'t exist, or there is not 2 available.');
        }
        return loadLogin(parameters[0])[parameters[1]];
      case 'date':
        return parseDate.simple(parameters);
      case 'faker.user':
        const fakeName = faker.name.findName();
        return fakeName;
      case 'faker.lorem.word':
        const fakeWord = faker.lorem.word();
        return fakeWord;
      case 'faker.lorem.paragraph':
        const fakeParagraph = faker.lorem.paragraph();
        return fakeParagraph;
      case 'faker.email':
        const fakeEmail = faker.internet.email();
        return fakeEmail;
      case 'faker.card':
        const fakeCard = faker.helpers.createCard();
        return fakeCard;
      case 'rnd':
      case 'randomInt':
        if (parameters && parameters.length === 2) {
          return faker.random.number({min: parseInt(parameters[0]), max: parseInt(parameters[1])});
        } else if (parameters && parameters.length === 1) {
          return faker.random.number({max: parseInt(parameters[0])});
        } else {
          return faker.random.number({min: 50, max: 100000});
        }
      case 'data':
        if (parameters.length !== 2) {
          throw new Error('Must have 2 parameters for @data funciton');
        }
        const dataFileName = parameters[0];
        const dataJson = loadData(dataFileName);
        if (!dataJson) {
          throw new Error(`No Data file found for ${dataFileName}`);
        }
        const value = dataJson[parameters[1]];
        return value;
      default:
        return '';
    }
  }
  that.strEval = strEval;

  return that;
};
module.exports = StringProcessing;
