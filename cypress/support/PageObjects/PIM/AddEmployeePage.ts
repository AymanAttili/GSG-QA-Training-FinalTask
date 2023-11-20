import { ICreateEmployeePayload } from "cypress/support/helpers/APIHelpers/payloads/ICreateEmployeePayload";
import { IcreateUserPayload } from "cypress/support/helpers/APIHelpers/payloads/ICreateUserPayload";
import GenericFunctions from "cypress/support/helpers/GenericFunctions"

export default class AddEmployeePage{
    URLs = {
        employees: '/web/index.php/api/v2/pim/employees',
        users: '/web/index.php/api/v2/admin/users'

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

    createUser = (userData: IcreateUserPayload) => {
        return cy.api({
            method: 'POST',
            url: this.URLs.users,
            body: userData
        });
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