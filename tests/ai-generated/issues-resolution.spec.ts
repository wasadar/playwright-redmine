// @ts-check
import { test, expect } from '@playwright/test';
import IssuesPage from '../../pages/ai-generated/issues.page';
import endpoints from '../../data/endpoints.json';

let issuesPage: IssuesPage;

test.describe('Redmine Issues Tests', () => {
  test.beforeEach('Open Redmine and navigate to Issues tab', async ({ page }) => {
    issuesPage = new IssuesPage(page);
    await issuesPage.open();
    await issuesPage.clickOnIssuesLink();
    await expect(page).toHaveURL(`${page.url().split('/').slice(0, 3).join('/')}/${endpoints.issues}`);
  });

  test('Move Resolution column to selected columns', async ({ page }) => {
    // Expand Options fieldset to access column selection
    await issuesPage.clickOptionsLegend();
    await page.waitForTimeout(500);
    
    // Select Resolution from available columns
    await issuesPage.selectResolutionFromAvailableColumns();
    
    // Move Resolution to selected columns using move right button
    await issuesPage.clickMoveRightButton();
    await page.waitForTimeout(1000);
    
    // Verify Resolution is now in selected columns
    const isResolutionInSelected = await issuesPage.isResolutionInSelectedColumns();
    expect(isResolutionInSelected).toBe(true);
    
    // Apply the column changes
    await issuesPage.clickApplyButton();
    await page.waitForLoadState('networkidle');
    
    // Verify Resolution column appears in the table
    const columnHeaders = await issuesPage.getColumnHeadersText();
    const hasResolutionColumn = columnHeaders.some(header => 
      header.toLowerCase().includes('resolution')
    );
    expect(hasResolutionColumn).toBe(true);
  });

  test('Filter issues by status using "not equals" operator', async ({ page }) => {
    // Ensure status filter is enabled
    await issuesPage.ensureStatusFilterIsEnabled();
    
    // Select "!" (not equals) operator in the first dropdown
    await issuesPage.selectStatusOperator('!');
    
    // Select "New" status in the second dropdown
    await issuesPage.selectStatusValue('1'); // Value for "New" status
    
    // Click Apply button
    await issuesPage.clickApplyButton();
    
    // Wait for the page to update with filtered results
    await page.waitForLoadState('networkidle');
    
    // Check that there are no results with status "New"
    const hasNewStatus = await issuesPage.hasStatusInResults('New');
    expect(hasNewStatus).toBe(false);
    
    // Verify that we have some results (not empty)
    const issuesCount = await issuesPage.getIssuesCount();
    expect(issuesCount).toBeGreaterThan(0);
  });
});
