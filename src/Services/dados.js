const BIN_ID = '6ae68e3affd5d160539c4dd9';
const API_KEY = '$2a$10$BKICUxHWfEClDHXvqdH7Kut/509C5fgJwocVdD/YJogG9QISBW6xe';
const URL = `https://api.jsonbin.io/v3/b/${BIN_ID}`;

export async function getData() {
  const response = await fetch(`${URL}/latest`, {
    headers: {
      'X-Master-Key': API_KEY
    }
  });
  const data = await response.json();
  return data.record; 
}

export async function saveData(novoDb) {
  await fetch(URL, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
      'X-Master-Key': API_KEY
    },
    body: JSON.stringify(novoDb)
  });
}