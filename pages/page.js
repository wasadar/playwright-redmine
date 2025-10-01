export default class Page {
    constructor(page) {
        this.page = page;
    }

    async open(url) {
        await this.page.goto(url);
    }

    async waitForElement(selector, timeout = 3000) {
        await this.page.waitForSelector(selector, { state: "visible", timeout });
    }

    async getElement(selector) {
        return await this.page.locator(selector);
    }

    async clickOnElement(element) {
        await element.click();
    }

    async clickOnElementByIndex(element, index) {
        await element.nth(index).click();
    }

    async getText(element) {
        return await element.textContent();
    }

    async countElements(elements) {
        return await elements.count();
    }

    async waitForFunction(fn, args = {}, timeout = 3000) {
        await this.page.waitForFunction(fn, args, { timeout });
    }
}