// @ts-check
import { test, expect } from '@playwright/test';
import MainPage from '../pages/main.page';

test('Guide link', async ({ page }) => {
  const mainPage = new MainPage(page);
  await mainPage.open();
  await expect(page).toHaveTitle(/Overview - Redmine/);
  await mainPage.clickOnGuideLink();
  await expect(page).toHaveTitle(/Guide - Redmine/);
});

test('Changing tabs', async ({ page }) => {
  const mainPage = new MainPage(page);
  await mainPage.open();
  await expect(page).toHaveURL("https://www.redmine.org/");
  await mainPage.clickOnOverviewLink();
  await expect(page).toHaveURL("https://www.redmine.org/projects/redmine");
  await mainPage.clickOnDownloadLink();
  await expect(page).toHaveURL("https://www.redmine.org/projects/redmine/wiki/Download");
  await mainPage.clickOnActivityLink();
  await expect(page).toHaveURL("https://www.redmine.org/projects/redmine/activity");
  await mainPage.clickOnRoadmapLink();
  await expect(page).toHaveURL("https://www.redmine.org/projects/redmine/roadmap");
  await mainPage.clickOnIssuesLink();
  await expect(page).toHaveURL("https://www.redmine.org/projects/redmine/issues");
  await mainPage.clickOnNewsLink();
  await expect(page).toHaveURL("https://www.redmine.org/projects/redmine/news");
  await mainPage.clickOnWikiLink();
  await expect(page).toHaveURL("https://www.redmine.org/projects/redmine/wiki");
  await mainPage.clickOnBoardsLink();
  await expect(page).toHaveURL("https://www.redmine.org/projects/redmine/boards");
  await mainPage.clickOnRepositoryLink();
  await expect(page).toHaveURL("https://www.redmine.org/projects/redmine/repository");
});

test('Changing issues per page', async ({ page }) => {
  const mainPage = new MainPage(page);
  await mainPage.open();
  await mainPage.clickOnIssuesLink();
  await expect(await mainPage.waitForTableRowsCount(25)).toBe(25);
  await mainPage.clickOnPerPageButton(50);
  await expect(await mainPage.waitForTableRowsCount(50)).toBe(50);
  await mainPage.clickOnPerPageButton(100);
  await expect(await mainPage.waitForTableRowsCount(100)).toBe(100);
  await mainPage.clickOnPerPageButton(25);
  await expect(await mainPage.waitForTableRowsCount(25)).toBe(25);
});

test('Sorting versions status table', async ({ page }) => {
  const mainPage = new MainPage(page);
  await mainPage.open();
  await mainPage.clickOnDownloadLink();
  await expect(await mainPage.getFirstRowFirstCell()).toHaveText("trunk");
  await expect(await mainPage.getFirstRowSecondCell()).toHaveText("Unstable version. It will receive new features, bug fixes, and security updates.");
  await mainPage.clickOnTableHeadByIndex(0);
  await expect(await mainPage.waitForFirstRowFirstCellContent("4.x and older")).toContain("4.x and older");
  await expect(await mainPage.waitForFirstRowSecondCellContent("Unsupported.")).toContain("Unsupported.");
  await mainPage.clickOnTableHeadByIndex(0);
  await expect(await mainPage.waitForFirstRowFirstCellContent("6.1.x")).toContain("6.1.x");
  await expect(await mainPage.waitForFirstRowSecondCellContent("Latest stable version. Fully supported with new features, bug fixes, and security updates.")).toContain("Latest stable version. Fully supported with new features, bug fixes, and security updates.");
  await mainPage.clickOnTableHeadByIndex(1);
  await expect(await mainPage.waitForFirstRowFirstCellContent("6.1.x")).toContain("6.1.x");
  await expect(await mainPage.waitForFirstRowSecondCellContent("Latest stable version. Fully supported with new features, bug fixes, and security updates.")).toContain("Latest stable version. Fully supported with new features, bug fixes, and security updates.");
  await mainPage.clickOnTableHeadByIndex(1);
  await expect(await mainPage.waitForFirstRowFirstCellContent("5.0.x")).toContain("5.0.x");
  await expect(await mainPage.waitForFirstRowSecondCellContent("Unsupported.")).toContain("Unsupported.");
});

test('Other releases link', async ({ page }) => {
  const mainPage = new MainPage(page);
  await mainPage.open();
  await mainPage.clickOnDownloadLink();
  await mainPage.clickOnOtherReleasesLink();
  await expect(await mainPage.getHeader()).toHaveText("Index of /releases");
});
