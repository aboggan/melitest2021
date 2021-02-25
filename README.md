# Mecardolibre frontend test

Para correr este projecto necesitas Node instalado. 
Vas a necesitar dos terminales, una para el servidor y otra para el cliente.
## Instalación
En "/server" ejecutás los comandos:

`npm install`

y luego

`node app.js`

vas a ver un mensaje `escuchando puerto 5000` indicando que ya está funcionando.

En "/client" ejecutas los comandos:

`npm install`

y luego

`npm start`

Cuando termine abrirá el navegador en `http://localhost:3000/`

## Comentarios
Decisiones, problemas y workarounds que encontré durante el desarrollo.

### Diseño

Tiene incluido bootstrap para usar el contenedor y las grillas. 
Me facilitaba mucho el diseño y contemplaba la version mobile al mismo tiempo.
Para los resultados sin precio (servicios, mano de obra, legales, etc) dejé valor en 0. No estaba definido pero podría haber quedado un campo "Consultar" en lugar de precio.

### Workaround
En `/client/src/utils`  hay una función para parsear el precio.
La idea es que muestre el código de la moneda según tu ubicación y el `currency_id` que recibe. 

> Por ejemplo si estás en Argentina y el precio es en pesos argentinos, vas a ver el símbolo "$".

> Mismo caso pero no estás en el Argentina, vas a ver "ARS".

Usando `Intl.NumberFormat` con el `currency_id` "ARS" si el valor tiene exactamente 4 dígitos el separador de miles no aparece. Así que le puse una regex para agregarlo en ese caso.

### Data que no estaba
La api tiene tiene un par de valores que no estaban en el requirimiento pero eran necesarios para que coincida con el diseño.

 - En `api/items/` agregué la provincia como `location`.
 - En `api/items/:id` agregué las categorías del item como `categories`.