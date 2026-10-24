export async function getData() {
  try {
    const response = await fetch('/db.json');
    if (!response.ok) {
      throw new Error('Verification failed: ' + response.statusText);
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error fetching data:', error);
    throw error;
  }
}