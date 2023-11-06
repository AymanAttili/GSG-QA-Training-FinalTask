import { ICreateEmployeePayload } from "cypress/support/helpers/APIHelpers/payloads/ICreateEmployeePayload";
import GenericFunctions from "cypress/support/helpers/GenericFunctions"

export default class AddEmployeePage{
    URLs = {
        employees: '/web/index.php/api/v2/pim/employees'
    }

    createEmployee = (empData: ICreateEmployeePayload) => { 
        return cy.api({
            method: 'POST',
            url: this.URLs.employees,
            body:{
                firstName: empData.firstName,
                middleName: empData.middleName,
                lastName: empData.lastName,
                empPicture: null,
                employeeId: `${GenericFunctions.genericRandomNumber(1000)}`
            }
        }).its('body').its('data').its('empNumber');
    }

    deleteEmployees = (ids:number[]) => {
        cy.api({
            method: 'DELETE',
            url: this.URLs.employees,
            body:{
                ids: ids
            }
        })
    }
}