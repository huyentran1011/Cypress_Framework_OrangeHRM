import { loginPage } from '../pages/LoginPage.ts';
import { topBar } from '../pages/TopBar.ts';


describe('Test Spec for Login page', () => {
  const errorMsgColor = 'rgb(235, 9, 16)';

  let userAuthData: any, invalidUserAuthData: any, adminAuthData: any, errorMsgData: any;

  before(() => {
    cy.fixture('auth/users').then(data => userAuthData = data);
    cy.fixture('auth/invalidUser').then(data => invalidUserAuthData = data);
    cy.fixture('auth/admin').then(data => adminAuthData = data);
    cy.fixture('messages/error').then(data => errorMsgData = data);
  })

  it('Login with blank username and password', () => {
    loginPage.visitLoginPage();
    loginPage.clickLoginButton();
    loginPage.verifyUsernameErrorMessage(errorMsgData.requiredField);
    loginPage.verifyUsernameErrorMsgColor(errorMsgColor);
    loginPage.verifyPasswordErrorMessage(errorMsgData.requiredField);
    loginPage.verifyPasswordErrorMessageColor(errorMsgColor);
  })

  it('Login with invalid username and password', () => {
    loginPage.visitLoginPage();
    loginPage.enterUsername(invalidUserAuthData.username);
    loginPage.enterPassword(invalidUserAuthData.password);
    loginPage.clickLoginButton();
    loginPage.verifyInvalidCredentialsMessage(errorMsgData.invalidCredentials);
    loginPage.verifyInvalidCredentialsMsgColor(errorMsgColor);
  })

  it('Login with valid username and password', () => {
    loginPage.visitLoginPage();
    loginPage.enterUsername(userAuthData.username);
    loginPage.enterPassword(userAuthData.password);
    loginPage.clickLoginButton();
    loginPage.shouldCurrentURLContainsText('/dashboard/index');
    topBar.verifyDisplayedUsernameShouldBe(userAuthData.fullName);
  })

  it('Login with admin account', () => {
    loginPage.visitLoginPage();
    loginPage.enterUsername(adminAuthData.username);
    loginPage.enterPassword(adminAuthData.password);
    loginPage.clickLoginButton();
    loginPage.shouldCurrentURLContainsText('/dashboard/index');
    topBar.verifyDisplayedUsernameShouldBe(adminAuthData.fullName);
  })

  it('Logout Successful', () => {
    loginPage.visitLoginPage();
    loginPage.enterUsername(userAuthData.username);
    loginPage.enterPassword(userAuthData.password);
    loginPage.clickLoginButton();
    topBar.logout();
    loginPage.shouldCurrentURLContainsText('/auth/login');
  })
})


