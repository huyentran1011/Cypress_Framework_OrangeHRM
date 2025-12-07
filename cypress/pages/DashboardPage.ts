import { BasePage } from "./BasePage.ts";
import { ultils } from "../utils/utilities.ts";

export class Dashboard extends BasePage {
    private widgetHeader(){
        return cy.get('div.orangehrm-dashboard-widget-header').find('p.oxd-text');
    }

    private widgetBody(){
        return cy.get('div.oxd-dashboard-widget__body');
    }

    /** ACTIONS */

    getWidgetHeaders() {
        const headers: string[] = [];
        this.widgetHeader().each(($el) => {
            headers.push($el.text());
        });
        return cy.wrap(headers);
    }

    /** ASSERTIONS  */

    verifyWidgetHeaderShouldExist(expectedheaderTexts: Array<string>) {
        const actualHeaders: string[] = [];
        this.widgetHeader().each(($el) => {
            actualHeaders.push($el.text().trim());
        }).then(() => {
            ultils.compareArrays(expectedheaderTexts, actualHeaders);
        });
    }
}

export const dashboard = new Dashboard();
