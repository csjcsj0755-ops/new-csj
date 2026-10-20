CSJ GROWTH HUB — MULTI-PAGE WEBSITE
===================================

FILES
- index.html       Home page
- categories.html  Platform directory
- category.html    Individual platform listing (query string selects platform)
- services.html    All services, searchable and filterable
- about.html       About Us page
- contact.html     Contact Us page
- css/style.css    Shared styling, responsive layout, light/dark theme
- js/main.js       Shared site logic, platform/service catalogue, order calculator
- assets/csj-logo.jpg   Your uploaded company logo
- assets/*.svg     Platform logo artwork

PREVIEW
Open index.html in a modern browser. For best results, use a local server (VS Code Live Server) so all pages and assets load consistently.

EDIT SERVICES
Open js/main.js and find the SERVICES array near the top. Each service uses:
id, platform, title, icon, description, price, min, max, unit, tag
The price is treated as a sample rate per 100 units. Change it to your actual quote before publishing.
To add a service, copy an object, use a unique id, set platform to an existing platform name, then edit the fields.
To add a platform, add an object to PLATFORMS with name, slug, icon, className and description; add its logo SVG in assets if needed.

CONTACT
WhatsApp: +91 85710 53488
Phone: 8571053488
Email: csjcsj0756@gmail.com
Update WHATSAPP_NUMBER, CONTACT_PHONE and CONTACT_EMAIL in js/main.js when needed.

THEME
Light/dark mode toggle appears in the header. The preference is saved in this browser.

IMPORTANT
This is a static front-end website. It does not have a database, admin panel, payment processing, or server-side order storage. Contact form prepares a WhatsApp message and the visitor sends it manually. Test all service prices and descriptions before going live. Do not promise guaranteed platform metrics; make sure services comply with each platform's terms.
