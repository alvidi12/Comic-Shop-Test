# 🧾 Comic Shop

## 📦 Descripción General del Proyecto
Se implemeta un servicio E-commerce para productos del mundo de los superheroes, con funcionalidades completas para un sitio web aplicando un sistema de compra para un usuario registrado junto a un carrito de compra donde el usuario puede descargar los productos de comics virtuales desde la pagina al finalizar su compra. Funcionalidades para un usuario admin, con el poder de hacer CRUD para los productos y blog de lecturas. Y testeo a la API REST del backend Comic Shop conectada a una base de datos con MongoDB. Desarrollo válido para la asignatura **Desarrollo FullStack II**.

**Repositorio del proyecto**

- **Frontend:**
 https://github.com/alvidi12/Comic-Shop.git
- **Backend:**
https://github.com/alvidi12/Comic-Shop-backend.git


## 🧩 Arquitectura general

> 📝 La estructura del sistema está conformado por 2 microservicios para separar el frontend (visual) con el backend (logica para BD), el que fue desplegado en Render y esta enlazado con una base de datos no relacional en MongoDB Atlas.


```
├── Comic-Shop/📦
│       └── 📂public
│           └── imagenes
│       └── 📂server
│           └── .env
│       └── src
│           └── 📂AdminPages
│               └── paginas del administrador
│           └── 📂components
│               └── componentes navbar y footer
│           └── 📂context
│               └── autentificador de usuario y carrito
│           └── 📂JSFunctions
│               └── funciones de contactanos, login y registro
│           └── 📂pages
│               └── interfaz usuario
│           └── 📂pages-user
│               └── interfaz del administrador y registro usuario
│           └── 📂styles
│               └── archivos .css
│           └── App.js         
└── 
```

```
├── Comic-Shop-Backend/📦
│       └── src
│           └── 📂config
│               └── db.js
│           └── 📂middleware
│               └── authMiddleware.js
│           └── 📂models
│               └── Blog.js
│               └── Product.js
│               └── User.js
│           └── 📂routes
│               └── authRoutes.js
│               └── blogRoutes.js
│               └── productRoutes.js
│           └── server.js
│           └── server.js           
└── 
```

**Tecnologías aplicadas**

- JavaScript
- HTML
- CSS
- MongoDB

**Framework:**

- Visual Studio Code

## 🗄️ Configuración de Bases de Datos

La Base de Datos se realizo con MongoDB Atlas, el cual nos permitio crear un cluster en la nube de manera gratuita que va guardando en tiempo real los datos subidos al microservicio. 

## 📮 Endpoints y Pruebas

## 🧩 Arquitectura

- Framework: Express.js
- Base de datos: MongoDB Atlas
- Autenticación: JWT
- Pruebas: Jest
- Documentación: Swagger


## ✔ Endpoints de Comic Shop
GET BLOGS https://comic-shop-backend.onrender.com/api/blogs
GET PRODUCTOSS https://comic-shop-backend.onrender.com/api/products

## ✔ Endpoints de testeo

EJECUCION PARA SWAGGER UI: npm run dev

##  Backend
BACKEND http://localhost:4000/
##  Swagger
 http://localhost:4000/api-docs

GET /api/productos
POST /api/productos 
PUT /api/productos/:id
DELETE /api/productos/:id
POST /api/auth/login para contraseña incorrecta
POST /api/auth/login

## ✔ Manejo de Errores
El frontend debe manejar 401, 403 y 500 con avisos adecuados.

## 🧑‍💻 Integrantes del Equipo

| **Nombre**                  | **Rol en el proyecto** |
|-------------------------|-------------------|
| Camila González | Frontend y Backend |
| Andy Villarroel | Frontend y Backend |

## 👥 Colaboración en GitHub

Primero que todo se realizo la creación del repositorio en GitHub y se crearon las ramas `main` que contribuyo principalmete a los Pull Request, las ramas `andy` y `cami` las que trabajaron tanto en el frontend, backend y base de datos.

Como equipo consideramos que la mejor manera de trabajar colaborativamente fue la comunicacion, los que nos ayudo a coordinar commits frecuentemente cada vez que se realizaba avance.

Se realizaron `push` constantes por parte de los colaboradores, para mantener lo más actualizado el repositorio y la rama `master`.

## 📦 Colecciones instaladas
npx create-react-app Comic-Shop
npm install
npm install bootstrap
npm install bootstrap-icons
npm install jspdf

### Ejecucion: 
npm start

## 📦 Colecciones instaladas para ejecución de test
npm install bcryptjs jsonwebtoken
npm install express mongoose cors dotenv bcryptjs jsonwebtoken
npm install nodemon --save-dev

### Ejecucion: 
npm test
