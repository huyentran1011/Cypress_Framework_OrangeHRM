export const SELECT_EMPLOYEE_PERSONAL_DETAILS_BY_USERNAME = `
     SELECT 
        t1.employee_id, 
        t1.emp_firstname, 
        t1.emp_middle_name, 
        t1.emp_lastname,
        t1.emp_birthday,
        t3.name,
        t1.emp_gender, 
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