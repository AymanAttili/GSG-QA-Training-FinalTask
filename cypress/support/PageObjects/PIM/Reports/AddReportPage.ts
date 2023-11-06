export default class AddReportPage{
    elements = {
        reportName: () => cy.get('[placeholder = "Type here ..."]'),
        selectFormRow: (rowHeader: string) => cy.get('.oxd-form-row').contains(rowHeader).parent(),
        selectFormGrid: (header: string) => cy.get('.oxd-grid-item').contains(header).parent().parent(),
        selectInput: () =>  cy.get('.oxd-select-text'),
        selectOption: () => cy.get('.oxd-select-option'),
        selectedDisplayFields: () => cy.get('.oxd-chip'),
        saveBTN: () => cy.get('[type = submit]'),
        addCriteriaBTN: () => cy.get('.orangehrm-report-icon').eq(0),
        addDisplayFieldBTN: () => cy.get('.orangehrm-report-icon').eq(1),
        includeHeaderBTNs: () => cy.get('.oxd-switch-input')
    }

    actions = {
        enterReportName: (reportName: string) => this.elements.reportName().type(reportName),
        viewCriterias: () => this.elements.selectFormRow('Selection Criteria').within(() => {
            this.elements.selectFormGrid('Selection Criteria').within(() => {
                this.elements.selectInput().click();
            })
        }),
        clickCriteria: (criteria: string) => this.elements.selectOption().contains(criteria).click(),
        addCriteria: () => this.elements.addCriteriaBTN().click(),
        viewCriteriaValues: (num: number) => this.elements.selectInput().eq(num).click(),
        clickCriteriaValue: (value: string) => this.elements.selectOption().contains(value).click(),
        viewDisplayFieldGroups: () => this.elements.selectFormRow('Display Fields').within(() => {
            this.elements.selectFormGrid('Select Display Field Group').within(() => {
                this.elements.selectInput().click();
            })
        }),
        clickDisplayFieldGroup: (group: string) => this.elements.selectOption().contains(group).click(),
        viewDisplayFields: () => this.elements.selectFormRow('Display Fields').within(() => {
            this.elements.selectInput().eq(1).click();
            
        }),
        clickDisplayField: (field: string) => this.elements.selectOption().contains(field).click(),
        addDisplayField: () => this.elements.addDisplayFieldBTN().click(),
        clickSave: () => this.elements.saveBTN().click(),
        checkIncludeHeaderBTN: (num: number) => this.elements.includeHeaderBTNs().eq(num).click()
    }

    addSelectionCriteria = (criteria: string) => {
        this.actions.viewCriterias();
        this.actions.clickCriteria(criteria);
        this.actions.addCriteria();
    }

    addCriteriaValue = (value: string, num: number) => {
        this.actions.viewCriteriaValues(num);
        this.actions.clickCriteriaValue(value);
    }

    addDisplayField = (fieldGroup: string, field: string, num: number) => {
        this.actions.viewDisplayFieldGroups();
        this.actions.clickDisplayFieldGroup(fieldGroup);
        this.actions.viewDisplayFields();
        this.actions.clickDisplayField(field)
        this.actions.addDisplayField();
        this.actions.checkIncludeHeaderBTN(num)

        // assertion on the added field
        this.elements.selectedDisplayFields().contains(field);
    }
}