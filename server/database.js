import sqlite3 from 'sqlite3';
import path from 'path';
import { fileURLToPath } from 'url';
import crypto from 'crypto';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const DB_PATH = path.join(__dirname, 'portfolio.db');

// Connect to SQLite Database
const db = new sqlite3.Database(DB_PATH, (err) => {
  if (err) {
    console.error('Error connecting to the SQLite database:', err.message);
  } else {
    console.log('Connected to the SQLite database.');
  }
});

// Convert db.all, db.get, db.run into Promise-based helpers
export const query = (sql, params = []) => {
  return new Promise((resolve, reject) => {
    db.all(sql, params, (err, rows) => {
      if (err) reject(err);
      else resolve(rows);
    });
  });
};

export const queryGet = (sql, params = []) => {
  return new Promise((resolve, reject) => {
    db.get(sql, params, (err, row) => {
      if (err) reject(err);
      else resolve(row);
    });
  });
};

export const queryRun = (sql, params = []) => {
  return new Promise((resolve, reject) => {
    db.run(sql, params, function (err) {
      if (err) reject(err);
      else resolve({ id: this.lastID, changes: this.changes });
    });
  });
};

// Initialize Tables
export const initDB = async () => {
  // Create Services Table
  await queryRun(`
    CREATE TABLE IF NOT EXISTS services (
      id TEXT PRIMARY KEY,
      title TEXT NOT NULL,
      category TEXT,
      image TEXT,
      tagline TEXT,
      description TEXT,
      benefits TEXT,
      features TEXT,
      specifications TEXT,
      workflow TEXT,
      projects TEXT,
      testimonial TEXT,
      calculator TEXT,
      gallery TEXT
    )
  `);

  // Try to add gallery column to services table if it doesn't exist yet
  try {
    await queryRun('ALTER TABLE services ADD COLUMN gallery TEXT');
    console.log('Added gallery column to services table.');
  } catch (e) {
    // Column already exists, safe to ignore
  }

  // Create Projects Table
  await queryRun(`
    CREATE TABLE IF NOT EXISTS projects (
      id TEXT PRIMARY KEY,
      title TEXT NOT NULL,
      category TEXT,
      image TEXT,
      client TEXT,
      location TEXT,
      duration TEXT,
      date TEXT,
      challenge TEXT,
      solution TEXT,
      results TEXT,
      features TEXT,
      gallery TEXT,
      technologies TEXT,
      testimonial TEXT
    )
  `);

  // Create Contact Details Table
  await queryRun(`
    CREATE TABLE IF NOT EXISTS contact_details (
      id TEXT PRIMARY KEY,
      whatsapp TEXT,
      viber TEXT,
      telegram TEXT,
      email TEXT,
      phone TEXT,
      address TEXT,
      company_name TEXT,
      description TEXT,
      facebook TEXT,
      instagram TEXT
    )
  `);

  // Try to add facebook and instagram columns to contact_details table if they don't exist yet
  try {
    await queryRun('ALTER TABLE contact_details ADD COLUMN facebook TEXT');
    console.log('Added facebook column to contact_details table.');
  } catch (e) {
    // Column already exists, safe to ignore
  }

  try {
    await queryRun('ALTER TABLE contact_details ADD COLUMN instagram TEXT');
    console.log('Added instagram column to contact_details table.');
  } catch (e) {
    // Column already exists, safe to ignore
  }

  // Create Users Table
  await queryRun(`
    CREATE TABLE IF NOT EXISTS users (
      username TEXT PRIMARY KEY,
      password_hash TEXT
    )
  `);

  // Seed default admin user if empty
  const defaultAdmin = await queryGet('SELECT username FROM users WHERE username = ?', ['admin']);
  if (!defaultAdmin) {
    const defaultHash = crypto.createHash('sha256').update('admin').digest('hex');
    await queryRun('INSERT INTO users (username, password_hash) VALUES (?, ?)', ['admin', defaultHash]);
    console.log('Seeded default admin user (username: admin, password: admin)');
  }

  console.log('Database tables initialized.');
};

export default db;
