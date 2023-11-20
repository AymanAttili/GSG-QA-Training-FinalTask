import { ICreateJobTitlePayload } from "cypress/support/helpers/APIHelpers/payloads/ICreateJobTitlePayload";
import GenericFunctions from "cypress/support/helpers/GenericFunctions";

export default class JobTitlesPage{
    URLs = {
        jobTitles: '/web/index.php/api/v2/admin/job-titles'
    }

    createJobTitle = (payload: ICreateJobTitlePayload) => {
        return cy.api({
            method: 'POST',
            url: this.URLs.jobTitles,
            body: payload
        }).its('body').its('data').its('id');
    }

    deleteJobTitle = (id: number) => {
        return cy.api({
            method: 'DELETE',
            url: this.URLs.jobTitles,
            body:{
                ids: [id]
            }
        })
    }
}