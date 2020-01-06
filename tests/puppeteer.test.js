const puppeteer = require('puppeteer')
const expect = require('expect')
let browser
beforeEach(async () => {
  browser = await puppeteer.launch({
    headless: true,
    args: ['--no-sandbox']
  })
})

describe('Renders a blog list', _ => {
  it('should get two blogs', async () => {
    const page = await browser.newPage()
    // await page.setUserAgent('Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/68.0.3419.0 Safari/537.36')
    await page.goto('http://localhost:3000')
    await page.click('a[href="/Blog"]')
    await page.waitFor('.blog-entry')
    const blogs = await page.evaluate(() => Promise.resolve(document.querySelectorAll('.blog-entry').length))
    browser.close()
    expect(blogs).toEqual(2)
  })
})
