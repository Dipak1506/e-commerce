const { Pool } = require("pg");
const data = require("../data/data");

class DBConnect {
  constructor() {
    this.pool = new Pool(data.getDbData());
  }

  async connectToDb() {
    try {
      const client = await this.pool.connect();
      return client;
    } catch (error) {
      throw new Error(`Error connecting to database: ${error}`);
    }
  }

  async queryDb(query, values) {
    const client = await this.connectToDb();
    try {
      const res = await client.query(query, values);
      return res.rows;
    } catch (error) {
      throw new Error(`Database query error: ${error}`);
    } finally {
      client.release();
    }
  }

  async insertData(table, data) {
    const client = await this.connectToDb();
    try {
      // Construct the column names and placeholders for values
      const columns = Object.keys(data).join(", ");
      const placeholders = Object.keys(data)
        .map((_, index) => `$${index + 1}`)
        .join(", ");

      // Construct the SQL query with parameterized placeholders
      const query = `INSERT INTO ${table} (${columns}) VALUES (${placeholders}) RETURNING *`;

      // Extract the values from the data object
      //const values = Object.values(data);
      const values = Object.keys(data).map((key) => data[key]);

      console.log("Insert Data Query : ", query);
      console.log("Values : ", values);

      // Execute the query with parameterized values
      const { rows } = await client.query(query, values);

      // Return the inserted row
      return rows[0];
    } catch (error) {
      throw new Error(`Error inserting data into ${table}: ${error}`);
    } finally {
      client.release();
    }
  }

  async insertUserData(table, data) {
    const client = await this.connectToDb();
    try {
        // Construct the column names for the query
        const columns = Object.keys(data).join(", ");
        
        // Construct the placeholders for values
        const placeholders = Object.keys(data)
            .map((_, index) => `$${index + 1}`)
            .join(", ");

        // Construct the SQL query with explicit column names
        const query = `INSERT INTO ${table} (${columns}) VALUES (${placeholders}) RETURNING *`;

        // Extract the values from the data object
        const values = Object.values(data);

        console.log("Insert Data Query : ", query);
        console.log("Values : ", values);

        // Execute the query with parameterized values
        const { rows } = await client.query(query, values);

        // Return the inserted row
        return rows[0];
    } catch (error) {
        throw new Error(`Error inserting data into ${table}: ${error}`);
    } finally {
        client.release();
    }
}


  async getAllData(table) {
    const client = await this.connectToDb();
    try {
      const res = await client.query(`SELECT * FROM ${table}`);
      return res.rows;
    } catch (error) {
      throw new Error(`Error fetching data from ${table}: ${error}`);
    } finally {
      client.release();
    }
  }

  async closeConnection() {
    await this.pool.end();
  }
}

module.exports = DBConnect;
