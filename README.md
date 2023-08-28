# Documentación de la API - tech-stack-API
Documentación oficial de la API tech-stack-API, una aplicación desarrollada con Node.js, Express y MySQL que permite a los usuarios registrar y gestionar información sobre tecnologías y recursos relacionados. Esta API incluye funcionalidades de autenticación y autorización basadas en tokens JWT para garantizar la seguridad y la gestión de datos personalizados por usuarios.

# Requisitos Previos
Antes de utilizar esta API, asegúrate de tener instalados Node.js, MySQL y las dependencias del proyecto. Puedes seguir estos pasos:

1. Clona este repositorio desde GitHub:
```ruby
git clone https://github.com/manuimfeld/tech-stack-API.git
```
2. Navega al directorio del proyecto:
```ruby
cd tech-stack-API
```
3. Instala las dependencias:
```ruby
npm install
```
4. Crea una base de datos MySQL y configura las credenciales en el archivo .env:
```ruby
DB_HOST=localhost
DB_USER=root
DB_PASSWORD=PruebasADMIN
DB_NAME=tech_stack_db
PORT=3000
```
# Autenticación y Autorización
La API utiliza tokens JWT para autenticar y autorizar las operaciones protegidas. Para acceder a rutas protegidas, debes incluir un encabezado Authorization con el token de autenticación en cada solicitud.
# Rutas Disponibles
A continuación se detallan las rutas disponibles en la API:

`POST /api/v1/auth/register`: Registra a un nuevo usuario en la plataforma.
Body:
```json
{
  "username": "ejemplo",
  "email": "ejemplo@example.com",
  "password": "contraseña123"
}
```
`POST /api/v1/auth/login`: Inicia sesión y obtiene un token JWT.

Body:
```json
{
  "email": "ejemplo@example.com",
  "password": "contraseña123"
}
```
Response:
```json
{
    "message": "Inicio de sesión exitoso",
    "token": "........."
}
```
`POST /api/v1/technologys`: Agrega información sobre una nueva tecnología.

`Ruta protegida`: Sólo usuarios autenticados.

Body: 
```json
{
  "technology": "Node.js",
  "description": "Plataforma de tiempo de ejecución de JavaScript",
  "difficulty": "Intermedia",
  "type": "Back-end",
  "creation_date": "2009-05-27",
  "official_website": "https://nodejs.org/",
  "img_URL": "https://example.com/nodejs.png"
}
```

`GET /api/v1/technologys`: Obtiene información sobre todas las tecnologías registradas.

`GET /api/v1/technologys/:technologyName`: Obtiene información sobre una tecnología específica por su nombre.

`GET /api/v1/technologys/user/:userId`: Obtiene información sobre las tecnologías registradas por un usuario específico.

`PUT /api/v1/technologys/user/:userId/:technologyId`: Actualiza la información de una tecnología registrada por un usuario.

`Ruta protegida`: Sólo usuarios autenticados y creadores de la tecnología publicada.
```json
{
  "technology": "Java",
  "difficulty": "Difícil"
}
```

`DELETE /api/v1/technologys/:technologyId`: Elimina la información de una tecnología registrada.

`Ruta protegida`: Sólo los usuarios con rol de Admin pueden borrar las tecnologías registradas.

# Uso de la API
1. Asegúrate de que la base de datos esté configurada y ejecutándose correctamente.
2. Ejecuta el servidor:
```javascript
npm start
```
3. Realiza solicitudes a las rutas utilizando herramientas como cURL, Postman o cualquier cliente HTTP.


# Consideraciones Finales
Esta documentación proporciona una visión general de las funcionalidades y rutas principales de la API tech-stack-API. Te recomendamos personalizar y adaptar esta documentación y el código de la API según las necesidades específicas de tu proyecto y las mejores prácticas de desarrollo. Asegúrate de implementar medidas de seguridad sólidas y manejar adecuadamente los errores y excepciones en tu aplicación.
