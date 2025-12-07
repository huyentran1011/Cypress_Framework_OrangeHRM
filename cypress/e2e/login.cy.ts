import { loginPage } from '../pages/LoginPage.ts';
import { topBar } from '../pages/TopBar.ts';

describe('Test Spec for Login page', () => {
  const errorMsgColor = 'rgb(235, 9, 16)';
  const invalidUsername = 'linda1012';
  const invalidPassword = '12345';
  const validUsername = 'anna1011';
  const validPassword = 'Annatran1011@X';
  const fullName = 'Anna Tran';
  const textboxErrorMsg = 'Required';
  const invalidCredentialsMsg = 'Invalid credentials';

  it('Login with blank username and password', () => {
    loginPage.visitLoginPage();
    loginPage.clickLoginButton();
    loginPage.verifyUsernameErrorMessage(textboxErrorMsg);
    loginPage.verifyUsernameErrorMsgColor(errorMsgColor);
    loginPage.verifyPasswordErrorMessage(textboxErrorMsg);
    loginPage.verifyPasswordErrorMessageColor(errorMsgColor);
  })

  it('Login with invalid username and password', () => {
    loginPage.visitLoginPage();
    loginPage.enterUsername(invalidUsername);
    loginPage.enterPassword(invalidPassword);
    loginPage.clickLoginButton();
    loginPage.verifyInvalidCredentialsMessage(invalidCredentialsMsg);
    loginPage.verifyInvalidCredentialsMsgColor(errorMsgColor);
  })

  it('Login with valid username and password', () => {
    loginPage.visitLoginPage();
    loginPage.enterUsername(validUsername);
    loginPage.enterPassword(validPassword);
    loginPage.clickLoginButton();
    loginPage.shouldCurrentURLContainsText('/dashboard/index');
    topBar.verifyDisplayedUsernameShouldBe(fullName);
  })

  it('Logout Successful', () => {
    loginPage.visitLoginPage();
    loginPage.enterUsername(validUsername);
    loginPage.enterPassword(validPassword);
    loginPage.clickLoginButton();
    topBar.logout();
    loginPage.shouldCurrentURLContainsText('/auth/login');
  })
})


