export default class LoginPage{

    elements = {
        userName : () => cy.get('.oxd-label').contains('Username').parent().parent().within(() => {
            cy.get('input')
        }),
        password : () => cy.get('.oxd-label').contains('Password').parent().parent().within(() => {
            cy.get('input')
        }),
        loginBTN: () => cy.get('button'),
    }

    actions = {
        enterUsername: (userName: string) => this.elements.userName().type(userName),
        enterPassword: (password: string) => this.elements.password().type(password),
        clickLogin: () => this.elements.loginBTN().click()
    }
}