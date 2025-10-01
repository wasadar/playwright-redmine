import Page from "./page";

const guideLink = "a.wiki-page:has-text(\"Redmine guide\")"; // playwright-specific selector
const overviewLink = ".overview";
const downloadLink = ".download";
const activityLink = ".activity";
const roadmapLink = ".roadmap";
const issuesLink = ".issues";
const newsLink = ".news";
const wikiLink = "li .wiki";
const boardsLink = ".boards";
const repositoryLink = ".repository";
const perPageOpen = "span.per-page a:has-text(\""; // playwright-specific selector and openning gap for incerting value
const perPageClose = "\")"; // closing gap after incerting value
const tableRow = ".autoscroll tbody tr";
const tableHeads = "tr th";
const tableFirstRowFirstCell = "tbody:has(tr th) tr:nth-child(2) td:nth-child(1)";
const tableFirstRowSecondCell = "tbody:has(tr th) tr:nth-child(2) td:nth-child(2)";
const otherReleasesLink = "a:has-text(\"older releases\")" // playwright-specific selector
const header = "h1";

export default class MainPage extends Page {
    constructor(page) {
        super(page);
    }

    async open() {
        await super.open("https://www.redmine.org/");
    }

    async getGuideLink() {
        return await this.getElement(guideLink);
    }

    async clickOnGuideLink() {
        await this.clickOnElement(await this.getGuideLink());
    }

    async getOverviewLink() {
        return await this.getElement(overviewLink);
    }

    async clickOnOverviewLink() {
        await this.clickOnElement(await this.getOverviewLink());
    }

    async getDownloadLink() {
        return await this.getElement(downloadLink);
    }

    async clickOnDownloadLink() {
        await this.clickOnElement(await this.getDownloadLink());
    }

    async getActivityLink() {
        return await this.getElement(activityLink);
    }

    async clickOnActivityLink() {
        await this.clickOnElement(await this.getActivityLink());
    }

    async getRoadmapLink() {
        return await this.getElement(roadmapLink);
    }

    async clickOnRoadmapLink() {
        await this.clickOnElement(await this.getRoadmapLink());
    }

    async getIssuesLink() {
        return await this.getElement(issuesLink);
    }

    async clickOnIssuesLink() {
        await this.clickOnElement(await this.getIssuesLink());
    }

    async getNewsLink() {
        return await this.getElement(newsLink);
    }

    async clickOnNewsLink() {
        await this.clickOnElement(await this.getNewsLink());
    }

    async getWikiLink() {
        return await this.getElement(wikiLink);
    }

    async clickOnWikiLink() {
        await this.clickOnElement(await this.getWikiLink());
    }

    async getBoardsLink() {
        return await this.getElement(boardsLink);
    }

    async clickOnBoardsLink() {
        await this.clickOnElement(await this.getBoardsLink());
    }

    async getRepositoryLink() {
        return await this.getElement(repositoryLink);
    }

    async clickOnRepositoryLink() {
        await this.clickOnElement(await this.getRepositoryLink());
    }

    async getPerPageButton(perPageNumber) {
        return await this.getElement(perPageOpen + perPageNumber + perPageClose);
    }

    async clickOnPerPageButton(perPageNumber) {
        await this.clickOnElement(await this.getPerPageButton(perPageNumber));
    }

    async getTableRows() {
        return await this.getElement(tableRow);
    }

    async waitForTableRow(timeout = 3000) {
        await this.waitForElement(tableRow, timeout)
    }

    async countTableRows() {
        return await this.countElements(await this.getTableRows());
    }

    async waitForTableRowsCount(expected, timeout = 3000) {
        try {
          await this.waitForTableRow(timeout);
    
          await this.page.waitForFunction(
            (expected) => this.countTableRows() === expected,
            {expected: expected},
            {timeout}
          );
        } finally {
          return await this.countTableRows()
        }
    }

    async getTableHead() {
        return await this.getElement(tableHeads);
    }

    async clickOnTableHeadByIndex(index) {
        await this.clickOnElementByIndex(await this.getTableHead(), index);
    }

    async getFirstRowFirstCell() {
        return await this.getElement(tableFirstRowFirstCell);
    }

    async getFirstRowFirstCellContent() {
        return await this.getText(await this.getFirstRowFirstCell());
    }

    async waitForFirstRowFirstCellContent(expected, timeout = 5000) {
        try {
          await this.page.waitForFunction(
            (expected) => this.getFirstRowFirstCellContent() === expected,
            {expected: expected},
            {timeout}
          );
        } finally {
          return await this.getFirstRowFirstCellContent()
        }
    }

    async getFirstRowSecondCell() {
        return await this.getElement(tableFirstRowSecondCell);
    }

    async getFirstRowSecondCellContent() {
        return await this.getText(await this.getFirstRowSecondCell());
    }

    async waitForFirstRowSecondCellContent(expected, timeout = 3000) {
        try {
          await this.page.waitForFunction(
            (expected) => this.getFirstRowSecondCellContent() === expected,
            {expected: expected},
            {timeout}
          );
        } finally {
          return await this.getFirstRowSecondCellContent()
        }
    }

    async getOtherReleasesLink() {
        return await this.getElement(otherReleasesLink);
    }

    async clickOnOtherReleasesLink() {
        await this.clickOnElement(await this.getOtherReleasesLink());
    }

    async getHeader() {
        return await this.getElement(header);
    }
}