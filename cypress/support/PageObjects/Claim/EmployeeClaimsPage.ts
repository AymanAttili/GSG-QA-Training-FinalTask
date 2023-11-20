export default class EmployeeClaimsPage{

    URLs = {
        page: 'https://opensource-demo.orangehrmlive.com/web/index.php/claim/viewAssignClaim',
        employeeNameAutoComplte: '/web/index.php/api/v2/pim/employees?nameOrId=*',
        claimsTableData: '/web/index.php/api/v2/claim/employees/requests?limit=50&offset=0&includeEmployees=onlyCurrent&sortField=claimRequest.referenceId&sortOrder=DESC'
    }

    elements = {
        searchbar: {
            getGroup: (label: string) => cy.get('.oxd-input-group__label-wrapper').contains(label).parent().parent(),
            input: () => cy.get('input'),
            selectInput: () =>  cy.get('.oxd-select-text'),
            selectOption: () => cy.get('.oxd-select-option'),
            autocompleteOption: () => cy.get('.oxd-autocomplete-option'),
            searchBTN: () => cy.get('[type = submit]')
        },
        claimsTable: {
            header: () => cy.get('.oxd-table-header'),
            row: () => cy.get('.oxd-table-row'),
            cell: () => cy.get('.oxd-table-cell'),
        }
    }

    actions = {
        enterEmployeeName: (name: string) => this.elements.searchbar.getGroup('Employee Name').within(() => {
            this.elements.searchbar.input().type(name);
            cy.intercept('GET', this.URLs.employeeNameAutoComplte).as('employeeNameAutoComplte');
            cy.wait('@employeeNameAutoComplte');
            this.elements.searchbar.autocompleteOption().eq(0).click()
        }),
        clickSearchBTN: () => {
            this.elements.searchbar.searchBTN().click();
            // cy.intercept('GET', this.URLs.claimsTableData).as('claimsTableData');
            // cy.wait('@claimsTableData');
            cy.wait(2000); // I've tried dynamic wait for half an hour but it didn't work

        },
        getHeaders: () => this.elements.claimsTable.header(),
        getRow: (num: number) => this.elements.claimsTable.row().eq(num),
        getCell: (num: number) => this.elements.claimsTable.cell().eq(num),
    }

    getHeaderIndex = (header: string) => {
        return this.actions.getHeaders().contains(header).invoke('index');
    }

    viewClaimDetails = (rowNum: number) => {
        this.getHeaderIndex('Actions').then((ind: number) => {
            this.actions.getRow(rowNum).within(() => {
                this.actions.getCell(ind).click();
            })
        })
    }

    checkCellValue = (rowNum: number, header: string, expected: string) => {
        this.getHeaderIndex(header).then((ind: number) => {
            this.actions.getRow(rowNum).within(() => {
                this.actions.getCell(ind).should('have.text', expected);
            })
        })
    }

    visitPage = () => {
        cy.visit(this.URLs.page);
    }
}