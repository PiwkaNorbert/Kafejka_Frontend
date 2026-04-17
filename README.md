# Kafejka Frontend Deployment Guide

This guide will help you deploy the Kafejka frontend application even if you're not familiar with technical details.

## Emergency Deployment Instructions

### 1. Installing Node.js and pnpm

1. Install Node.js LTS from https://nodejs.org/en/download
2. After installation, open Command Prompt or PowerShell and verify:
   - `node --version`
   - `npm --version`
3. Install pnpm globally:
   - `npm install -g pnpm`
4. Verify pnpm installation:
   - `pnpm --version`

### 2. Setting Up Environment Variables

1. In the project folder, find the file named `.env.example`
2. Make a copy of this file and rename it to `.env.local`

### 3. Configuring IP Addresses and Ports

1. Open the file `src/constants.ts` with Notepad
2. Look for these important network settings at the top of the file:
   ```typescript
   export const BASE_IP = 'http://192.168.200.40'
   export const IP_PRZEKIEROWANIE = 'http://192.168.200.37'
   ```
3. Update these values:
   - `BASE_IP`: This should be your backend server's IP address
     Example: `"http://192.168.200.40"`
   - `IP_PRZEKIEROWANIE`: This should be the IP address that the facilities will connect from
     IMPORTANT: Some features will be hidden or shown based on this IP address
4. Save the file after making your changes

5. **For Multiple Backend Ports**:
   - Open the file `src/constants.ts` with Notepad
   - Find the `PORTS` object:
     ```typescript
     export const PORTS = {
       KAFEJKA: '8005',
       TASKER: '8080',
       EBOOKI: '8081',
       WS: '8888',
     }
     ```
   - Update the port values in this one place as needed
   - The application URLs are built from these constants, so you do not need to edit ports in `src/fetch.ts`

### 4. Building the Application

1. Open Command Prompt
2. Navigate to the project folder (where you see package.json)
3. Run these commands one by one:
   ```
   pnpm install
   pnpm build
   ```
4. Wait until the build process completes
5. You'll find a new folder called `dist` containing the built application

### 5. Deploying to Nginx

1. Install Nginx if you haven't already (download from http://nginx.org/en/download.html)
2. Navigate to your Nginx installation folder
3. Go to the `html` folder
4. Delete everything in this folder
5. Copy everything from your project's `dist` folder into the Nginx `html` folder

### 6. Configuring Nginx

1. Go to your Nginx installation folder `/etc/nginx/sites-available`
2. Find and open `.conf` with Notepad
3. Find the section that starts with `server {`
4. Replace or add these lines:

   ```nginx

      server {
          listen 3000;
          listen [::]:3000;

          location / {
              root /var/www/kafejka/html;
              try_files $uri /index.html;
          }

          location ~ /\.ht {
              deny all;
          }
      }

   ```

5. Save the file
6. Reload Nginx:
   - Open Command Prompt as Administrator
   - Navigate to your Nginx folder
   - Run: `nginx -s reload`
   - Use reload when you change Nginx configuration (`.conf`)
   - If you only replaced files in `dist`, reload is usually not required, but it is safe to run

### Troubleshooting

If you encounter any issues:

1. Make sure Node.js and pnpm are properly installed by typing `node --version` and `pnpm --version`
2. Ensure all environment variables in `.env.local` are correctly set
3. Verify that the IP addresses in `constants.ts` are correct
4. Check that all port numbers in `src/constants.ts` (`PORTS`) are correctly configured
5. Check if port 3000 is not being used by another application
6. Verify that Nginx is running by opening http://localhost:3000 in your web browser

For additional help, please contact the development team.

---

## Developer Information

This project is built with:

- Node.js
- pnpm
- React 19
- TypeScript
- Vite
- Tailwind CSS

For development purposes, you can run the project using:

```bash
pnpm install
pnpm dev
```

Additional useful commands:

```bash
pnpm lint
pnpm lint:fix
pnpm format:check
pnpm format
pnpm preview
```

## Handover Notes (Important if someone new takes over)

### System Architecture and Dependencies

- This frontend depends on multiple backend services, not one API.
- Main host and service ports are configured in `src/constants.ts`.
- Current service groups:
  - `KAFEJKA` (main service)
  - `TASKER`
  - `EBOOKI`
  - `WS` (WebSocket)
- If one backend service is down, only related features may fail while others still work.

### Configuration Model (What is actually used)

- Runtime network configuration is currently code-based in `src/constants.ts`.
- The `.env.example` file exists, but current app behaviour is primarily driven by constants.
- When moving to a new environment, first update `BASE_IP`, `IP_PRZEKIEROWANIE`, and `PORTS`.
- If you change constants, rebuild and redeploy the frontend (`pnpm build` and copy `dist`).

### Deployment Modes and Feature Visibility

- Some UI features are hidden or restricted based on hostname/IP checks.
- This logic is used in places like:
  - `src/App.tsx`
  - `src/components/Header.tsx`
  - `src/components/kafejka/ComputerAdd.tsx`
  - `src/pages/LegimiCodes.tsx`
- If features are unexpectedly missing, check hostname/IP conditions first.

### Routing and Branch Context (`filia`)

- Main routes use `/:curFilia/...` path structure (example: `/centrum/informacje`).
- The app stores `curFilia` and `navTitle` in `localStorage` to restore last view.
- Wrong or missing `curFilia` in URL can cause redirects or wrong context.

### Data Refresh Model

- Computer data is live via WebSocket (`src/hooks/useWebSocket.ts`).
- Other views use HTTP queries with refetch intervals.
- WebSocket endpoint format is:
  - `ws://<IP_WS without http>/ws/panel/{filia}`
- If live computer statuses stop updating, check WS service and port first.

### API and Backend Contract Awareness

- Frontend endpoint usage is spread across:
  - `src/fetch.ts`
  - `src/mutations.ts`
  - page-specific files (for example `src/pages/LegimiCodes.tsx`)
- Before changing backend routes, search these files and update all affected calls.
- A backend route/shape change may fail in UI without a compile-time error.

### Toolchain Policy

- Package manager: `pnpm`
- Runtime: Node.js LTS
- Build tool: Vite
- Scripts are now Bun-free (`vite` directly), so Bun is not required anymore.
- There is currently no lockfile committed. For reproducible installs, consider adding `pnpm-lock.yaml`.

### Security and Access Assumptions

- Frontend does not currently show a strong client-side auth/token flow for API calls.
- Access control appears to rely on internal network setup and backend rules.
- Treat this app as internal/trusted-network software unless auth is explicitly added.

### Quick Incident Checklist

If something breaks in production, check in this order:

1. `node --version` and `pnpm --version`
2. Correct `BASE_IP`, `IP_PRZEKIEROWANIE`, and `PORTS` in `src/constants.ts`
3. Backend services reachable on configured ports
4. WebSocket connectivity (`WS` service)
5. `pnpm build` success and latest `dist` deployed
6. Nginx config syntax and service status
7. Run `nginx -s reload` if `.conf` changed
