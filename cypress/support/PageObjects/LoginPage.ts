export default class LoginPage{

    elements = {
        userName : () => cy.get('[placeholder="Username"]'),
        password : () => cy.get('[placeholder="Password"]'),
        loginBTN: () => cy.get('button'),
    }

    actions = {
        enterUsername: (userName: string) => this.elements.userName().type(userName).should('have.value', userName),
        enterPassword: (password: string) => this.elements.password().type(password).should('have.value', password),
        clickLogin: () => this.elements.loginBTN().click()
    }
}
