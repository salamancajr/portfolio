const puppeteer = require('puppeteer')
const expect = require('expect')

describe('Renders a blog list', _ => {
  it('should get two blogs', async () => {
    const browser = await puppeteer.launch({
      headless: true,
      args: ['--no-sandbox']
    })
    const page = await browser.newPage()
    await page.goto('localhost:3000')
    await page.click('a[href="/Blog"]')
    await page.waitFor('.blog-entry')
    const blogs = await page.evaluate(() => Promise.resolve(document.querySelectorAll('.blog-entry').length))
    browser.close()
    expect(blogs).toEqual(2)
  })
})
