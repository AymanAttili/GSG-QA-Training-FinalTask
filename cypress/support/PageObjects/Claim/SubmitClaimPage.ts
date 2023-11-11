import { IAddExpensePayload } from "cypress/support/helpers/APIHelpers/payloads/IAddExpensePayload"
import { ICreateClaimRequest } from "cypress/support/helpers/APIHelpers/payloads/ICreateClaimRequest"

export default class SubmitClaimPage{
    elements = {
        input: () => cy.get('.oxd-input'),
        selectInput: () =>  cy.get('.oxd-select-text'),
        selectTextArea: () =>  cy.get('textarea'),
        selectOption: () => cy.get('.oxd-select-option'),
        selectFormGridItem: (label: string) => cy.get('.oxd-grid-item').contains(label).parent().parent(),
        getMainTitle: (title: string ) => cy.get('.oxd-text--h6').contains(title).parent(),
        submitBTN: () => cy.get('[type = submit]'),
        submitClaimBTN: () => cy.get('button').contains('Submit'),
        addBTN: () => cy.get('button').contains('Add'),
        backBTN: () => cy.get('button').contains('Back'),
        cancelBTN: () => cy.get('button').contains('Cancel'),
        approveBTN: () => cy.get('button').contains('Approve'),
        rejectBTN: () => cy.get('button').contains('Reject'),
        claimsTable: {
            header: () => cy.get('.oxd-table-header'),
            row: () => cy.get('.oxd-table-row'),
            cell: () => cy.get('.oxd-table-cell'),
        }
    }

    actions = {
        displayEvents: () => this.elements.selectFormGridItem('Event').within(() => {
            this.elements.selectInput().click();
        }),
        selectOption: (option: string) => this.elements.selectOption().contains(option).click(),
        displayCurrencies: () => this.elements.selectFormGridItem('Currency').within(() => {
            this.elements.selectInput().click();
        }),
        typeRemarks: (remarks: string) => this.elements.selectFormGridItem('Remarks').within(() => {
            this.elements.selectTextArea().click().type(remarks);
        }),
        initiateClaimRequest: () => this.elements.submitBTN().click(),
        addNewExpense: () => this.elements.getMainTitle('Expenses').within(() => {
            this.elements.addBTN().click();
        }),
        displayExpenseTypes: () => this.elements.selectFormGridItem('Expense Type').within(() => {
            this.elements.selectInput().click();
        }),
        enterExpenseDate: (date: string) => this.elements.selectFormGridItem('Date').within(() => {
            this.elements.input().click().type(date);
        }),
        enterExpenseAmount: (amount: string) => this.elements.selectFormGridItem('Amount').within(() => {
            this.elements.input().click().type(amount);
        }),
        enterExpenseNote: (note: string) =>this.elements.selectFormGridItem('Note').within(() => {
            this.elements.input().click().type(note);
        }),
        saveExpense: () => this.elements.submitBTN().click(),
        clickApproveClaim: () => this.elements.approveBTN().click(),
        clickSubmitClaim: () => this.elements.submitClaimBTN().click(),
        clickRejectClaim: () => this.elements.rejectBTN().click(),
        clickBackBTN: () => this.elements.backBTN().click(),
        clickCancelBTN: () => this.elements.cancelBTN().click(),
        getHeaders: () => this.elements.claimsTable.header(),
        getRow: (num: number) => this.elements.claimsTable.row().eq(num),
        getCell: (num: number) => this.elements.claimsTable.cell().eq(num),
    }

    getHeaderIndex = (header: string) => {
        return this.actions.getHeaders().contains(header).invoke('index');
    }

    checkCellValue = (rowNum: number, header: string, expected: string) => {
        this.getHeaderIndex(header).then((ind: number) => {
            this.actions.getRow(rowNum).within(() => {
                this.actions.getCell(ind).should('have.text', expected);
            })
        })
    }

    URLs = {
        requestClaim: '/web/index.php/api/v2/claim/requests',
        expenses: (id: number) => {return `/web/index.php/api/v2/claim/requests/${id}/expenses`},
        action:  (id: number) => {return `/web/index.php/api/v2/claim/requests/${id}/action`}
    }

    createClaimRequest = (claimRequestData: ICreateClaimRequest) => {
        return cy.api({
            method: 'POST',
            url: this.URLs.requestClaim,
            body: claimRequestData
        }).its('body').its('data').its('id');
    }

    addExpense = (expenseData: IAddExpensePayload, claimId: number) => {
        return cy.api({
            method: 'POST',
            url: this.URLs.expenses(claimId),
            body: expenseData
        }).its('body').its('data').its('id');
    }

    submitClaim = (claimId: number) => {
        return cy.api({
            method: 'PUT',
            url: this.URLs.action(claimId),
            body: {
                "action": "SUBMIT"
            }
        })
    }
}