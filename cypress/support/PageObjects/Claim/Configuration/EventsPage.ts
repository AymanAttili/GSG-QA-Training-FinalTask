import { ICreateEventPayload } from "cypress/support/helpers/APIHelpers/payloads/ICreateEventPayload"

export default class EventsPage{
    URLs = {
        events: '/web/index.php/api/v2/claim/events'
    }

    createEvent = (eventData: ICreateEventPayload) => {
        return cy.api({
            method: 'POST',
            url: this.URLs.events,
            body: eventData
        }).its('body').its('data').its('id');
    }

    deleteEvents = (ids: number[]) => {
        cy.api({
            method: 'DELETE',
            url: this.URLs.events,
            body:{
                ids: ids
            }
        })
    }
}