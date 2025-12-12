import { defineConfig } from "cypress";
import fs from 'fs';
import path from 'path';
// import mysql from "mysql2/promise";
import type { RowDataPacket, OkPacket } from 'mysql2';

const mysql = require('mysql2');

export default defineConfig({
  e2e: {
    baseUrl: 'http://localhost:86/orangehrm5',
    env: {
      envName: 'qa'
    },
    setupNodeEvents(on, config) {

      /**  The connection strings for different databases could come from the Cypress configuration or from environment variables */
      const connections = {
        stagingA: {
          host: '127.0.0.1',
          port: 3309,
          user: 'root',
          password: '12345',
          database: 'orangehrm5',
        },
        stagingB: {
          host: 'localhost',
          port: 3309,
          user: 'root',
          password: '12345',
          database: 'orangehrm5',
        },
      }

      /** Connecting the database from Node */
      const connection = mysql.createConnection(connections.stagingA);

      /** Register queryDatabase task */
      on('task', {
        // destructure the argument into the individual fields
        queryDatabase({ query }) {
          return new Promise((resolve, reject) => {
            connection.query(query, (error: Error | null, results: RowDataPacket[] | OkPacket) => {
              if (error) {
                return reject(error);
              }
              resolve(results);
            });
          });
        }
      });

      /** Handle dynamic report paths */
      if (config.env.reportDir) {
        config.reporterOptions.reportDir = config.env.reportDir;
        config.screenshotsFolder = config.env.screenshotsDir;
      }
      /** Register mochawesome reporter */
      require("cypress-mochawesome-reporter/plugin")(on);

      return config;

    },

    watchForFileChanges: false,
    downloadsFolder: "cypress/downloads",
  },


  /** Mochawesome reporter configuration */
  reporter: "cypress-mochawesome-reporter",
  reporterOptions: {
    reportDir: "cypress/reports", // default; overridden dynamically
    screenshotsFolder: "cypress/reports/screenshots", // default; overridden dynamically
    videosFolder: "cypress/reports/videos",
    embeddedScreenshots: true,
    video: true,
    charts: true,
    overwrite: false,
    html: true,
    json: true,
    inlineAssets: true,
  },
  env: {
    reportDir: "",
    screenshotsDir: "",
    videosFolderDir: "",
  },
});
