import { ICretaeLocationPayload } from "cypress/support/helpers/APIHelpers/payloads/ICreateLoacationPayload";

export default class LocationsPage{
    URLs = {
        locations: '/web/index.php/api/v2/admin/locations'
    }

    createLocation = (payload: ICretaeLocationPayload) => {
        return cy.api({
            method: 'POST',
            url: this.URLs.locations,
            body: payload
        }).its('body').its('data').its('id');
    }

    deleteLocation = (id: number) => {
        return cy.api({
            method: 'DELETE',
            url: this.URLs.locations,
            body:{
                ids: [id]
            }
        })
    }
}