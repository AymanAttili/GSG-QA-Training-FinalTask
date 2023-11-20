import JobTitlesPage from "cypress/support/PageObjects/Admin/Job/JobTitlesPage";
import LocationsPage from "cypress/support/PageObjects/Admin/Organization/LocationsPage";
import Navbar from "cypress/support/PageObjects/Navbar";
import AddEmployeePage from "cypress/support/PageObjects/PIM/AddEmployeePage";
import AddReportPage from "cypress/support/PageObjects/PIM/Reports/AddReportPage";
import JobPage from "cypress/support/PageObjects/PIM/EditEmployee/JobPage";
import SalaryPage from "cypress/support/PageObjects/PIM/EditEmployee/SalaryPage";
import ReportsPage from "cypress/support/PageObjects/PIM/ReportsPage";
import Sidebar from "cypress/support/PageObjects/Sidebar";
import ViewReportPage from "cypress/support/PageObjects/PIM/Reports/ViewReportPage";

const jobTitlesPage: JobTitlesPage = new JobTitlesPage();
const locationsPage: LocationsPage = new LocationsPage();
const addEmployeePage: AddEmployeePage = new AddEmployeePage()
const jobPage: JobPage = new JobPage();
const sidebar: Sidebar = new Sidebar();
const navbar: Navbar = new Navbar();
const reportsPage: ReportsPage = new ReportsPage();
const salaryPage: SalaryPage = new SalaryPage();
const addReportPage: AddReportPage = new AddReportPage();
const viewReportPage: ViewReportPage = new ViewReportPage();

let empNums: number[] = [];
let locId: number;
let jobId: number;
let repId: number;
const reportName: string = `3llawi's Report`
const displayFields = [
    {
        group: 'Personal',
        title: 'Employee First Name'
    },
    {
        group: 'Job',
        title: 'Job Title'
    },
    {
        group: 'Salary',
        title: 'Amount'
    }
]

describe('Phase 1', () => {
    before(() => {
        // login as an admin
        cy.login();


        // declaring fixtures
        cy.fixture('jobTitleData').as('jobTitle');
        cy.fixture('locationData').as('location');
        cy.fixture('employeesData').as('employees');
        cy.fixture('salaryComponentData').as('salaryData');


        // declaring interceptions
        cy.intercept('/web/index.php/pim/displayPredefinedReport/*').as('newReport');
        cy.intercept('POST', '/web/index.php/api/v2/pim/reports/defined').as('reportAPI');


        // create a job title
        cy.get('@jobTitle').then((jobTitleData: any) => {
            jobTitlesPage.createJobTitle(jobTitleData).then((jobTitleId) => {
                // save the id to associate it with employees
                jobTitleData.id = jobTitleId;
                jobId = jobTitleId;
            });


            // create a location
            cy.get('@location').then((locationData: any) => {
                locationsPage.createLocation(locationData).then((locationId) => {
                    // save the id to associate it with employees
                    locationData.id = locationId;
                    locId = locationId
                });


                // create employees
                cy.get('@employees').then((empsData: any) => {
                    empsData.data.map((empData: any) => {


                        // create an employee
                        addEmployeePage.createEmployee(empData).then((empNumber: number) => {
                            empNums.push(empNumber);


                            // add job details
                            jobPage.createJobDetails(empNumber, jobTitleData.id, locationData.id);


                            // add salary component
                            cy.get('@salaryData').then((salaryData: any) => {
                                salaryPage.addSalaryComponent(salaryData, empNumber);
                            })
                        });
                    })

                })
            })
        })


        // to create a folder for allure-report
        cy.task('createTaskReportFolder', 'Phase1');

    })


    after(() => {

        // delete created data
        addEmployeePage.deleteEmployees(empNums);
        locationsPage.deleteLocation(locId);
        jobTitlesPage.deleteJobTitle(jobId);
        reportsPage.deleteReport(repId);

    })


    it('Phase 1: generate-employee-report', () => {
        
        // fetching data to make assertions
        cy.get('@jobTitle').then((jobTitleData: any) => {
            cy.get('@location').then((locationData: any) => {
                cy.get('@salaryData').then((salaryData: any) => {


                    // Go to PIM Page
                    sidebar.visitPage('PIM');


                    // Access Reports and create a new one.
                    navbar.clickBTN('Reports');
                    reportsPage.actions.clickAddReportBTN();
                    addReportPage.actions.enterReportName(reportName)


                    // Select the Search Criteria (Job Title, Location).
                    addReportPage.addSelectionCriteria('Job Title')
                    addReportPage.addCriteriaValue(jobTitleData.title, 2)
                    addReportPage.addSelectionCriteria('Location');
                    addReportPage.addCriteriaValue(locationData.name, 3) 


                    // Choose the Display Fields (Personal: First Name / Job: Job Title / Salary: Amount).
                    // Ensure the header for these fields is displayed. ==> you can find it in the function
                    displayFields.map((field: any,ind) => {
                        addReportPage.addDisplayField(field.group,field.title,ind)
                    })


                    // Save the report.
                    addReportPage.actions.clickSave();


                    // to get report id
                    cy.wait('@newReport')
                    cy.url().then((url: any) => {
                        repId = Number(url.split('/').pop());
                    })


                    // Verify the Report Name.
                    viewReportPage.actions.checkReportName(reportName)


                    // Confirm the correctness of the headers.
                    displayFields.map((field: any) => {
                        viewReportPage.checkHeaderCorrectness(field.group, field.title);
                    })


                    // Validate the values in the table rows.
                    cy.get('@employees').then((empsData: any) => {
                        empsData.data.map((empData: any) => {
                            viewReportPage.getEmployeeRowNum(empData.firstName).then((rowNum: any) => {
                                viewReportPage.actions.checkCell(rowNum, 'Employee First Name', empData.firstName);
                                viewReportPage.actions.checkCell(rowNum, 'Job Title', jobTitleData.title);
                                viewReportPage.actions.checkCell(rowNum, 'Amount', salaryData.salaryAmount);
                            })
                        })


                        // Verify the quantity of rows in the report.
                        viewReportPage.elements.table.row().should('have.length', empsData.data.length);
                    })                    
                })
            })
        })
    })
})