const dotenv = require('dotenv');

dotenv.config();

class data{
    static getDbData = () =>{
        return {
            host: 'localhost',
            user: 'root',
            port: 5432,
            password: 'root',
            database: 'db',
        }
    }

    static getSecretKey = () =>{
        return 'alskdjsaid78as7djas'
    }

    static getEmailData = () =>{
        return {
            //Return email data here
        }
    }

    static getTimeZone = () =>{
        return process.env.TIME_ZONE;
    }

    //timezone should be in this format 1, -2
    static getCurrentDateTime = (timezone) =>{
        const date = new Date();
        var newDate = new Date(timezone*60 * 60000 + date.valueOf() + (date.getTimezoneOffset()*60000))
        return newDate;
    }

    static getFrontendUrl = ()=>{
        return 'http://localhost:3000'
    }
}

module.exports = data;