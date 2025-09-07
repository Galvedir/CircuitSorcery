# CircuitSorcery Proxy (Node.js)

This proxy forwards all traffic from port 80 to your React app on port 3000.

## Setup

1. Open a terminal in this `proxy` folder.
2. Run `npm install` to install dependencies.
3. Run `npm start` (as administrator to bind to port 80).

## Notes

- Make sure your React app is running on port 3000.
- You must run this proxy as administrator to use port 80 on Windows.
- Visit `http://<your-host-ip>/` from other devices to access your app without showing the port in the address