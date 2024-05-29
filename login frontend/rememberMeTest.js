const puppeteer = require('puppeteer');

async function testRememberMe() {
    const browser = await puppeteer.launch({ headless: false, args: ['--start-maximized'] }); // Launch non-headless browser so you can see the test
    const page = await browser.newPage();
    await page.goto('http://localhost:3000/login'); // Adjust URL based on your local development server

    // Assuming your username and password fields and button have IDs or classes you can hook into
    await page.type('#username', 'yourUsernameHere'); // Adjust selector and input
    await page.type('#password', 'yourPasswordHere'); // Adjust selector and input
    await page.click('#rememberMe'); // Adjust selector for "Remember Me" checkbox
    await page.click('#loginButton'); // Adjust selector for login button

    // Wait for navigation or a specific element that indicates login success
    await page.waitForSelector('#dashboard'); // Adjust to a selector that indicates the user is logged in

    // Check local storage for the token
    const token = await page.evaluate(() => {
        return localStorage.getItem('token'); // Adjust if your token is stored under a different key
    });

    console.log('Token stored:', token); // Output token to console for verification

    // Additional checks or actions can be added here

    await browser.close();
}

testRememberMe().catch(error => {
    console.error('Test failed', error);
    process.exit(1);
});
