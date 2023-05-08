import { openDB } from 'idb';

const initdb = async () =>
  openDB('jate', 1, {
    upgrade(db) {
      if (db.objectStoreNames.contains('jate')) {
        console.log('jate database already exists');
        return;
      }
      db.createObjectStore('jate', { keyPath: 'id', autoIncrement: true });
      console.log('jate database created');
    },
  });

// TODO: Add logic to a method that accepts some content and adds it to the database
export const putDb = async (content) => {
  console.log('Post to the database');

  //create connection to the database
  const contactDb = await openDB('jate', 1);

  //create new transaction 
  const tx = contactDb.transaction('jate', 'readwrite');

  //open desired object store
  const store = tx.objectStore('jate');

  const request = store.put({ id: 1, value: content });

  //Get confirmation request
  const result = await request;
  console.log('data saved to database', result);
};

// TODO: Add logic for a method that gets all the content from the database
export const getDb = async () => {
  console.log('getDb from the DB');

  //create connection to the database
  const contactDb = await openDB('jate', 1);
  //create new transaction 
  const tx = contactDb.transaction('jate', 'readonly');

  const request = store.getAll();

  const result = await request;
  console.log('result.value', result);
  return result?.value;

};

initdb();
