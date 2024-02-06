const baseUrl = "http://localhost:3000/tasks";

export const GET_TASKS = async () => {
  const response = await fetch(baseUrl);
  if (!response.ok) {
    throw new Error("Failed to fetch data");
  } else return await response.json();
};

export const POST_TASK = async (task) => {
  const response = await fetch(baseUrl, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(task),
  });
  if (!response.ok) {
    throw new Error("Failed to post task");
  }
};
