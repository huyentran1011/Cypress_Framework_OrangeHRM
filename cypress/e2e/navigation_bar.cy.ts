import { navigationBar } from "../pages/NavigationBar.ts";
import { loginPage } from "../pages/LoginPage.ts";
import { maintenanceLoginPage } from "../pages/admin/MaintenanceLoginPage.ts";

const roles = [
    {
        role: 'user',
        username: 'anna1011',
        password: 'Annatran1011@X',
        menuItems: ['Leave', 'Time', 'My Info', 'Performance', 'Dashboard', 'Directory', 'Buzz']
    },
    {
        role: 'admin',
        username: 'automationfc',
        password: 'orangehrm5@X',
        menuItems: ['Admin', 'PIM', 'Leave', 'Time', 'Recruitment', 'My Info', 'Performance', 'Dashboard', 'Directory', 'Maintenance', 'Buzz'],
    }
]
const selectedMenuColor = 'rgb(255, 255, 255)';
const unselectedMenuColor = 'rgb(100, 114, 140)';
const fullKeyword = 'Time';
const partialKeyword = 'nce';
const notFoundKeyword = 'support';

roles.forEach(({ role, username, password, menuItems }) => {
    describe(`Navigation Bar - ${role}`, () => {

        beforeEach(() => {
            loginPage.loginToSystem(username, password);
        })

        it('Verify Navigation Menu items under User Account', () => {
            navigationBar.verifySearchTexboxShouldBeVisible();
            navigationBar.verifyMenuItemsShouldHaveLength(menuItems.length);
            navigationBar.verifyMenuShouldHaveItems(menuItems);
        })

        it('Verify default selected Menu item when login by User Account', () => {
            const selectedMenuItem = 'Dashboard';
            const unSelectedMenuItems = menuItems.filter(item => item !== selectedMenuItem);
            navigationBar.verifySelectedMenuItemShouldBeActive(selectedMenuItem);
            navigationBar.verifyUnselectedMenuItems(unSelectedMenuItems);
            navigationBar.verifyUnselectedMenuItemColor(unselectedMenuColor);
        })

        it('Verify Navigation Menu actions under User Account', () => {
            // Current, Leave menu is error when clicking under user role, so I remove it in this test case
            const tempMenuItems = menuItems.filter(item => item !== 'Leave');

            tempMenuItems.forEach(menuItem => {
                navigationBar.clickMenuItem(menuItem);
                if (menuItem == 'Maintenance') {
                    loginPage.shouldCurrentURLContainsText('/maintenance/purgeEmployee');
                    maintenanceLoginPage.loginToAdministrator(username, password);
                }
                navigationBar.verifySelectedMenuItemShouldBeActive(menuItem);
                navigationBar.verifySelectedMenuItemColor(selectedMenuColor);

                const otherMenuItems = menuItems.filter(item => item !== menuItem);
                navigationBar.verifyUnselectedMenuItems(otherMenuItems);
                navigationBar.verifyUnselectedMenuItemColor(unselectedMenuColor);
            })
        })
    })


    describe(`Search function in Navigation Bar - ${role}`, () => {
        beforeEach(() => {
            loginPage.loginToSystem(username, password);
        })

        it('Verify Search functionality when Keyword is Full', () => {
            const expectedMenuItems = menuItems.filter(item => item.includes(fullKeyword));
            navigationBar.enterSearchKeyword(fullKeyword);
            navigationBar.verifyMenuItemsShouldHaveLength(expectedMenuItems.length);
            navigationBar.verifyMenuShouldHaveItems([fullKeyword]);
        })

        it('Verify Search functionality when Keyword is Partial', () => {
            const expectedMenuItems = menuItems.filter(item => item.includes(partialKeyword));

            navigationBar.enterSearchKeyword(partialKeyword);
            navigationBar.verifyMenuItemsShouldHaveLength(expectedMenuItems.length);
            navigationBar.verifyMenuShouldHaveItems(expectedMenuItems);
        })

        it('Verify Search functionality when Result is Not Found', () => {

            navigationBar.enterSearchKeyword(notFoundKeyword);
            navigationBar.verifynMenuItemsShouldNotExist();
        })
    })


    describe(`Toggle Button in Navigation Bar - ${role}`, () => {
        beforeEach(() => {
            loginPage.loginToSystem(username, password);
        })

        it('Verify Toggle button functionality', () => {

            // Collapse the navigation bar
            navigationBar.clickToogleButton();
            navigationBar.verifyMenuItemsShouldHaveLength(menuItems.length);
            navigationBar.verifyMenuIconShouldBeVisible();
            navigationBar.verifyMenuNameShouldBeUndisplayed();

            // Expand the navigation bar
            navigationBar.clickToogleButton();
            navigationBar.verifyMenuIconShouldBeVisible();
            navigationBar.verifyMainMenuNameShouldBeDisplayed();
        })
    })
})


