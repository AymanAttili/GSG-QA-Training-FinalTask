export default class ReportsPage{
    elements = {
        addReportBTN: () => cy.get('[type = button]').contains('Add').eq(0)
    }

    actions = {
        clickAddReportBTN: () => this.elements.addReportBTN().click()
    }

    URLs = {
        reports: '/web/index.php/api/v2/pim/reports/defined'
    }

    deleteReport = (id: number) => {
        cy.api({
            method: 'DELETE',
            url: this.URLs.reports,
            body:{
                ids: [id]
            }
        })
    }
}