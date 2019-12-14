const puppeteer = require('puppeteer')
const expect = require('expect')

describe('Renders a blog list', () => {
    it('should get two blogs', async () => {
        const browser = await puppeteer.launch({
            headless: false
        })
        const page = await browser.newPage()
        await page.goto('localhost:3000')
        await page.click('a[href="/Blog"]')
        const blogs = await page.$eval('.blog-body', el => el.childElementCount)
        expect(blogs).toEqual(2)
        browser.close()
    })
})