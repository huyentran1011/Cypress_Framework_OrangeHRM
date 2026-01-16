export const SELECT_EMPLOYEE_PERSONAL_DETAILS_BY_USERNAME = `
     SELECT 
        t1.employee_id, 
        t1.emp_firstname, 
        t1.emp_middle_name, 
        t1.emp_lastname,
        t1.emp_birthday,
        t3.name,t1.emp_gender, 
        t1.emp_marital_status,
        t1.emp_dri_lice_num, 
        t1.emp_dri_lice_exp_date 
    FROM \`hs_hr_employee\` as t1 
    INNER JOIN \`ohrm_user\` as t2 ON t1.emp_number = t2.emp_number 
    INNER JOIN \`ohrm_nationality\` as t3 ON t1.nation_code = t3.id 
    WHERE t2.user_name = ?;`;


export const SELECT_EMPLOYEE_CONTACT_DETAILS_BY_USERNAME = `
    SELECT 
        t1.emp_street1, 
        t1.emp_street1, 
        t1.city_code, 
        t1.provin_code, 
        t1.emp_zipcode, 
        t1.coun_code, 
        t1.emp_hm_telephone, 
        t1.emp_work_telephone, 
        t1.emp_mobile, 
        t1.emp_work_email, 
        t1.emp_oth_email,
        t3.name
    FROM \`hs_hr_employee\` as t1 
    INNER JOIN \`ohrm_user\` as t2 ON t1.emp_number = t2.emp_number 
    INNER JOIN \`hs_hr_country\`as t3 ON t1.coun_code = t3.cou_code
    WHERE t2.user_name = ?;`;

export const UPDATE_EMPLOYEE_PERSONAL_DETAILS_BY_USERNAME = `
    UPDATE \`hs_hr_employee\` AS t1
    JOIN \`ohrm_user\` AS t2 ON t1.emp_number = t2.emp_number
    JOIN \`ohrm_nationality\` AS t3 ON t3.name = ?
    SET 
        t1.emp_firstname = ?, 
        t1.emp_middle_name = ?, 
        t1.emp_lastname = ?, 
        t1.nation_code = t3.id, 
        t1.emp_gender = ?, 
        t1.emp_marital_status = ?
    WHERE t2.user_name = ?;`;

export const UPDATE_EMPLOYEE_CONTACT_DETAILS_BY_USERNAME = `
    UPDATE \`hs_hr_employee\` AS t1
    JOIN \`ohrm_user\` AS t2 ON t1.emp_number = t2.emp_number
    JOIN \`hs_hr_country\` AS t3 ON t1.coun_code = t3.cou_code
    SET 
        t1.emp_street1 = ?, 
        t1.emp_street2 = ?, 
        t1.city_code = ?, 
        t1.provin_code = ?, 
        t1.emp_zipcode = ?, 
        t1.coun_code = t3.cou_code,
        t1.emp_hm_telephone = ?,
        t1.emp_work_telephone = ?,
        t1.emp_mobile = ?,
        t1.emp_work_email = ?,
        t1.emp_oth_email = ?
    WHERE t2.user_name = ?
    AND t3.name = ?`;

export const SEARCH_DIRECTORY_EMPLOYEE = `
    SELECT 
    CONCAT_WS (' ',
        t1.emp_firstname, 
        t1.emp_middle_name, 
        t1.emp_lastname
    ) AS empFullname,
        t5.job_title AS subTitle,
        t2.name AS department, 
        t4.name AS location
    FROM \`hs_hr_employee\` AS t1
    LEFT JOIN \`ohrm_subunit\` AS t2 ON t1.work_station = t2.id
    INNER JOIN \`hs_hr_emp_locations\` AS t3 ON t1.emp_number = t3.emp_number
    INNER JOIN \`ohrm_location\` AS t4 ON t3.location_id = t4.id
    INNER JOIN \`ohrm_job_title\` AS t5 ON t1.job_title_code = t5.id
    WHERE 
    t1.emp_firstname = COALESCE(?, t1.emp_firstname)
    AND t1.emp_middle_name = COALESCE(?, t1.emp_middle_name)
    AND t1.emp_lastname = COALESCE(?, t1.emp_lastname)
    AND t5.job_title = COALESCE(?, t5.job_title)
    AND t4.name = COALESCE(?, t4.name)`;

export const SEARCH_SYSTEM_USER = `
    SELECT 
    t1.user_name AS username,
    t3.name AS userRole,
    CONCAT_WS(" ",
            t2.emp_firstname,
            t2.emp_lastname) AS employeeName,
    t1.status AS status
    FROM \`ohrm_user\` AS t1
    INNER JOIN \`hs_hr_employee\` AS t2 ON t1.emp_number = t2.emp_number
    INNER JOIN \`ohrm_user_role\` AS t3 ON t1.user_role_id = t3.id
    WHERE 
    t1.deleted = '0'
    AND t1.user_name = COALESCE(?, t1.user_name)
    AND t3.name = COALESCE(?, t3.name)
    AND t2.emp_firstname = COALESCE(?, t2.emp_firstname)
    AND t2.emp_middle_name = COALESCE(?, t2.emp_middle_name)
    AND t2.emp_lastname = COALESCE(?, t2.emp_lastname)
    AND t1.status = COALESCE(?, t1.status)`;

export const SEARCH_SYSTEM_USER_BY_USERNAME = `
    SELECT *
    FROM \`ohrm_user\`
    WHERE 
    deleted = '0'
    AND \`user_name\` = ?`;

export const DELETE_USER_BY_USERNAME = `
    DELETE 
    FROM \`ohrm_user\`
    WHERE \`user_name\` = ?`;

export const CREATE_USER = `
    INSERT INTO \`ohrm_user\` (user_role_id, emp_number, user_name, user_password, status)
    VALUES(?, ?, ?, ? , ?)`;

export const UPDATE_USER_BY_USERNAME = `
    UPDATE \`ohrm_user\` AS t1
    INNER JOIN \`hs_hr_employee\` AS t2 ON t1.emp_number = t2.emp_number
    SET 
        t1.user_role_id = ?,
        t1.user_password = ?,
        t1.status = ?,
        t1.emp_number = ?
    WHERE t1.user_name = ?`;    