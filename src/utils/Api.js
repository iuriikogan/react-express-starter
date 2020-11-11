const API_URL = "http://localhost:5000";

//---------------------- GET all logs --------------------------------
export const listAllLogs = async () => {
  const response = await fetch(`${API_URL}/api/logs`);
  return response.json();
};

// ----------------- POST to /api/logs

export const PostEntry = async entry => {
  const response = await fetch(`${API_URL}/api/logs/`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(entry)
  });
  return response.json();
};
