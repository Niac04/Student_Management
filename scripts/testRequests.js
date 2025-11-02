// Simple test script to exercise the API endpoints.
// Uses global fetch (Node 18+). If your Node is older, run these requests with Postman.

const base = "http://localhost:5000";

async function run() {
  try {
    console.log("GET /students");
    let res = await fetch(`${base}/students`);
    console.log("status", res.status);
    console.log(await res.text());

    console.log("\nPOST /students");
    res = await fetch(`${base}/students`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        name: "Test Student",
        age: 21,
        department: "CS",
        email: `test${Date.now()}@example.com`,
      }),
    });
    console.log("status", res.status);
    console.log(await res.text());

    console.log("\nGET /students (after create)");
    res = await fetch(`${base}/students`);
    console.log("status", res.status);
    console.log(await res.text());

    console.log("\nGET /courses");
    res = await fetch(`${base}/courses`);
    console.log("status", res.status);
    console.log(await res.text());

    console.log("\nPOST /courses");
    res = await fetch(`${base}/courses`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        title: "Intro to Testing",
        code: `TST${Date.now()}`,
        instructor: "Instructor A",
      }),
    });
    console.log("status", res.status);
    console.log(await res.text());

    console.log("\nGET /courses (after create)");
    res = await fetch(`${base}/courses`);
    console.log("status", res.status);
    console.log(await res.text());
  } catch (err) {
    console.error("Test script error:", err);
  }
}

run();
