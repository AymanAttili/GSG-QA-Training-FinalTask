export default class JobPage{
    URLs = {
        jobDetails: (empNumber: number) => {return `/web/index.php/api/v2/pim/employees/${empNumber}/job-details`}
    }

    createJobDetails = (empNumber: number, jobTitleId: number, locationId: number) => {
        return cy.api({
            method: 'PUT',
            url: this.URLs.jobDetails(empNumber),
            body:{
                "jobTitleId": jobTitleId,
                "locationId": locationId
            }
        })
    }
}
