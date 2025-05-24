Estructura proyecto

/botica-inventario
├── backend
│   ├── controllers
│   ├── models
│   ├── routes
│   ├── config
│   └── server.js
├── frontend
│   ├── src
│   │   ├── components
│   │   ├── pages
│   │   ├── services (API calls)
│   │   ├── App.js
│   │   └── index.js
├── .env
├── package.json
└── README.md

Estructura backend

/backend
├── controllers
│   ├── productController.js
│   └── saleController.js
├── models
│   ├── index.js
│   ├── product.js
│   └── sale.js
├── routes
│   ├── productRoutes.js
│   └── saleRoutes.js
├── config
│   └── database.js
├── .env
├── server.js
└── package.json


Pasos backend

cd ruta/donde/quieres/el/proyecto
mkdir backend
cd backend
npm init -y
npm install express mysql2 sequelize cors dotenv
npm install --save-dev nodemon

npx nodemon server.js

Estructura frontend

/src
├── components
│   ├── ProductList.js
│   └── ProductForm.js
├── pages
│   ├── ProductsPage.js
│   └── SalesPage.js
├── services
│   └── api.js
├── App.js
└── index.js

Pasos frontend

npx create-react-app frontend
cd frontend

npm install axios react-router-dom

npm start
