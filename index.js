const puppeteer = require("puppeteer");

var fs = require("fs");
var dir = "./screenshots";

if (!fs.existsSync(dir)) {
  fs.mkdirSync(dir);
}

const email = process.env.email || "technodogs1@gmail.com";
const password = process.env.password || "";

const screenshot = async (page, url, image) => {
  await page.setJavaScriptEnabled(false);
  await page.goto(url, {
    waitUntil: "networkidle2"
  });

  return await page.screenshot({ path: `screenshots/${image}.png` });
};

const init = async () => {
  const browser = await puppeteer.launch({ headless: false });
  const page = await browser.newPage();

  await page.setViewport({ width: 1000, height: 800 });
  await page.goto("https://pinterest.com", { waitUntil: "networkidle2" });

  await page.waitFor(1000);

  // Login
  await page.type("input[type='email']", email, {
    delay: 10
  });
  await page.type("input[type='password']", password, { delay: 10 });
  await page.type("input[type='password']", String.fromCharCode(13));

  await page.waitFor(3000);

  await screenshot(
    page,
    "https://www.pinterest.com/search/pins/?q=dogs",
    "server-render-search"
  );

  await screenshot(page, "https://www.pinterest.com/", "server-render-home");

  // await page.waitFor(10000);
  browser.close();
};

init().then(value => {
  console.log(value); // Success!
});
