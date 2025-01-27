// Connects to the bootcampx database
const { Pool } = require("pg");

const pool = new Pool({
  user: "development",
  password: "development",
  host: "localhost",
  database: "bootcampx",
});
// ------------------------------

const cohortName = process.argv[2] || 'JUL02';
// Store all potentially malicious values in an array.
const values = [`%${cohortName}%`];
pool 
  .query (
    `
    SELECT DISTINCT 
    teachers.name AS teacher,
    cohorts.name AS cohort
    FROM assistance_requests
    JOIN teachers ON teachers.id = teacher_id
    JOIN students ON students.id = student_id
    JOIN cohorts ON cohorts.id = cohort_id
    WHERE cohorts.name LIKE $1
    ORDER BY teachers.name;
    `,
    values // Pass the values array to parameterize the query
  )
  .then((res) => {
    res.rows.forEach((row) => {
      console.log(
        `${row.cohort}: ${row.teacher}.`);
    });
  })
  .catch((err) => console.error("query error", err.stack));