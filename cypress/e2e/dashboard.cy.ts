import { dashboard } from "../pages/DashboardPage.ts";
import { loginPage } from "../pages/LoginPage.ts";

const roles = [
    {
        role: 'user',
        username: 'anna1011',
        password: 'Annatran1011@X',
        widgets: ['Time At Work', 'My Actions', 'Quick Launch', 'Employees on Leave Today']
    },
    {
        role: 'admin',
        username: 'automationfc',
        password: 'orangehrm5@X',
        widgets: ['Time At Work', 'My Actions', 'Quick Launch', 'Employees on Leave Today', 'Employee Distribution by Sub Unit', 'Employee Distribution by Location',]
    }

];

roles.forEach(({ role, username, password, widgets }) => {
    describe(`Dashboard Page Widgets - ${role}`, () => {

        beforeEach(() => {
            loginPage.loginToSystem(username, password);
        })


        it('Verify Widget Headers on Dashboard page', () => {
            dashboard.verifyWidgetHeaderShouldExist(widgets);
        });

    });

})
