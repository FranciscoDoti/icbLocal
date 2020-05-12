const { Given, When, Then } = require('cucumber');
const { visitURL } = require(`${process.cwd()}/app/driver`);
const _ = require('lodash');
const pages = require(`${process.cwd()}/features/ICBC/pages/.page.js`).pages;
const { icbcLib } = require(`${process.cwd()}/features/ICBC/lib/index.js`);
const { sleep } = require(`${process.cwd()}/app/utils`);
const assert = require('chai');

Given('Abro la pagina de ICBC', async function () {

    this.url = await _.get(this.urls, ['ICBC', this.stack]);
    //let user = this.users[userType];
    await visitURL(this.url);

});
When(/^Busco "(.*)" y compro el producto$/, async function (producto) {
    await icbcLib.buscarProducto(producto);

});

When(/^Inicio sesion con usuario "(.*)" y contraseña "(.*)"$/, async function (usuario, contraseña) {
    await icbcLib.LogIn(usuario, contraseña);

});

When('Acepto las condiciones y voy a la caja', async function () {
    await icbcLib.Caja();

});

When(/^Selecciono "(.*)"$/, async function (TipoTarjeta) {
    await icbcLib.Tarjeta();

});

When('Cargo la siguiente informacion de la tarjeta', async function (dataTable) {
    for (let i = 0; i < dataTable.rows().length; i++) {
        let item = dataTable.hashes()[i];
        await icbcLib.cargarDatosTarjeta(item);

    }
});

When('Selecciono el boton pagar', async function () {
    await icbcLib.Pagar();
});

Then('Verifico que la compra se completo correctamente', async function () {
    await sleep(15000);
    await pages.paginaConfirmacionCompra.assertElementExists('Cartel Transaccion Aceptada');
});

