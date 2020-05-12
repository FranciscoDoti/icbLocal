const stepsPath = `${process.cwd()}/features/shared/pages/`;
const { PageObject } = require(`${process.cwd()}/app/PageObject`);

let pages = {
    login: new PageObject('login.json', stepsPath),
};

module.exports ={
    pages
};