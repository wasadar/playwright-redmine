// @ts-check
import { test, expect } from '@playwright/test';
import DownloadPage from '../../pages/ai-generated/download.page';
import endpoints from '../../data/endpoints.json';

let downloadPage: DownloadPage;

test.describe('Redmine Download Tests', () => {
  test.beforeEach('Open Redmine and navigate to Download tab', async ({ page }) => {
    downloadPage = new DownloadPage(page);
    await downloadPage.open();
    await downloadPage.clickOnDownloadLink();
    await expect(page).toHaveURL(`${page.url().split('/').slice(0, 3).join('/')}/${endpoints.download}`);
  });

  test('Download any version from Redmine', async ({ page }) => {
    // Set up download promise before clicking
    const downloadPromise = page.waitForEvent('download');
    
    // Click on any version download link
    await downloadPage.clickOnAnyVersionDownloadLink();
    
    // Wait for download to start
    const download = await downloadPromise;
    
    // Verify download started successfully
    expect(download).toBeTruthy();
    
    // Get the suggested filename
    const filename = download.suggestedFilename();
    expect(filename).toBeTruthy();
    expect(filename).toMatch(/redmine-.*\.(zip|tar\.gz|tar\.bz2)/);
  });
});
