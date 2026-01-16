import { Textbox } from "../../components/Textbox.ts";
import { Button } from "../../components/Button.ts";
import { DropdownMenu } from "../../components/DropdownMenu.ts";
import { BasePage } from "../BasePage.ts";
import type { DirectoryEmployee } from "../../support/database/employee/employee.types.ts";
import 'cypress-wait-until';
import { utils } from "../../utils/utilities.ts";


export class DirectoryPage extends BasePage {
    /** COMPONENT LOCATORS */
    employeeNameTbx = new Textbox('Employee Name');
    jobTitleDbx = new DropdownMenu('Job Title');
    locationDbx = new DropdownMenu('Location');
    searchBtn = new Button('Search');
    resetBtn = new Button('Reset');

    /** PAGE ONLY LOCATORS */
    private pageHeader() {
        return cy.get('h5.oxd-table-filter-title');
    }

    private searchEmployeeList() {
        return cy.get('div[role="option"]');
    }

    private recordsFoundMessage() {
        return cy.contains('span', 'Found');
    }

    private searchResultsContainer() {
        return cy.get('div.orangehrm-container');
    }

    private directoryCards() {
        return cy.get('div.orangehrm-directory-card');
    }

    private employeeNameInDirectoryCard = 'p.orangehrm-directory-card-header';

    private subTitleInDirectoryCard = 'p.orangehrm-directory-card-subtitle';

    private locationInDirectoryCard = 'p.orangehrm-directory-card-description';

    //** ACTIONS */
    enterEmployeeName(empFirstname: string, empMiddlename: string, empLastname: string) {
        const employeeName = [empFirstname, empMiddlename, empLastname]
            .filter(name => name && name.trim() !== "")
            .join(" ");
        cy.log("Employee name: " + employeeName)
        this.employeeNameTbx.type(employeeName);
    }

    enterAndSelectEmployeeName(employeeFirstName: string, employeeMiddleName: string, employeeLastName: string) {
        let employeeName = `${employeeFirstName} ${employeeMiddleName} ${employeeLastName}`;
        employeeName = employeeName.trim();

        if (employeeName !== "") {
            this.employeeNameTbx.type(employeeFirstName);
            this.searchEmployeeList().contains('Searching...').should('not.exist');
            this.searchEmployeeList().each((employee) => {
                cy.wrap(employee).then(($el) => {
                    const text = $el.text().trim();
                    if (text === 'No Records found') {
                        return;
                    } else if (text === employeeName) {
                        cy.wrap($el).click();
                        this.searchEmployeeList().should('not.exist');
                    }
                });
            });
        } else {
            cy.log('No employee name selected');
            return;
        }

    }
    selectJobTitle(jobTitle: string) {
        if (jobTitle !== "") {
            return this.jobTitleDbx.selectOption(jobTitle);
        }
        cy.log('No job title selected');
        return;
    }

    selectLocation(location: string) {
        if (location !== "") {
            return this.locationDbx.selectOption(location);
        }
        cy.log('No location selected');
        return
    }

    clickSearchButton() {
        this.searchBtn.click();
    }

    clickResetButton() {
        this.resetBtn.click();
    }
    //** ASSERTIONS */

    verifyPageHeaderShouldBe(header: string) {
        this.pageHeader().should('have.text', header);
    }

    verifyEmployeeErrorMessage(errorMessage: string) {
        return this.employeeNameTbx.shouldHaveErrorMessage(errorMessage);

    }

    verifyEmployeeErrorMsgColor(color: string) {
        return this.employeeNameTbx.shouldErrorMessageColor(color);
    }

    verifyNumberRecordFoundMessageShouldBeCorrect(numberRecordFound: number) {
        this.recordsFoundMessage().should((element) => {
            const textMessage = element.text().trim();
            if (numberRecordFound === 0) {
                expect(textMessage).to.equal('No Records Found');
            } else if (numberRecordFound === 1) {
                expect(textMessage).to.equal('(1) Record Found');
            } else {
                expect(textMessage).to.equal(`(${numberRecordFound}) Records Found`);
            }
        });
    }

    verifyNumberOfDirectoryCardsShouldBe(expectedNumberCard: number) {
        const scrollAndWait = () => {
            this.searchResultsContainer()
                .scrollTo('bottom', { ensureScrollable: false });

            this.directoryCards()
                .find(this.employeeNameInDirectoryCard)
                .should('have.length.at.least', expectedNumberCard);
        };

        scrollAndWait();

        this.directoryCards()
            .find(this.employeeNameInDirectoryCard)
            .should('have.length', expectedNumberCard);
    }
    verifyDirectoryCardInfoShouldBeCorrect(expectedSearchResults: DirectoryEmployee[]) {
        const actualSearchResults: DirectoryEmployee[] = [];

        return this.directoryCards().each((card) => {
            const empFullname = Cypress.$(card).find(this.employeeNameInDirectoryCard).text().trim();
            const subTitle = Cypress.$(card).find(this.subTitleInDirectoryCard).text().trim();
            const department = Cypress.$(card).find(this.locationInDirectoryCard).first().text().trim();
            const location = Cypress.$(card).find(this.locationInDirectoryCard).last().text().trim();
            actualSearchResults.push({ empFullname, subTitle, department, location });
        }).then(() => {
            const actual = this.sortEmployees(actualSearchResults);
            const expected = this.sortEmployees(expectedSearchResults);
            expect(actual).to.deep.equal(expected);
        });
    }

    /** Normalizer + sorter helper */
    normalizeEmployee = (e: DirectoryEmployee) => ({
        fullName: utils.normalizeStringType(e.empFullname),
        jobTitle: e.subTitle.trim(),
        department: e.department !== null ? e.department.trim() : null,
        location: e.location.trim()
    });

    sortEmployees = (arr: DirectoryEmployee[]) => {
        if (!Array.isArray(arr)) {
            throw new Error(`sortEmployees expected array but got: ${typeof arr}`);
        }

        return arr
            .map(this.normalizeEmployee)
            .sort((a, b) =>
                `${a.fullName}|${a.jobTitle}|${a.department}|${a.location}`
                    .localeCompare(
                        `${b.fullName}|${b.jobTitle}|${b.department}|${b.location}`
                    )
            );

    }
}
export const directoryPage = new DirectoryPage();