# CircuitSorcery

## Project Overview

CircuitSorcery is a full-stack web application with a React frontend, Node.js/Express backend, and MySQL database.  
This guide will help you set up and run the project from scratch.

---

## Folder Structure

```
CircuitSorcery/
  client/      # React frontend
  server/      # Node.js/Express backend
```

---

## Prerequisites

- Node.js (v18+ recommended)
- npm (comes with Node.js)
- MySQL Server
- (Optional) Nginx or Apache for production reverse proxy

---

## 1. Clone the Repository

```sh
git clone https://github.com/yourusername/CircuitSorcery.git
cd CircuitSorcery
```

---

## 2. Set Up the Database

1. **Create a MySQL database:**
   - Example: `circuitsorcery`

2. **Run the SQL schema files:**
   - Open your MySQL client (Workbench, CLI, etc.)
   - Run the SQL files in the `sql/` folder to create tables and seed data:
     ```sh
     mysql -u root -p circuitsorcery < sql/schema.sql
     mysql -u root -p circuitsorcery < sql/seed.sql
     ```

---

## 3. Configure Environment Variables

### **Backend (`server`)**

1. Copy `.env.example` to `.env`:
   ```sh
   cp server/.env.example server/.env
   ```
2. Edit `server/.env` and fill in your actual database credentials and secrets.

### **Frontend (`client`)**

1. Copy `.env.example` to `.env`:
   ```sh
   cp client/.env.example client/.env
   ```
2. Edit `client/.env` and set `REACT_APP_API_BASE_URL` to your backend URL (e.g., `http://localhost:5000` or your domain).

---

## 4. Install Dependencies

### **Backend**
```sh
cd server
npm install
```

### **Frontend**
```sh
cd ../client
npm install
```

---

## 5. Run the Application (Development)

### **Backend**
```sh
npm start
```

### **Frontend**
```sh
npm start
```
- The frontend will run on port 3000 by default.
- The backend will run on port 5000 by default.

---

## 6. Production Setup (Optional)

- Use Nginx or Apache as a reverse proxy to forward traffic from port 80/443 to your frontend/backend.
- See the [proxy/README.md](proxy/README.md) for example Nginx configuration.

---

## 7. Access the App

- **Development:**  
  - Frontend: [http://localhost:3000](http://localhost:3000)
  - Backend API: [http://localhost:5000/api](http://localhost:5000/api)
- **Production:**  
  - Use your domain (e.g., [https://yourdomain.com](https://yourdomain.com))

---

## Troubleshooting

- **Environment variables not loading:**  
  Ensure `.env` files are present and `dotenv` is loaded at the top of your main server file.
- **CORS errors:**  
  Check your backend CORS configuration in `server/app.js`.
- **Database connection issues:**  
  Verify credentials and that MySQL is running and accessible.

---

## Additional Notes

- For HTTPS, use [Let’s Encrypt](https://letsencrypt.org/) for free SSL certificates.
- For reverse proxy, see the example config in `proxy/nginx.conf`.

---

## License

MIT

---

## Need Help?

Open an issue or contact the maintainer.