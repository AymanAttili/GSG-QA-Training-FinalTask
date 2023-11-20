const { defineConfig } = require("cypress");
import { configureAllureAdapterPlugins } from '@mmisty/cypress-allure-adapter/plugins';
const fs = require('fs-extra');

module.exports = defineConfig({
  projectId: "afqxok",
  e2e: {
    specPattern: 'cypress/e2e/**/*.{js,jsx,ts,tsx}',
    baseUrl: "https://opensource-demo.orangehrmlive.com",
    setupNodeEvents(on:any, config:any) {
      configureAllureAdapterPlugins(on, config);
      require('@cypress/grep/src/plugin')(config);

      // Create Task Reports directory before each run
      const taskReportsDir = './TaskReports';
      fs.ensureDirSync(taskReportsDir);
      on('task', {
        createTaskReportFolder: (taskName: string) => {
          const taskReportFolder = `${taskReportsDir}/${taskName}`;
          fs.ensureDirSync(taskReportFolder);
          return null;
        }
      })
      return config;
    },
    env: {
      allure: true,
      allureResultsPath: "allure-results",
      download_dir: './cypress/downloads',
      // allureReuseAfterSpec: true
    },
    reporter: 'mochawesome',
    reporterOptions: {
      mochaFile: 'cypress-results/cypress-report.xml',
      reportDir: 'cypress/results/mochawesome',
      overWrite: false,
      html: false,
      json: true,
      toConsole: true
    },
    video: true,
    videosFolder: 'videos/',
    screenshotOnRunFailure: true,  
    allureAttachRequests:true
  },
});