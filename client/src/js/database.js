import { openDB } from "idb";

const initdb = async () =>
  openDB("jate", 1, {
    upgrade(db) {
      if (db.objectStoreNames.contains("jate")) {
        console.log("jate database already exists");
        return;
      }
      db.createObjectStore("jate", { keyPath: "id", autoIncrement: true });
      console.log("jate database created");
    },
  });

// Export a function to accept the content and add it to the database
export const putDb = async (content) => {
  console.log("PUT to the database");
  // Create a connection to the database database and version we want to use.
  const jateDb = await openDB("jate", 1);
  // Create a new transaction, specify the database and data privileges.
  const tx = jateDb.transaction("jate", "readwrite");
  // Open up the object store.
  const store = tx.objectStore("jate");
  // Using the put method with the id: 1 and the value content to match mockup
  const request = store.put({ id: 1, value: content });
  // Get confirmation of the request
  const result = await request;
  console.log("Data saved to the database", result);
};

// Export a function to GET all content from the database.
export const getDb = async () => {
  console.log("GET from the database");
  // Create a connection to the database database and version we want to use.
  const jateDb = await openDB("jate", 1);
  // Create a new transaction, specify the database and data privileges.
  const tx = jateDb.transaction("jate", "readonly");
  // Open up the object store.
  const store = tx.objectStore("jate");
  // Use the .getAll() method to get all data in the database.
  const request = store.getAll();
  // Get confirmation of the request
  const result = await request;
  console.log("result.value", result);
  // Needed the '?.value' due to running into 'e.split is not a function' errors
  return result?.value;
};

initdb();
