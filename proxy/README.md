# CircuitSorcery Proxy

This project sets up an Nginx reverse proxy to forward traffic from port 80 to your React app on port 3000.

## Setup

1. **Install Nginx**  
   Download Nginx for Windows: https://nginx.org/download/  
   Extract it to this folder or ensure `nginx.exe` is in your PATH.

2. **Start the proxy**
   ```
   npm run start
   ```

3. **Stop the proxy**
   ```
   npm run stop
   ```

## Configuration

- Edit `nginx.conf` to change proxy settings as needed.
- By default, all traffic on port 80 is forwarded to `localhost:3000`.

## Notes

- You must run this with administrator privileges to bind to port 80.
- Make sure port 80 is open in your firewall.
