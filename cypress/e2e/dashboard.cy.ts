import { dashboard } from "../pages/DashboardPage.ts";
import { ultils } from "../utils/utilities.ts";

let widgetsData: any;

describe("Dashboard Page Widgets under User role ", () => {

    before(() => {
        cy.fixture('dashboard/widgetsForUser').then(data => widgetsData = data);
        cy.loginAsUser();
    })


    it('Verify Widget Headers on Dashboard page under User role', () => {
        dashboard.verifyWidgetHeaderShouldExist(widgetsData.widgetHeaders);
    });

})


describe("Dashboard Page Widgets under Admin role", () => {

    before(() => {
        cy.fixture('dashboard/widgetsForAdmin').then(data => widgetsData = data);
        cy.loginAsAdmin();
    })


    it('Verify Widget Headers on Dashboard page under Admin role', () => {
        dashboard.verifyWidgetHeaderShouldExist(widgetsData.widgetHeaders);
    });

})


