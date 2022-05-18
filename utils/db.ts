import {createPool} from "mysql2/promise";

export const pool = createPool({
    host: 'localhost',
    user: 'root',
    database: 'pet_ads',
    namedPlaceholders: true,
    decimalNumbers: true,
})
