import { Locator, Page as PlaywrightPage } from 'playwright';
import Page from './page';

const guideLink: string = "a.wiki-page:has-text(\"Redmine guide\")"; // playwright-specific selector
const overviewLink: string = ".overview";
const downloadLink: string = ".download";
const activityLink: string = ".activity";
const roadmapLink: string = ".roadmap";
const issuesLink: string = ".issues";
const newsLink: string = ".news";
const wikiLink: string = "li .wiki";
const boardsLink: string = ".boards";
const repositoryLink: string = ".repository";
const perPageOpen: string = "span.per-page a:has-text(\""; // playwright-specific selector and openning gap for incerting value
const perPageClose: string = "\")"; // closing gap after incerting value
const tableRow: string = ".autoscroll tbody tr";
const tableHeads: string = "tr th";
const tableFirstRowFirstCell: string = "tbody:has(tr th) tr:nth-child(2) td:nth-child(1)";
const tableFirstRowSecondCell: string = "tbody:has(tr th) tr:nth-child(2) td:nth-child(2)";
const otherReleasesLink: string = "a:has-text(\"older releases\")"; // playwright-specific selector
const header: string = "h1";

export default class MainPage extends Page {
    constructor(page: PlaywrightPage) {
        super(page);
    }

    async open(): Promise<void> {
        await super.open("");
    }

    async getGuideLink(): Promise<Locator> {
        return await this.getElement(guideLink);
    }

    async clickOnGuideLink(): Promise<void> {
        await this.clickOnElement(await this.getGuideLink());
    }

    async getOverviewLink(): Promise<Locator> {
        return await this.getElement(overviewLink);
    }

    async clickOnOverviewLink(): Promise<void> {
        await this.clickOnElement(await this.getOverviewLink());
    }

    async getDownloadLink(): Promise<Locator> {
        return await this.getElement(downloadLink);
    }

    async clickOnDownloadLink(): Promise<void> {
        await this.clickOnElement(await this.getDownloadLink());
    }

    async getActivityLink(): Promise<Locator> {
        return await this.getElement(activityLink);
    }

    async clickOnActivityLink(): Promise<void> {
        await this.clickOnElement(await this.getActivityLink());
    }

    async getRoadmapLink(): Promise<Locator> {
        return await this.getElement(roadmapLink);
    }

    async clickOnRoadmapLink(): Promise<void> {
        await this.clickOnElement(await this.getRoadmapLink());
    }

    async getIssuesLink(): Promise<Locator> {
        return await this.getElement(issuesLink);
    }

    async clickOnIssuesLink(): Promise<void> {
        await this.clickOnElement(await this.getIssuesLink());
    }

    async getNewsLink(): Promise<Locator> {
        return await this.getElement(newsLink);
    }

    async clickOnNewsLink(): Promise<void> {
        await this.clickOnElement(await this.getNewsLink());
    }

    async getWikiLink(): Promise<Locator> {
        return await this.getElement(wikiLink);
    }

    async clickOnWikiLink(): Promise<void> {
        await this.clickOnElement(await this.getWikiLink());
    }

    async getBoardsLink(): Promise<Locator> {
        return await this.getElement(boardsLink);
    }

    async clickOnBoardsLink(): Promise<void> {
        await this.clickOnElement(await this.getBoardsLink());
    }

    async getRepositoryLink(): Promise<Locator> {
        return await this.getElement(repositoryLink);
    }

    async clickOnRepositoryLink(): Promise<void> {
        await this.clickOnElement(await this.getRepositoryLink());
    }

    async getPerPageButton(perPageNumber: string | number): Promise<Locator> {
        return await this.getElement(perPageOpen + perPageNumber + perPageClose);
    }

    async clickOnPerPageButton(perPageNumber: string | number): Promise<void> {
        await this.clickOnElement(await this.getPerPageButton(perPageNumber));
    }

    async getTableRows(): Promise<Locator> {
        return await this.getElement(tableRow);
    }

    async waitForTableRow(timeout: number = 3000): Promise<void> {
        await this.waitForElement(tableRow, timeout);
    }

    async countTableRows(): Promise<number> {
        return await this.countElements(await this.getTableRows());
    }

    async waitForTableRowsCount(expected: number, timeout: number = 3000): Promise<number> {
        try {
          await this.waitForTableRow(timeout);
          await this.page.waitForFunction(
            ( expected: any) => this.countTableRows() === expected,
            { expected },
            { timeout }
          );
        } finally {
          return await this.countTableRows();
        }
    }

    async getTableHead(): Promise<Locator> {
        return await this.getElement(tableHeads);
    }

    async clickOnTableHeadByIndex(index: number): Promise<void> {
        await this.clickOnElementByIndex(await this.getTableHead(), index);
    }

    async getFirstRowFirstCell(): Promise<Locator> {
        return await this.getElement(tableFirstRowFirstCell);
    }

    async getFirstRowFirstCellContent(): Promise<string | null> {
        return await this.getText(await this.getFirstRowFirstCell());
    }

    async waitForFirstRowFirstCellContent(expected: string, timeout: number = 5000): Promise<string | null> {
        try {
          await this.page.waitForFunction(
            (expected: any) => this.getFirstRowFirstCellContent() === expected,
            { expected },
            { timeout }
          );
        } finally {
          return await this.getFirstRowFirstCellContent();
        }
    }

    async getFirstRowSecondCell(): Promise<Locator> {
        return await this.getElement(tableFirstRowSecondCell);
    }

    async getFirstRowSecondCellContent(): Promise<string | null> {
        return await this.getText(await this.getFirstRowSecondCell());
    }

    async waitForFirstRowSecondCellContent(expected: string, timeout: number = 3000): Promise<string | null> {
        try {
          await this.page.waitForFunction(
            (expected: any) => this.getFirstRowSecondCellContent() === expected,
            { expected },
            { timeout }
          );
        } finally {
          return await this.getFirstRowSecondCellContent();
        }
    }

    async getOtherReleasesLink(): Promise<Locator> {
        return await this.getElement(otherReleasesLink);
    }

    async clickOnOtherReleasesLink(): Promise<void> {
        await this.clickOnElement(await this.getOtherReleasesLink());
    }

    async getHeader(): Promise<Locator> {
        return await this.getElement(header);
    }
}