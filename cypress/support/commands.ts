// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add('login', (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })

import LoginPage from "./PageObjects/LoginPage";

const loginPage: LoginPage = new LoginPage();


declare global {
    namespace Cypress {
        interface Chainable {
            logout: () => Chainable<any>;
            login: (userName:string, password:string) => Chainable<any>;
        }
    }

}

function logout(){
    cy.api('GET','https://opensource-demo.orangehrmlive.com/web/index.php/auth/logout',{})
    cy.clearCookies()
    cy.visit('/');
}

function login(userName:string = 'Admin', password:string = 'admin123'){
    // add intercept to make dynamic wait
    cy.visit('/');

    if(userName !== ''){
        loginPage.actions.enterUsername(userName);
    }
    if(password !== ''){
        loginPage.actions.enterPassword(password);
    }

    loginPage.actions.clickLogin();

}



Cypress.Commands.add('logout', logout)
Cypress.Commands.add('login', login)