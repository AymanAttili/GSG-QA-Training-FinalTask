import EventsPage from "cypress/support/PageObjects/Claim/Configuration/EventsPage";
import ExpenseTypesPage from "cypress/support/PageObjects/Claim/Configuration/ExpenseTypesPage";
import SubmitClaimPage from "cypress/support/PageObjects/Claim/SubmitClaimPage";
import EmployeeClaimsPage from "cypress/support/PageObjects/Claim/EmployeeClaimsPage";
import Navbar from "cypress/support/PageObjects/Navbar";
import AddEmployeePage from "cypress/support/PageObjects/PIM/AddEmployeePage";
import Sidebar from "cypress/support/PageObjects/Sidebar";

const addEmployeePage: AddEmployeePage = new AddEmployeePage();
const eventsPage: EventsPage = new EventsPage();
const expenseTypesPage: ExpenseTypesPage = new ExpenseTypesPage();
const submitClaimPage: SubmitClaimPage = new SubmitClaimPage();
const sideBar: Sidebar = new Sidebar();
const navbar: Navbar = new Navbar();
const employeeClaimsPage: EmployeeClaimsPage = new EmployeeClaimsPage();

const fixturePath: string = 'cypress/fixtures/secondPhaseData.json'

let empNum: number;
let eventId: number;
let expenseTypeId: number;

