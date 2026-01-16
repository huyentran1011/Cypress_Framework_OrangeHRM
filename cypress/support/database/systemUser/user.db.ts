import * as Constants from "./user.queries.ts";
import type { SystemUser } from "./user.types.ts";
import { mapUsernameStatus } from "../../../utils/mapper.ts";
import { utils } from "../../../utils/utilities.ts";

export const querySystemUsers = (
    username: string,
    userRole: string,
    firstName: string,
    middleName: string,
    lastName: string,
    status: string
) => {
    return cy.task<SystemUser[]>('queryDatabase', {
        query: Constants.SEARCH_SYSTEM_USER,
        values: [
            utils.normalizeStringType(username), 
            utils.normalizeStringType(userRole), 
            utils.normalizeStringType(firstName), 
            utils.normalizeStringType(middleName), 
            utils.normalizeStringType(lastName), 
            mapUsernameStatus(status)]
    })
}