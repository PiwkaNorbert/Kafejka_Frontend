# Kafejka Frontend Deployment Guide

This guide will help you deploy the Kafejka frontend application even if you're not familiar with technical details.

## Emergency Deployment Instructions

### 1. Installing Bun Package Manager

1. Visit https://bun.com/docs/installation and follow the installation instructions for windows
2. Open Powershell and enter this command `powershell -c "irm bun.sh/install.ps1|iex`
3. Add Bun to your system:
   - Open the Powershell terminal as Administrator
   - Copy and paste this command:
     `[System.Environment]::SetEnvironmentVariable("Path",
 [System.Environment]::GetEnvironmentVariable("Path", "User") + ";$env:USERPROFILE\.bun\bin",
 [System.EnvironmentVariableTarget]::User)
 `
   - After running the command, restart your terminal and test with bun --version

### 2. Setting Up Environment Variables

1. In the project folder, find the file named `.env.example`
2. Make a copy of this file and rename it to `.env.local`

### 3. Configuring IP Addresses and Ports

1. Open the file `src/constants.ts` with Notepad
2. Look for these two important IP addresses at the top of the file:
   ```typescript
   export const IP_POWROZNICZA = 'http://192.168.200.40'
   export const IP_PRZEKIEROWANIE = 'http://192.168.200.37'
   ```
3. Update these values:
   - `IP_POWROZNICZA`: This should be your backend server's IP address
     Example: `"http://192.168.200.40"`
   - `IP_PRZEKIEROWANIE`: This should be the IP address that the facilities will connect from
     IMPORTANT: Some features will be hidden or shown based on this IP address
4. Save the file after making your changes

5. **For Multiple Backend Ports**:
   - Open the file `src/fetch.ts` with Notepad
   - Look for lines that contain port numbers like `:8080`
   - Example:
     ```typescript
     const url = `${IP_POWROZNICZA}:8080/get-groups/`
     ```
   - Update each port number as needed for your different backend services
   - Make sure each endpoint is pointing to the correct port for that specific service

### 4. Building the Application

1. Open Command Prompt
2. Navigate to the project folder (where you see package.json)
3. Run these commands one by one:
   ```
   bun install
   bun run build
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
6. Restart Nginx:
   - Open Command Prompt as Administrator
   - Navigate to your Nginx folder
   - Run: `nginx -s reload`

### Troubleshooting

If you encounter any issues:

1. Make sure Bun is properly installed by typing `bun --version` in Command Prompt
2. Ensure all environment variables in `.env.local` are correctly set
3. Verify that the IP addresses in `constants.ts` are correct
4. Check that all port numbers in `fetch.ts` are correctly configured
5. Check if port 3000 is not being used by another application
6. Verify that Nginx is running by opening http://localhost:3000 in your web browser

For additional help, please contact the development team.

---

## Developer Information

This project is built with:

- React 19
- TypeScript
- Vite
- Tailwind CSS

For development purposes, you can run the project using:

```bash
bun install
bun run dev
```