describe('Phase2', () => {
    beforeEach(() => {
        // login as an admin
        cy.login();

        // declaring the fixture
        cy.fixture('secondPhaseData').as('testData');

        // Pre-requisites
        cy.get('@testData').then((testData: any) => {
            let employee = testData.employee;
            let user = testData.user;
            let event = testData.event;
            let expenseType = testData.expenseType;

            // Create new Employee
            addEmployeePage.createEmployee(employee).then((empNumber: number) => {
                testData.employee.empNumber = empNumber;
                empNum = empNumber;
                user.empNumber = empNumber;

                // Create new user with this employee
                addEmployeePage.createUser(user);
            })

            // Create new event
            eventsPage.createEvent(event).then((eId: number) => {
                testData.claimRequest.claimEventId = eId;
                eventId = eId;
            });

            // Craete new expense type
            expenseTypesPage.createExpensetype(expenseType).then((exId: number) => {
                testData.expense.expenseTypeId = exId;
                expenseTypeId = exId;

                cy.writeFile(fixturePath, testData)
            });
        })

        cy.logout();
    })

    afterEach(() => {

        cy.login();

        // Delete all created data
        addEmployeePage.deleteEmployees([empNum]);
        eventsPage.deleteEvents([eventId]);
        expenseTypesPage.deleteExpenseTypes([expenseTypeId]);
    })

    it('Submitted claim request Approval flow', () => {
        
        cy.get('@testData').then((testData: any) => {
            let user = testData.user;
            let employee = testData.employee;
            let event = testData.event;
            let expense = testData.expense;
            let expenseType = testData.expenseType;
            let currency = testData.currency;

            // Login with new user
            cy.login(user.username, user.password);

            // The user initiates a claim request
            sideBar.visitPage('Claim');
            navbar.clickBTN('Submit Claim');
            submitClaimPage.actions.displayEvents();
            submitClaimPage.actions.selectOption(event.name);
            submitClaimPage.actions.displayCurrencies();
            submitClaimPage.actions.selectOption(currency);
            submitClaimPage.actions.initiateClaimRequest();

            // The user add a new expense
            submitClaimPage.actions.addNewExpense();
            submitClaimPage.actions.displayExpenseTypes();
            submitClaimPage.actions.selectOption(expenseType.name);
            submitClaimPage.actions.enterExpenseDate(expense.date)
            submitClaimPage.actions.enterExpenseAmount(expense.amount)
            submitClaimPage.actions.saveExpense()

            // The user submitted the claim request
            submitClaimPage.actions.clickSubmitClaim();

            // Switch to admin
            cy.logout();
            cy.login();

            // The admin search for submitted claim
            employeeClaimsPage.visitPage();
            const EmployeeFullName: string = employee.firstName + ' ' + employee.middleName + ' ' + employee.lastName;
            employeeClaimsPage.actions.enterEmployeeName(EmployeeFullName);
            employeeClaimsPage.actions.clickSearchBTN();
            employeeClaimsPage.viewClaimDetails(1);

            // The admin approve the claim request
            submitClaimPage.actions.clickApproveClaim();
            cy.wait(2000); // dynamic wait is zift elteen

            // Assertions for expense date and mount
            submitClaimPage.checkCellValue(1, 'Date', expense.date)
            submitClaimPage.checkCellValue(1, 'Amount', expense.amount)
            cy.wait(2000); // dynamic wait is zift elteen

            // go back to employee claims page
            submitClaimPage.actions.clickBackBTN();

            // Search for the employee
            employeeClaimsPage.actions.enterEmployeeName(EmployeeFullName);
            employeeClaimsPage.actions.clickSearchBTN();

            // Assertions on status and amount
            employeeClaimsPage.checkCellValue(1, 'Status', 'Paid');
            employeeClaimsPage.checkCellValue(1, 'Amount', expense.amount);
        })

        cy.logout();
    })

    it('Submitted claim request Rejection flow', () => {
        cy.get('@testData').then((testData: any) => {
            let user = testData.user;
            let employee = testData.employee;
            let expense = testData.expense;
            let claimRequest = testData.claimRequest;

            // Login with new user
            cy.login(user.username, user.password);

            // create a claim request
            submitClaimPage.createClaimRequest(claimRequest).then((claimId: number) => {

                // Add an expense
                submitClaimPage.addExpense(expense, claimId);

                // Submit the claim request
                submitClaimPage.submitClaim(claimId);
            })

            // Switch to admin
            cy.logout();
            cy.login();

            // The admin search for submitted claim            
            employeeClaimsPage.visitPage();
            const EmployeeFullName: string = employee.firstName + ' ' + employee.middleName + ' ' + employee.lastName;
            employeeClaimsPage.actions.enterEmployeeName(EmployeeFullName);
            employeeClaimsPage.actions.clickSearchBTN();
            employeeClaimsPage.viewClaimDetails(1);

            // The admin approve the claim request
            submitClaimPage.actions.clickRejectClaim();
            cy.wait(2000); // dynamic wait is zift elteen

            // Assertions for expense date and mount
            submitClaimPage.checkCellValue(1, 'Date', expense.date)
            submitClaimPage.checkCellValue(1, 'Amount', expense.amount)
            cy.wait(2000); // dynamic wait is zift elteen

            // go back to employee claims page
            submitClaimPage.actions.clickBackBTN();

            // Search for the employee
            employeeClaimsPage.actions.enterEmployeeName(EmployeeFullName);
            employeeClaimsPage.actions.clickSearchBTN();

            // Assertions on status and amount
            employeeClaimsPage.checkCellValue(1, 'Status', 'Rejected');
            employeeClaimsPage.checkCellValue(1, 'Amount', expense.amount);
        })

        cy.logout();
    })

    it('Initiated claim request Approval flow', () => {
        cy.get('@testData').then((testData: any) => {
            let user = testData.user;
            let employee = testData.employee;
            let expense = testData.expense;
            let claimRequest = testData.claimRequest;

            // Login with new user
            cy.login(user.username, user.password);

            // The user initiates a claim request
            submitClaimPage.createClaimRequest(claimRequest).then((claimId: number) => {
                
                // The user add a new expense
                submitClaimPage.addExpense(expense, claimId);
            })

            // Switch to admin
            cy.logout();
            cy.login();

            // The admin search for initiated claim
            employeeClaimsPage.visitPage();
            const EmployeeFullName: string = employee.firstName + ' ' + employee.middleName + ' ' + employee.lastName;
            employeeClaimsPage.actions.enterEmployeeName(EmployeeFullName);
            employeeClaimsPage.actions.clickSearchBTN();
            employeeClaimsPage.viewClaimDetails(1);

            // The admin submit the claim request
            submitClaimPage.actions.clickSubmitClaim();
            cy.wait(2000); // dynamic wait is zift elteen
            
            // Assertions for expense date and mount
            submitClaimPage.checkCellValue(1, 'Date', expense.date)
            submitClaimPage.checkCellValue(1, 'Amount', expense.amount)
            cy.wait(2000); // dynamic wait is zift elteen
            
            // go back to employee claims page
            submitClaimPage.actions.clickBackBTN();

            // Search for the employee
            employeeClaimsPage.actions.enterEmployeeName(EmployeeFullName);
            employeeClaimsPage.actions.clickSearchBTN();

            // Assertions on status and amount
            employeeClaimsPage.checkCellValue(1, 'Status', 'Paid');
            employeeClaimsPage.checkCellValue(1, 'Amount', expense.amount);
        })

        cy.logout();
    })

})