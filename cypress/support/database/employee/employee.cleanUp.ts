import * as Constants from "./employee.queries.ts";


export const restoreEmployeePersonalDetails = (
    username: string,
    restoreData: any
) => {
    return cy.task('queryDatabase', {
        query: Constants.UPDATE_EMPLOYEE_PERSONAL_DETAILS_BY_USERNAME,
        values: [
            restoreData.nationality,
            restoreData.firstName,
            restoreData.middleName,
            restoreData.lastName,
            restoreData.gender,
            restoreData.maritalStatus,
            username
        ]
    })
}

export const restoreEmployeeContactDetails = (
    username: string,
    restoreData: any
) => {
    return cy.task('queryDatabase', {
        query: Constants.UPDATE_EMPLOYEE_CONTACT_DETAILS_BY_USERNAME,
        values: [
            restoreData.street1,
            restoreData.street2,
            restoreData.city,
            restoreData.state,
            restoreData.zipCode,
            restoreData.homeTelephone,
            restoreData.workTelephone,
            restoreData.mobilePhone,
            restoreData.email,
            restoreData.otherEmail,
            username,
            restoreData.country
        ]
    })
}