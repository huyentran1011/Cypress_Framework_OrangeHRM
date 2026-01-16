import { navigationBar } from "../../pages/NavigationBar.ts";
import { loginPage } from "../../pages/LoginPage.ts";
import { maintenanceLoginPage } from "../../pages/admin/maintenance/MaintenanceLoginPage.ts";


const selectedMenuColor = 'rgb(255, 255, 255)';
const unselectedMenuColor = 'rgb(100, 114, 140)';
const fullKeyword = 'Time';
const partialKeyword = 'nce';
const notFoundKeyword = 'support';

let menuItemsData: any;
let adminAcount: any;
let keywordData: any;

describe("Navigation Bar under Admin acount", () => {

    beforeEach(() => {
        cy.fixture('navigationBar/menuItemsForAdmin').then(data => menuItemsData = data.menuItems);
        cy.fixture('auth/admin').then(data => adminAcount = data);
        cy.loginAsAdmin();
    })

    it('Verify Navigation Menu items under Admin account', () => {
        navigationBar.verifySearchTexboxShouldBeVisible();
        navigationBar.verifyMenuItemsShouldHaveLength(menuItemsData.length);
        navigationBar.verifyMenuShouldHaveItems(menuItemsData);
    })

    it('Verify default selected Menu item when login by Admin account', () => {
        const selectedMenuItem = 'Dashboard';
        const unSelectedMenuItems = menuItemsData.filter((item: string) => item !== selectedMenuItem);
        navigationBar.verifySelectedMenuItemShouldBeActive(selectedMenuItem);
        navigationBar.verifyUnselectedMenuItems(unSelectedMenuItems);
        navigationBar.verifyUnselectedMenuItemColor(unselectedMenuColor);
    })

    it(`Verify Navigation Menu actions under Admin account`, () => {

        menuItemsData.forEach((menuItem: string) => {
            navigationBar.clickMenuItem(menuItem);
            if (menuItem == 'Maintenance') {
                loginPage.shouldCurrentURLContainsText('/maintenance/purgeEmployee');
                maintenanceLoginPage.loginToAdministrator(adminAcount.username, adminAcount.password);
            }
            navigationBar.verifySelectedMenuItemShouldBeActive(menuItem);
            navigationBar.verifySelectedMenuItemColor(selectedMenuColor);

            const otherMenuItems = menuItemsData.filter((item: string) => item !== menuItem);
            navigationBar.verifyUnselectedMenuItems(otherMenuItems);
            navigationBar.verifyUnselectedMenuItemColor(unselectedMenuColor);
        })
    })
})

describe("Search function in Admin Navigation Bar", () => {
    beforeEach(() => {
        cy.fixture('navigationBar/menuItemsForAdmin').then(data => menuItemsData = data.menuItems);
        cy.fixture('navigationBar/search').then(data => keywordData = data);
        cy.loginAsAdmin();
    })

    it('Verify Search functionality when Keyword is Full', () => {
        const expectedMenuItems = menuItemsData.filter((item: string) => item.includes(keywordData.fullMatchKeyword));
        navigationBar.enterSearchKeyword(fullKeyword);
        navigationBar.verifyMenuItemsShouldHaveLength(expectedMenuItems.length);
        navigationBar.verifyMenuShouldHaveItems([fullKeyword]);
    })

    it('Verify Search functionality when Keyword is Partial', () => {
        const expectedMenuItems = menuItemsData.filter((item: string) => item.includes(keywordData.partialMatchKeyword));

        navigationBar.enterSearchKeyword(partialKeyword);
        navigationBar.verifyMenuItemsShouldHaveLength(expectedMenuItems.length);
        navigationBar.verifyMenuShouldHaveItems(expectedMenuItems);
    })

    it('Verify Search functionality when Result is Not Found', () => {

        navigationBar.enterSearchKeyword(keywordData.notFoundKeyword);
        navigationBar.verifynMenuItemsShouldNotExist();
    })
})

describe('Toggle Button in Admin Navigation Bar', () => {
    beforeEach(() => {
        cy.loginAsAdmin();
        cy.fixture('navigationBar/menuItemsForAdmin').then(data => menuItemsData = data.menuItems);
    })

    it('Verify Toggle button functionality', () => {

        // Collapse the navigation bar
        navigationBar.clickToogleButton();
        navigationBar.verifyMenuItemsShouldHaveLength(menuItemsData.length);
        navigationBar.verifyMenuIconShouldBeVisible();
        navigationBar.verifyMenuNameShouldBeUndisplayed();

        // Expand the navigation bar
        navigationBar.clickToogleButton();
        navigationBar.verifyMenuIconShouldBeVisible();
        navigationBar.verifyMainMenuNameShouldBeDisplayed();
    })
})


