import { Locator, Page as PlaywrightPage } from 'playwright';
import MainPage from '../main.page';

const applyButton: string = "a.icon.icon-checked[onclick*='query_form']"; // Apply button
const issuesTable: string = ".autoscroll tbody tr"; // Issues table rows
const moveRightButton: string = "input.move-right[value='→']"; // Move right button for moving options
const tableHeaders: string = ".autoscroll thead th"; // Table header cells
const availableColumnsSelect: string = "select[name='available_columns[]']"; // Available columns select
const selectedColumnsSelect: string = "select[name='c[]']"; // Selected columns select
const optionsLegend: string = "fieldset#options legend"; // Options legend to click
const statusOperatorSelect: string = "select[name='op[status_id]']"; // Status operator dropdown
const statusValueSelect: string = "select[name='v[status_id][]']"; // Status value dropdown
const statusCheckbox: string = "input#cb_status_id"; // Status filter checkbox

export default class IssuesPage extends MainPage {
    constructor(page: PlaywrightPage) {
        super(page);
    }

    async clickOptionsLegend(): Promise<void> {
        const legend = await this.getElement(optionsLegend);
        await this.clickOnElement(legend);
    }

    async selectResolutionFromAvailableColumns(): Promise<void> {
        const availableSelect = await this.getElement(availableColumnsSelect);
        await availableSelect.selectOption({ value: 'cf_2' }); // Resolution option value
    }

    async clickMoveRightButton(): Promise<void> {
        const moveRight = await this.getElement(moveRightButton);
        await this.clickOnElement(moveRight);
    }

    async isResolutionInSelectedColumns(): Promise<boolean> {
        const selectedSelect = await this.getElement(selectedColumnsSelect);
        const resolutionOption = selectedSelect.locator("option[value='cf_2']");
        const count = await this.countElements(resolutionOption);
        return count > 0;
    }

    async clickApplyButton(): Promise<void> {
        const applyBtn = await this.getElement(applyButton);
        await this.clickOnElement(applyBtn);
    }

    async getColumnHeadersText(): Promise<string[]> {
        const headers = await this.getElement(tableHeaders);
        const count = await this.countElements(headers);
        const headersText: string[] = [];
        
        for (let i = 0; i < count; i++) {
            const header = headers.nth(i);
            const text = await this.getText(header);
            headersText.push(text || '');
        }
        
        return headersText;
    }

    async getStatusCheckbox(): Promise<Locator> {
        return await this.getElement(statusCheckbox);
    }

    async getStatusOperatorSelect(): Promise<Locator> {
        return await this.getElement(statusOperatorSelect);
    }

    async getStatusValueSelect(): Promise<Locator> {
        return await this.getElement(statusValueSelect);
    }

    async selectStatusOperator(operator: string): Promise<void> {
        // Wait for the operator select to be visible
        await this.waitForElement(statusOperatorSelect, 5000);
        
        const operatorSelect = await this.getStatusOperatorSelect();
        await operatorSelect.selectOption(operator);
    }

    async selectStatusValue(value: string): Promise<void> {
        // Wait for the value select to be visible
        await this.waitForElement(statusValueSelect, 5000);
        
        const valueSelect = await this.getStatusValueSelect();
        await valueSelect.selectOption(value);
    }

    async isStatusCheckboxChecked(): Promise<boolean> {
        const checkbox = await this.getStatusCheckbox();
        return await checkbox.isChecked();
    }

    async ensureStatusFilterIsEnabled(): Promise<void> {
        // Wait for the checkbox to be visible
        await this.waitForElement(statusCheckbox, 5000);
        
        const isChecked = await this.isStatusCheckboxChecked();
        if (!isChecked) {
            const checkbox = await this.getStatusCheckbox();
            await checkbox.check();
        }
    }

    async getIssuesTableRows(): Promise<Locator> {
        return await this.getElement(issuesTable);
    }

    async getIssuesCount(): Promise<number> {
        const rows = await this.getIssuesTableRows();
        return await this.countElements(rows);
    }

    async getStatusColumnValues(): Promise<string[]> {
        const rows = await this.getIssuesTableRows();
        const count = await this.countElements(rows);
        const statusValues: string[] = [];
        
        for (let i = 0; i < count; i++) {
            const row = rows.nth(i);
            // Status is in the 4th column (index 3)
            const statusCell = row.locator('td').nth(3);
            const statusText = await this.getText(statusCell);
            
            if (statusText && statusText.trim() !== '') {
                statusValues.push(statusText.trim());
            }
        }
        
        return statusValues;
    }

    async hasStatusInResults(status: string): Promise<boolean> {
        const statusValues = await this.getStatusColumnValues();
        return statusValues.some(value => value.toLowerCase().includes(status.toLowerCase()));
    }
}
