 creating a new database for your project is straightforward. Follow these steps:
`1. Log in to PostgreSQL as the postgres User`

You are already connected to PostgreSQL, but just to be sure you’re in the correct shell, log in to PostgreSQL with the postgres user:

`sudo -u postgres psql`

This will log you into PostgreSQL as the postgres superuser.
`2. Create a New Database`

To create a new database, use the following SQL command inside the PostgreSQL shell:

`CREATE DATABASE your_database_name;`

Replace your_database_name with the desired name for your database.

For example:

`CREATE DATABASE emergency_db;`

`3. Verify the Database Creation`

To verify that the database was created successfully, list all databases with the following command:

`\l`

This will display a list of databases, and your new database should be listed.
`4. Connect to the New Database`

Once the database is created, connect to it with the following command:

`\c your_database_name`

For example:

`\c emergency_db`

`5. Create Tables for Your Project`

Now you can start creating tables. For instance, you can create the tables you need for your emergency reporting project.

Here’s an example SQL command to create a table (you can modify this to suit your schema):
`CREATE TABLE emergencies (`
  `id SERIAL PRIMARY KEY,`
  `emergency_type VARCHAR(255),`
  `location VARCHAR(255),`
  `description TEXT,`
  `reporter_mat_no VARCHAR(255),`
  `victim_mat_no VARCHAR(255),`
  `status VARCHAR(50) DEFAULT 'active',`
  `created_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP`
`);`

`6. Exit PostgreSQL`

Once you’re done, you can exit the PostgreSQL shell by typing:

`\q`

`7. Update Your Application to Use the New Database`

After creating the database, update your application’s connection string (DATABASE_URL environment variable) to point to this new database. The URL should look something like this:

`postgresql://username:password@localhost:5432/your_database_name`

Make sure to replace username, password, and your_database_name with the appropriate values.

Let me know if you need any more help with that!
