import { ICreateExpenseTypePayload } from "cypress/support/helpers/APIHelpers/payloads/ICreateExpenseType"

export default class ExpenseTypesPage{
    URLs = {
        types: '/web/index.php/api/v2/claim/expenses/types'
    }

    createExpensetype = (expenseTypeData: ICreateExpenseTypePayload) => {
        return cy.api({
            method: 'POST',
            url: this.URLs.types,
            body: expenseTypeData
        }).its('body').its('data').its('id');
    }

    deleteExpenseTypes = (ids: number[]) => {
        cy.api({
            method: 'DELETE',
            url: this.URLs.types,
            body:{
                ids: ids
            }
        })
    }
}