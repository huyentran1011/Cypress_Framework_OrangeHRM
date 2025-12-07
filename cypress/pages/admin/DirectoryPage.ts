import { Textbox } from "../../components/Textbox.ts";
import { Button } from "../../components/Button.ts";
import { DropdownMenu } from "../../components/DropdownMenu.ts";
import { BasePage } from "../BasePage.ts";
import 'cypress-wait-until';

export class DirectoryPage extends BasePage {
    //** COMPONENT LOCATORS */
    employeeNameTbx = new Textbox('Employee Name');
    jobTitleDbx = new DropdownMenu('Job Title');
    locationDbx = new DropdownMenu('Location');
    searchBtn = new Button('Search');
    resetBtn = new Button('Reset');

    //** PAGE ONLY LOCATORS */
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
    enterEmployeeName(employeeName: string) {
        this.employeeNameTbx.type(employeeName);
    }

    enterAndSelectEmployeeName(employeeFirstName: string, employeeMiddleName: string, employeeLastName: string) {
        const employeeName = `${employeeFirstName} ${employeeMiddleName} ${employeeLastName}`;
        this.employeeNameTbx.type(employeeFirstName);
        this.searchEmployeeList().contains('Searching...').should('not.exist');
        this.searchEmployeeList().each((employee) => {
            cy.wrap(employee).then(($el) => {
                const text = $el.text().trim();
                if (text === 'No Records found') {
                    return;
                } else if (text === employeeName) {
                    cy.wrap($el).click();
                }
            });
        });
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

    verifyNumberOfDirectoryCardsShouldBe(expectedNumberCard: number,) {
        const scrollUntilDone = (prevLength = 0) => {
            this.directoryCards().then($cards => {
                const currentLength = $cards.length;

                if (currentLength === expectedNumberCard) {
                    return;
                }

                if (currentLength > prevLength) {
                    this.searchResultsContainer()
                        .scrollTo('bottom', { ensureScrollable: false });

                    cy.wait(5000);
                    scrollUntilDone(currentLength);
                }
            });
        };

        scrollUntilDone();

        this.directoryCards()
            .should('have.length', expectedNumberCard);
    }
    verifyDirectoryCardInfoShouldBeCorrect(expectedSearchResults: Array<{ employeeFullName: string, subTitle: string, department: string, location: string }>) {
        const actualSearchResults: Array<{ employeeFullName: string, subTitle: string, department: string, location: string }> = [];

        return this.directoryCards().each((card) => {
            cy.wrap(card).find(this.employeeNameInDirectoryCard).invoke('text').then((employeeFullName) => {
                cy.wrap(card).find(this.subTitleInDirectoryCard).invoke('text').then((subTitle) => {
                    cy.wrap(card).find(this.locationInDirectoryCard).first().invoke('text').then((department) => {
                        cy.wrap(card).find(this.locationInDirectoryCard).last().invoke('text').then((location) => {
                            employeeFullName = employeeFullName.trim();
                            subTitle = subTitle.trim();
                            department = department.trim();
                            location = location.trim();
                            actualSearchResults.push({
                                employeeFullName,
                                subTitle,
                                department,
                                location
                            });
                            console.log(actualSearchResults)
                            console.log(expectedSearchResults)
                        });
                    });
                });
            });
        }).then(() => {
            expect(actualSearchResults).to.deep.equal(expectedSearchResults);
        });
    }

    verifyAllDirectoryCardsShouldHaveJobTitle(jobTitle: string) {
        this.directoryCards().each((card) => {
            cy.wrap(card).find(this.subTitleInDirectoryCard).should('contain.text', jobTitle);
        });
    }

    verifyAllDirectoryCardsShouldHaveLocation(location: string) {
        this.directoryCards().each((card) => {
            cy.wrap(card).find(this.locationInDirectoryCard).last().should('contain.text', location);
        });
    }
}
export const directoryPage = new DirectoryPage();