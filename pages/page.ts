import { Page as PlaywrightPage, Locator } from 'playwright';

export default class Page {
    protected page: PlaywrightPage;

    constructor(page: PlaywrightPage) {
        this.page = page;
    }

    async open(url: string): Promise<void> {
        await this.page.goto(url);
    }

    async waitForElement(selector: string, timeout: number = 3000): Promise<void> {
        await this.page.waitForSelector(selector, { state: "visible", timeout });
    }

    async getElement(selector: string): Promise<Locator> {
        return this.page.locator(selector);
    }

    async clickOnElement(element: Locator): Promise<void> {
        await element.click();
    }

    async clickOnElementByIndex(element: Locator, index: number): Promise<void> {
        await element.nth(index).click();
    }

    async getText(element: Locator): Promise<string | null> {
        return await element.textContent();
    }

    async countElements(elements: Locator): Promise<number> {
        return await elements.count();
    }

    async waitForFunction(fn: (arg: any) => boolean, args: any = {}, timeout: number = 3000): Promise<void> {
        await this.page.waitForFunction(fn, args, { timeout });
    }
}