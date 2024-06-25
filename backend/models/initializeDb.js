// const db = require('./dbConnect');
// const data = require('../data/data')

// console.log("-----initializw=edb")

// class initializeDb{
//     static dbInitialization = async ()=>{
//         const dbConnect = new db(data.getDbData());
//         dbConnect.connectToDb();

//         let sql = `CREATE TABLE IF NOT EXISTS users (
//             id SERIAL PRIMARY KEY,
//             firstName VARCHAR,
//             lastName VARCHAR,
//             phoneNumber VARCHAR,
//             email VARCHAR,
//             password VARCHAR,
//             isEmailConfirmed SMALLINT,
//             gender VARCHAR,
//             userRole VARCHAR,
//             isActive SMALLINT,
//             regtime TIMESTAMP,
//             timeslog INT,
//             lastlog TIMESTAMP
//         );
//         `;
//         await dbConnect.queryDb(sql);

//         sql = `CREATE TABLE IF NOT EXISTS products (
//             id SERIAL PRIMARY KEY,
//             title VARCHAR,
//             description TEXT,
//             image VARCHAR,
//             price VARCHAR,
//             previous_price VARCHAR,
//             quantity INT,
//             buying_price VARCHAR,
//             category VARCHAR,
//             regtime TIMESTAMP
//         );
//         `;
//         await dbConnect.queryDb(sql);

//         sql = `CREATE TABLE IF NOT EXISTS products_images (
//             id SERIAL PRIMARY KEY,
//             image VARCHAR,
//             product_id INT,
//             created_at TIMESTAMP,
//             FOREIGN KEY (product_id) REFERENCES products (id)
//         );
//         `;
//         await dbConnect.queryDb(sql);

//         dbConnect.closeConnection()
//         return "Table created successfully";
//     }
//     static alterDb = async () =>{

//     }
// }

// module.exports = initializeDb;

const db = require('./dbConnect');
const data = require('../data/data')

class InitializeDb {
    static async dbInitialization() {
        const dbConnect = new db(data.getDbData());
        dbConnect.connectToDb();

        let sql = `CREATE TABLE IF NOT EXISTS users (
            id SERIAL PRIMARY KEY,
            firstName VARCHAR,
            lastName VARCHAR,
            phoneNumber VARCHAR,
            email VARCHAR,
            password VARCHAR,
            isEmailConfirmed SMALLINT,
            gender VARCHAR,
            userRole VARCHAR,
            isActive SMALLINT,
            regtime TIMESTAMP,
            timeslog INT,
            lastlog TIMESTAMP
        );
        `;
        await dbConnect.queryDb(sql);

        sql = `CREATE TABLE IF NOT EXISTS products (
            id SERIAL PRIMARY KEY,
            title VARCHAR,
            description TEXT,
            image VARCHAR,
            price VARCHAR,
            previous_price VARCHAR,
            quantity INT,
            buying_price VARCHAR,
            category VARCHAR,
            regtime TIMESTAMP
        );
        `;
        await dbConnect.queryDb(sql);

        sql = `CREATE TABLE IF NOT EXISTS products_images (
            id SERIAL PRIMARY KEY,
            image VARCHAR,
            product_id INT,
            created_at TIMESTAMP,
            FOREIGN KEY (product_id) REFERENCES products (id)
        );
        `;
        await dbConnect.queryDb(sql);

        dbConnect.closeConnection()
        return "Table created successfully";
    }

    static async alterDb() {

    }
}

module.exports = InitializeDb;
