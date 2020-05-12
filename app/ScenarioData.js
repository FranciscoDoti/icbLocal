const HashTable = require(`${process.cwd()}/app/HashTable`);
//const ScenarioData = function (ScenarioName) {
const ScenarioData = function () {
  let that = Object.assign({});
  that.data = new HashTable();

  const storeData = function (key, attribute, value) {
    that.data.setItem(key, attribute, value);
  };

  const getData = function (key, attribute) {
    return that.data.getItem(key, attribute);
  };

  const saveToFile = function (scenarioFileName) {
    // Implement me!!!
  };
  const readFromFile = function (scenarioFileName) {
    //Implement me!!!
  };

  that.storeData = storeData;
  that.set = storeData;
  that.put = storeData;
  that.get = getData;
  that.getData = getData;
  that.saveToFile = saveToFile;
  that.readFromFile = readFromFile;
  return that;
}

module.exports = {ScenarioData};