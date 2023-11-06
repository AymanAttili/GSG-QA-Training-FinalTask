export default class ViewReportPage {
    elements = {
        reportName: () => cy.get('.orangehrm-main-title'),
        table: {
            headerGroup: () => cy.get('.group-rgRow > .rgHeaderCell'),
            header: () => cy.get('.header-rgRow > .rgHeaderCell'),
            row: () => cy.get('.rgRow'),
            cell: () => cy.get('.rgCell'),
        }
    }

    actions = {
        checkReportName: (expected: string) => this.elements.reportName().should('have.text', expected),
        checkHeaderGroup: (expected: string) => this.elements.table.headerGroup().contains(expected),
        checkHeader: (num: number, expected: string) => this.elements.table.header().eq(num).should('have.text', expected),
        checkCell: (rowNum: number, headerName: string, expected: string) => {
            this.getHeaderIndex(headerName).then((cellNum) => {
                this.elements.table.row().eq(rowNum).within(() => {
                    this.elements.table.cell().eq(Number(cellNum)).contains(expected);
                })
            })
        }
    }

    getHeaderIndex = (headerName: string) => {
        return this.elements.table.header().contains(headerName).parent().invoke('index');
    }

    getGroupHeaderIndex = (groupName: string) => {
        return this.elements.table.headerGroup().contains(groupName).parent().invoke('index');
    }

    checkHeaderCorrectness = (groupName: string, headerName: string) => {
        this.getGroupHeaderIndex(groupName).then((groupIndex) => {
            this.getHeaderIndex(headerName).should('equal', groupIndex);
        })
    }

    getEmployeeRowNum = (uniqueValue: string) => {
        return this.elements.table.row().contains(uniqueValue).parent().invoke('index');
    }

}