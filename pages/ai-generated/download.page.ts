import { Locator, Page as PlaywrightPage } from 'playwright';
import MainPage from '../main.page';

const versionTable: string = ".autoscroll tbody tr"; // Table containing versions
const versionDownloadLinks: string = "td a[href*='redmine-']"; // Version download links with pattern "redmine-version-name.file-extension"

export default class DownloadPage extends MainPage {
    constructor(page: PlaywrightPage) {
        super(page);
    }

    async getVersionTable(): Promise<Locator> {
        return await this.getElement(versionTable);
    }

    async getVersionDownloadLinks(): Promise<Locator> {
        return await this.getElement(versionDownloadLinks);
    }

    async clickOnFirstVersionDownloadLink(): Promise<void> {
        const downloadLinks = await this.getVersionDownloadLinks();
        const firstLink = downloadLinks.first();
        await this.clickOnElement(firstLink);
    }

    async clickOnAnyVersionDownloadLink(): Promise<void> {
        const downloadLinks = await this.getVersionDownloadLinks();
        const count = await downloadLinks.count();
        if (count > 0) {
            const randomIndex = Math.floor(Math.random() * count);
            const selectedLink = downloadLinks.nth(randomIndex);
            await this.clickOnElement(selectedLink);
        } else {
            throw new Error('No version download links found');
        }
    }

    async waitForDownloadToStart(): Promise<void> {
        // Wait for download to start by checking for download event
        await this.page.waitForEvent('download', { timeout: 10000 });
    }

    async getDownloadedFileName(): Promise<string | null> {
        return new Promise((resolve) => {
            this.page.once('download', (download) => {
                resolve(download.suggestedFilename());
            });
        });
    }
}
