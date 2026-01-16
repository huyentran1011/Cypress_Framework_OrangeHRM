import { defineConfig } from "cypress";
import fs from 'fs';
import path from 'path';
import mysql from 'mysql2/promise';


export default defineConfig({
  e2e: {
    baseUrl: 'http://localhost:86/orangehrm5',
    env: {
      envName: 'qa'
    },
    setupNodeEvents(on, config) {
      let connection: any;

      // on('task', {
      //   async queryDatabase({ query, values }) {
      //     if (!connection) {
      //       connection = await mysql.createConnection({
      //         host: 'localhost',
      //         port: 3309,
      //         user: 'root',
      //         password: '12345',
      //         database: 'orangehrm5'
      //       });
      //     }

      //     const [rows] = await connection.execute(query, values);
      //     return rows;
      //   }
      // }); 

      const pool = mysql.createPool({
        host: 'localhost',
        port: 3309,
        user: 'root',
        password: '12345',
        database: 'orangehrm5',
        waitForConnections: true,
        connectionLimit: 5,
        queueLimit: 0
      });

      on('task', {
        async queryDatabase({ query, values }) {
          try {
            const [rows] = await pool.execute(query, values);
            return rows;
          } catch (err) {
            console.error('Database Task Error:', err);
            throw err;
          }
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
})
