import "./dotenv.js";
import { pool } from "./database.js";
import eventData from "../data/events.js";
import locationData from "../data/locations.js";

const createEventsTable = async () => {
  const createTableQuery = `
        CREATE TABLE IF NOT EXISTS events (
            id SERIAL PRIMARY KEY,
            title VARCHAR(255) NOT NULL,
            image VARCHAR(255) NOT NULL,
            date VARCHAR(255) NOT NULL,
            time VARCHAR(255) NOT NULL,
            remaining VARCHAR(255) NOT NULL,
            location_id INT REFERENCES locations(id) NOT NULL
        );
    `;

  try {
    const res = await pool.query(createTableQuery);
    console.log("Events table created successfully!");
  } catch (err) {
    console.error("Error creating events table", err);
  }
};

const seedEventsTable = async () => {
  await createEventsTable();
  eventData.forEach((event) => {
    const insertQuery = {
      text: "INSERT INTO events (title, image, date, time, remaining, location_id) VALUES ($1, $2, $3, $4, $5, $6)",
    };

    const values = [
      event.title,
      event.image,
      event.date,
      event.time,
      event.remaining,
      event.location_id,
    ];

    pool.query(insertQuery, values, (err, res) => {
      if (err) {
        console.error("Error inserting track", err);
        return;
      }
      console.log(`${event.title} added successfully`);
    });
  });
};

const createLocationsTable = async () => {
  const createTableQuery = `
        CREATE TABLE IF NOT EXISTS locations (
            id SERIAL PRIMARY KEY,
            name VARCHAR(255) NOT NULL,
            address VARCHAR(255) NOT NULL,
            city VARCHAR(255) NOT NULL,
            state VARCHAR(8) NOT NULL,
            image VARCHAR(255) NOT NULL
        );
    `;

  try {
    const res = await pool.query(createTableQuery);
    console.log("Locations table created successfully");
  } catch (err) {
    console.log("Error creating locations table", err);
  }
};

const seedLocationsTable = async () => {
  await createLocationsTable();
  // insert in order
  for (const location of locationData) {
    const insertQuery = {
      text: "INSERT INTO locations (name, address, city, state, image) VALUES ($1, $2, $3, $4, $5)",
    };

    const values = [
      location.name,
      location.address,
      location.city,
      location.state,
      location.image,
    ];

    try {
      await pool.query(insertQuery, values);
      console.log(`${location.name} added successfully`);
    } catch (err) {
      console.error("Error inserting location", err);
    }
  }
};

const runReset = async () => {
  await pool.query(`DROP TABLE IF EXISTS events;`);
  await pool.query(`DROP TABLE IF EXISTS locations;`);
  await seedLocationsTable();
  await seedEventsTable();
};

runReset();
