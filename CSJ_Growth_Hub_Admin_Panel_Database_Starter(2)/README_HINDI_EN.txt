CSJ GROWTH HUB — ADMIN PANEL + DATABASE STARTER
================================================

WHAT THIS PACKAGE CONTAINS
- public/index.html: responsive catalogue website
- public/admin.html: password-protected admin panel
- public/css/style.css: shared responsive styling and theme
- public/js/app.js: public catalogue, search, quantity calculator and WhatsApp enquiry
- public/js/admin.js: admin CRUD forms
- server/server.js: Express API, secure session, SQLite database, image uploads
- package.json: required dependencies
- .env.example: configuration template

IMPORTANT
This is a runnable starter project, not yet deployed to a public domain. It needs Node.js 20+ and server hosting that supports a persistent filesystem. SQLite stores catalogue data in server/data/catalog.sqlite. Do not host it on static-only hosting.

SETUP (Windows)
1. Install Node.js LTS (20 or newer) from https://nodejs.org/
2. Extract this ZIP to a folder, e.g. Desktop\CSJ_Growth_Hub_Admin_Upgrade
3. Open the extracted folder. Copy .env.example to a new file named .env.
4. Create a secure password hash:
   Open Command Prompt in this folder and run:
   npm install
   node -e "const b=require('bcryptjs'); console.log(b.hashSync('PUT_YOUR_STRONG_PASSWORD_HERE',12))"
   Replace PUT_YOUR_STRONG_PASSWORD_HERE with your own strong password, run it, and copy the output hash.
5. Edit .env:
   SESSION_SECRET=replace with a long random string (32+ characters)
   ADMIN_USERNAME=choose your admin username
   ADMIN_PASSWORD_HASH=paste the bcrypt hash from step 4
   Keep the other contact details correct.
6. Start:
   npm start
7. Open http://localhost:3000 in your browser.
8. Open http://localhost:3000/admin.html and sign in with the username and password you chose.

ADMIN PANEL
- Add/edit/delete platforms
- Upload a platform logo (PNG/JPG/WEBP/SVG, max 2 MB)
- Add/edit/delete services
- Set service description, starting price per 100 units, minimum quantity, maximum quantity and unit label
- Save updates into SQLite; public catalogue reads the database automatically
- Deleting a platform deletes its associated services too. Confirm carefully.

PRICES
The seeded catalogue rates are examples only. Change them to your actual prices in Admin before launch. Price calculation is (quantity / 100) × price per 100 units.

COMPANY LOGO
Place your uploaded logo image at public/assets/csj-logo.jpg. If your original file has another extension, either rename it to csj-logo.jpg or update the src in index.html and admin.html.

DEPLOYMENT / PRODUCTION
- Use a Node.js hosting provider with persistent storage and HTTPS.
- Set NODE_ENV=production, SESSION_SECRET, ADMIN_USERNAME and ADMIN_PASSWORD_HASH in the host's environment variables.
- Back up server/data/catalog.sqlite and public/uploads regularly.
- For production, use a persistent session store (the default Express MemoryStore is not intended for production) and add rate limiting / monitoring. The starter intentionally keeps setup approachable, but do not launch a public admin endpoint without these hardening steps.
- This is not a payment gateway or order management system. WhatsApp is opened with a pre-filled enquiry and the customer must press Send.
- Ensure any promoted services comply with each platform's terms. Do not promise guaranteed followers, views, watch time or monetisation.

TROUBLESHOOTING
- "Admin password is not configured": set ADMIN_PASSWORD_HASH in .env and restart.
- "Could not load services": ensure npm start is running and open site via http://localhost:3000 (not by double-clicking index.html).
- If a port is in use, change PORT in .env.
