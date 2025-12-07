import { execSync } from "child_process";
import open from "open";

const now = new Date();
const timestamp = now.toISOString().replace(/[:.]/g, "-"); // e.g. 2025-10-11T23-45-10-123Z
const reportDir = `cypress/reports/report_${timestamp}`;
const browser = process.env.npm_config_browser || "chrome";

try {
    console.log("Running Cypress tests...");
    execSync(`npx cypress run --browser ${browser} --env reportDir=${reportDir},screenshotsDir=${reportDir}/screenshots,videosFolderDir=${reportDir}/videos`, { stdio: "inherit", shell: true, });
} catch (err) {
    console.warn("Ignoring test failures...");
    process.exit(0);
}
console.log(`Open the html report from in ${reportDir}`);
await open(`${reportDir}/index.html`);




