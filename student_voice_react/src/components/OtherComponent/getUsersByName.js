export async function getUsersByName(name) {
    const response = await fetch(`/search?name=${name}`);
    const data = await response.json();
    return data;
  }
  