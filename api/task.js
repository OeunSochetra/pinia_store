const baseUrl = "http://localhost:3000/tasks";

export const GET_DATA = async () => {
  const response = await fetch(baseUrl);
  if (!response.ok) {
    throw new Error("Failed to fetch data");
  } else return await response.json();
};
