// @ts-check
import { test, expect } from '@playwright/test';
import MainPage from '../pages/main.page';
import endpoints from '../data/endpoints.json';

let mainPage: MainPage;

test.describe('Redmine tests', () => {
  test.beforeEach('Open Redmine\'s main page', async ({ page }) => {
    mainPage = new MainPage(page);
    await mainPage.open();
  });

  test('Guide link', async ({ page }) => {
    await expect(page).toHaveTitle('Overview - Redmine');
    await mainPage.clickOnGuideLink();
    await expect(page).toHaveTitle('Guide - Redmine');
  });
  
  test('Changing tabs', async ({ page, baseURL }) => {
    await expect(page).toHaveURL(`${baseURL}`);
    await mainPage.clickOnOverviewLink();
    await expect(page).toHaveURL(`${baseURL}${endpoints.overview}`);
    await mainPage.clickOnDownloadLink();
    await expect(page).toHaveURL(`${baseURL}${endpoints.download}`);
    await mainPage.clickOnActivityLink();
    await expect(page).toHaveURL(`${baseURL}${endpoints.activity}`);
    await mainPage.clickOnRoadmapLink();
    await expect(page).toHaveURL(`${baseURL}${endpoints.roadmap}`);
    await mainPage.clickOnIssuesLink();
    await expect(page).toHaveURL(`${baseURL}${endpoints.issues}`);
    await mainPage.clickOnNewsLink();
    await expect(page).toHaveURL(`${baseURL}${endpoints.news}`);
    await mainPage.clickOnWikiLink();
    await expect(page).toHaveURL(`${baseURL}${endpoints.wiki}`);
    await mainPage.clickOnBoardsLink();
    await expect(page).toHaveURL(`${baseURL}${endpoints.boards}`);
    await mainPage.clickOnRepositoryLink();
    await expect(page).toHaveURL(`${baseURL}${endpoints.repository}`);
  });
  
  // the correspoding functional was deleted from redmine.org so test is now not working
  test.skip('Changing issues per page', async ({ page }) => {
    await mainPage.clickOnIssuesLink();
    await expect(await mainPage.getTableRows()).toHaveCount(25);
    await mainPage.clickOnPerPageButton(50);
    await expect(await mainPage.getTableRows()).toHaveCount(50);
    await mainPage.clickOnPerPageButton(100);
    await expect(await mainPage.getTableRows()).toHaveCount(100);
    await mainPage.clickOnPerPageButton(25);
    await expect(await mainPage.getTableRows()).toHaveCount(25);
  });
  
  test('Sorting versions status table', async ({ page }) => {
    await mainPage.clickOnDownloadLink();
    await expect(await mainPage.getFirstRowFirstCell()).toHaveText("trunk");
    await expect(await mainPage.getFirstRowSecondCell()).toHaveText("Unstable version. It will receive new features, bug fixes, and security updates.");
    await mainPage.clickOnTableHeadByIndex(0);
    await expect(await mainPage.getFirstRowFirstCell()).toHaveText("4.x and older");
    await expect(await mainPage.getFirstRowSecondCell()).toHaveText("Unsupported.");
    await mainPage.clickOnTableHeadByIndex(0);
    await expect(await mainPage.getFirstRowFirstCell()).toHaveText("6.1.x");
    await expect(await mainPage.getFirstRowSecondCell()).toHaveText("Latest stable version. Fully supported with new features, bug fixes, and security updates.");
    await mainPage.clickOnTableHeadByIndex(1);
    await expect(await mainPage.getFirstRowFirstCell()).toHaveText("6.1.x");
    await expect(await mainPage.getFirstRowSecondCell()).toHaveText("Latest stable version. Fully supported with new features, bug fixes, and security updates.");
    await mainPage.clickOnTableHeadByIndex(1);
    await expect(await mainPage.getFirstRowFirstCell()).toHaveText("5.0.x");
    await expect(await mainPage.getFirstRowSecondCell()).toHaveText("Unsupported.");
  });
  
  test('Other releases link', async ({ page }) => {
    await mainPage.clickOnDownloadLink();
    await mainPage.clickOnOtherReleasesLink();
    await expect(await mainPage.getHeader()).toHaveText("Index of /releases");
  });
});


