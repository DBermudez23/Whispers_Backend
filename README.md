# 🗣️ Whispers Backend

**Whispers Backend** es una API REST desarrollada con Node.js, Express y MongoDB que permite a los usuarios autenticarse, registrarse y publicar "whispers" (mensajes anónimos). Este proyecto está diseñado para ser consumido por un frontend separado, desplegado por ejemplo en Netlify.

---

## 🚀 Características

- Autenticación con JWT (`/login`, `/signup`)
- CRUD completo de mensajes (`/api/v1/whisper`)
- MongoDB Atlas como base de datos
- Protección de rutas privadas con middlewares
- CORS habilitado para consumo externo
- Tests automatizados con Jest y Supertest
- Despliegue listo con Docker y Railway

---

## 🧪 Test

```bash
npm test
Para ejecutar los tests unitarios con Jest y Supertest. Incluye pruebas de login, registro, y endpoints protegidos.

🛠️ Scripts útiles
bash
Copiar
Editar
npm run lint          # Revisión de estilo de código
npm run lint:fix      # Corrige automáticamente el estilo
npm run infra:start   # Levanta MongoDB con Docker Compose (modo local)
npm run infra:stop    # Detiene los contenedores de Docker
📦 Variables de entorno
Crea un archivo .env con las siguientes claves:

ini
Copiar
Editar
PORT=3000
MONGODB_URI=mongodb+srv://<usuario>:<contraseña>@<cluster>.mongodb.net/?retryWrites=true&w=majority
JWT_SECRET=loquesea_bien_seguro
SALT_ROUNDS=10
🌍 Producción
Este backend está desplegado con Railway, y conectado a MongoDB Atlas.

🔗 API base URL:
https://whispersbackend-production.up.railway.app

📤 Endpoints
Método	Ruta	Autenticación	Descripción
POST	/login	❌	Inicia sesión y retorna JWT
POST	/signup	❌	Registra un nuevo usuario
GET	/api/v1/whisper	✅	Obtiene todos los whispers
POST	/api/v1/whisper	✅	Crea un nuevo whisper
GET	/api/v1/whisper/:id	✅	Obtiene un whisper específico
PUT	/api/v1/whisper/:id	✅	Edita un whisper propio
DELETE	/api/v1/whisper/:id	✅	Elimina un whisper propio

✅ Requiere Authorization: Bearer <token>

🐳 Docker
Este proyecto puede ejecutarse vía Docker:

bash
Copiar
Editar
docker build -t whispers-backend .
docker run -p 3000:3000 whispers-backend
🔐 Seguridad
Hash de contraseñas con bcrypt

Autenticación con jsonwebtoken

Validación de entrada con validator

Variables protegidas con .env y Railway Environments

🌐 Tecnologías
Node.js / Express

MongoDB Atlas

JWT + bcrypt

Jest + Supertest

Docker / Railway

GitHub Actions CI

📁 Estructura
bash
Copiar
Editar
├── stores/         # Lógica de acceso a datos (users, whispers)
├── tests/          # Pruebas automatizadas
├── utils.js        # Funciones auxiliares (JWT, auth)
├── database.js     # Configuración de mongoose
├── server.js       # Rutas y middlewares
├── index.js        # Punto de entrada


📄 Licencia
MIT — Libre para uso educativo y personal.