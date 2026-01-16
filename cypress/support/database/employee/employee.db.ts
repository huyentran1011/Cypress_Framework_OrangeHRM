import * as Constants from "./employee.queries.ts";
import type { DirectoryEmployee } from "./employee.types.ts";
import { utils } from "../../../utils/utilities.ts";


export const queryEmployeePersonalDetailsInfo = (
    username: string,
) => {
    return cy.task('queryDatabase', {
        query: Constants.SELECT_EMPLOYEE_PERSONAL_DETAILS_BY_USERNAME,
        values: [username]
    })
}

export const queryEmployeeContactDetailsInfo = (
    username: string,
) => {
    return cy.task('queryDatabase', {
        query: Constants.SELECT_EMPLOYEE_CONTACT_DETAILS_BY_USERNAME,
        values: [username]
    })
}

export const queryDirectoryEmployee = (
    firstName: string,
    middleName: string,
    lastName: string,
    jobTitle: string,
    location: string
) => {
    return cy.task<DirectoryEmployee[]>('queryDatabase', {
        query: Constants.SEARCH_DIRECTORY_EMPLOYEE,
        values: [
            utils.normalizeStringType(firstName), 
            utils.normalizeStringType(middleName), 
            utils.normalizeStringType(lastName), 
            utils.normalizeStringType(jobTitle), 
            utils.normalizeStringType(location)]
    })
}