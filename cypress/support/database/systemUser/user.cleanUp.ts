import * as Constants from "./user.queries.ts";
import { utils } from "../../../utils/utilities.ts";
import type { constants } from "buffer";

export const deleteSystemUser = (
    username: string
) => {
    return cy.task('queryDatabase', {
        query: Constants.DELETE_USER_BY_USERNAME,
        values: [utils.normalizeStringType(username)],
    })
}

export const createSystemUSer = (
    userRoleID: number,
    empNumber: number,
    username: string,
    userPassword: string,
    status: number
) => {
    return cy.task('queryDatabase', {
        query: Constants.SEARCH_SYSTEM_USER_BY_USERNAME,
        values: [username]
    }).then((rows) => {
        if (Array.isArray(rows) && rows.length == 0) {
            cy.task('queryDatabase', {
                query: Constants.CREATE_USER,
                values: [userRoleID, empNumber, utils.normalizeStringType(username), userPassword, status]
            });
        }
    })
}

export const updateSystemUser = (
    userRoleID: number,
    userPassword: string,
    status: number,
    emp_number: number,
    username: string,
) => {
    return cy.task('queryDatabase', {
        query: Constants.UPDATE_USER_BY_USERNAME,
        values: [userRoleID, userPassword, status, emp_number, utils.normalizeStringType(username)]
    })
}