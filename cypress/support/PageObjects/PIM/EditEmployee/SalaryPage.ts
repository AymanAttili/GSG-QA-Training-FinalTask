import { IAddSalaryComponentPayload } from "cypress/support/helpers/APIHelpers/payloads/IAddSalaryComponentPayload"

export default class SalaryPage{
    URLs = {
        salaryComponent: (empNumber: number) => {return `/web/index.php/api/v2/pim/employees/${empNumber}/salary-components`}
    }

    addSalaryComponent = (payload: IAddSalaryComponentPayload, empNumber: number) =>{
        return cy.api({
            method: 'POST',
            url: this.URLs.salaryComponent(empNumber),
            body: payload
        })
    }
} 