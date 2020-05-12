const stepsPath = `${process.cwd()}/features/ICBC/pages/`;
const { PageObject } = require(`${process.cwd()}/app/PageObject`);

let pages = {
    paginaLogin: new PageObject('paginaLogin.json',stepsPath),
    paginaInicio: new PageObject('paginaInicio.json',stepsPath),
    paginaCompra: new PageObject('paginaCompra.json',stepsPath),
    paginaConfirmacionCompra: new PageObject('paginaConfirmacionCompra.json',stepsPath)
   
};

module.exports ={
    pages
};

