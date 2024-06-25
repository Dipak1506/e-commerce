// const fs = require('fs');
// const data = require('./data')
// console.log("------ err.js ")
// class errorLogger{
//     static writeError = async (errorText) =>{
//         return new Promise((resolve,reject)=>{
//             fs.appendFile('./data/errors.txt', errorText,(err)=>{
//                 if(err){
//                     reject(err)
//                 }
//                 resolve("Write successful");
//             })
//         })
//     } 
    
//     static constructDetailedError = async (filename, method, errorObject) =>{
//         const timeZoneOffset = ((new Date().getTimezoneOffset()*-1))/60 
//         const txt = `
// *********************************************************************************************
// ERROR DATE/TIME: ${data.getCurrentDateTime(data.getTimeZone())}; 
// TIME OFFSET: GMT ${timeZoneOffset > 0 ? '+' + timeZoneOffset : timeZoneOffset}
// FILE NAME: ${filename};
// METHOD: ${method};
// ERROR MESSAGE: ${errorObject.message}
// ERROR TARGET: ${errorObject.target}
// *********************************************************************************************
//         `;
//         return errorLogger.writeError(txt);
//     }
    
// }

// module.exports = errorLogger;

const fs = require('fs');
const data = require('./data');

class ErrorLogger {
  static async constructDetailedError(file, func, error) {
    const date = new Date();
    const errorLog = `Error occurred in ${file}, function: ${func}, time: ${date.toLocaleString()}, error: ${error}`;
    console.error(errorLog);
    fs.appendFileSync('error.log', errorLog + '\n');
  }
}

module.exports = ErrorLogger;
