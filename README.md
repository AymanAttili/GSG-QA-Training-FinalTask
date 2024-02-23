Automation E2E Final Task
FALL SEMESTER 2023

Gaza Sky Geeks

2 Nov 2023



Dears Students,

This Document contains the final task which is split into 3 phases, each one has its deadline, Requirements, and what is expected as a final result.

Also, some notes should be considered in each phase, to make sure that all of us follow the best practice, naming convention, and scaffolding structure.

Expectation from this task:

Complete the whole tasks as in the requirement
Follow the best practice that we learn in training lectures
Follow the automation guidelines that mentioned below
Open a new Repo for this task
Each Phase should have one PR (without merging to master branch)
Each Task Should have a separate report attached in a folder called (Task Reports)
When you finish the Task you should have a full report with all cases (Full Report)
All PreRequisites should be Done as API
Use AfterEach approach to delete what you create
Formatting Files very important
Deadlines are provided per task
Optional Task 

Integrate Your Git Repo and tests with jenkins, run the Job in the last phase with all cases you have..
Let's start !



 Automation Code Guidelines

Naming conventions make programs more understandable by making them easier to read/understandable. They can also give information about the function of the identifier, for example, whether it's a class, interface, function, or variables, which can be helpful in understanding the code.

 Folders and files should be named using camel-case.
Specs files: camel-case-spec.cy.ts
Helpers files: camel-case-helper.ts
Pages files: camel-case-page.ts
Dialogs files: camel-case-dialog.ts
Classes should be named using CamelCase:
Pages classes : CamelCasePage
Helpers classes : CamelCaseHelper
Dialog classes: CamelCaseDialog        
Variables/Objects should be named using camelCase
Constants should be named using CAMEL_CASE
Functions/Methods should be named with camelCase
It’s better to avoid the use of digits in variable names.
The names of the functions should describe the reason for using the function clearly and briefly.
Code should be well documented:
 The code should be properly commented for easy understanding.
 All exported methods and classes should be documented with a clear and brief description of the reason for using it.
Length of functions shouldn’t be very large.
Branch Naming Convention:

feature/module/owner is for adding new test cases
fix/module/owner is for fixing the existing TCs is for fixing issues in the code
Commit Messages: A commit message should start with a category of change, you can pretty much use the following 4 categories:

Feature {brief description} is for adding new feature/testCases/suites .etc
Fix {brief description} is for fixing a test issue.  
Phase 1 (TimeSheet/ Reports)
Deadline: 08 November 2023

Test case: Generate an Employee report with search criteria by (Personal : First name/ Job: Job title/ Salary:Amount)

PreRequisites:
Create 1 Location.
Create 1 Job Title.
Create 3 Employees and associate them with the created location and job title.
Add First Name, Job Title, and Salary Amount to each employee.
Steps:
Go to the PIM section.
Access Reports and create a new one.
Select the Search Criteria (Job Title, Location).
Choose the Display Fields (Personal: First Name / Job: Job Title / Salary: Amount).
Ensure the header for these fields is displayed.
Save the report.
Expected:
Verify the Report Name.
Confirm the correctness of the headers.
Validate the values in the table rows.
Verify the quantity of rows in the report.



Phase 2 (Claims)
Deadline: 11 November 2023

Write (2) Manual Test Cases in details and Implement Cypress Tests for (2) Claims Request Approval and (2) Rejection flow, which validate the rows in Claims table for approved and rejected claims, including status, date, and the amount for each row





Phase 3 (Managing Candidate Statuses)
Deadline: 15 November 2023 
In this phase, make sure to follow these instructions:
Set up a new repository for Cypress and install the cucumber preprocessor by following the instructions at https://www.npmjs.com/package/cypress-cucumber-preprocessor.
Push all the necessary files and configurations to the GitHub repository, and proceed with the task using a new pull request (PR).
Part 1: Test case: Candidate Interview Result Verification (Pass/Fail).

PreRequisites:
Create the test needs (Employee/Job Title/Vacancy).
Prepare the candidate needs until it has “Interview Scheduled” status.
Steps:
Log in as an Admin.
Access the candidate form.
Change the candidate status to "Interview Passed".
Change the candidate status to "Interview Failed".
Expected
The Admin should successfully transition the candidate's status to both "Interview Passed" and "Interview Failed".
Emphasize the modification of status only. Highlight the available button options for each status. No further action required on the respective status pages.




Part 2: Test case: Verify that the user can upload a txt file for Application Initiated and Hired statuses.

PreRequisites:
Create the test needs (Employee/Job Title/Vacancy).
Prepare the candidate needs until it has “Interview Scheduled” status.
Steps:
Log in as an Admin.
Access the candidate form.
Enable Edit candidate switch.
Upload a txt file to the Resume section.
Save the form. Download the uploaded file and verify its content matches the uploaded data.
Expected
The uploaded file should contain the same data as was uploaded.
This process should be tested for Application Initiated and Hired statuses only.
