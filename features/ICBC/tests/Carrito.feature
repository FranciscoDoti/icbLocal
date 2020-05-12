@ICBC
Feature: Pruebas para seleccionar un item en ICBC
  Background: Ingresar a la pagina ICBC
    Given Abro la pagina de ICBC

  Scenario: Buscar producto y comprarlo
    When  Busco "MONITOR 19 LED CX 185H WIDE HDMI (I)" y compro el producto
    And Inicio sesion con usuario "icbcclub06" y contraseña "prueba01"
    And Acepto las condiciones y voy a la caja
    And Selecciono "tarjeta de credito"
    And Cargo la siguiente informacion de la tarjeta
      | NroTarjeta       | FechaVencimiento | Codigo | Nombre       | NroDocumento |
      | 4507990000004905 | 0820             | 123    | Jose Ignacio | 39169244     |
    Then Verifico que la compra se completo correctamente

