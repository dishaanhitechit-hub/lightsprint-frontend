const BASE_URL = "http://localhost:5000/api";

function getToken() {
  return localStorage.getItem("access_token");
}

async function request(method, path, body = null) {
  const headers = { "Content-Type": "application/json" };
  const token = getToken();
  if (token) headers["Authorization"] = `Bearer ${token}`;

  const res = await fetch(`${BASE_URL}${path}`, {
    method,
    headers,
    body: body ? JSON.stringify(body) : null,
  });

  if (res.status === 401) {
    const refreshed = await refreshToken();
    if (!refreshed) {
      localStorage.clear();
      window.location.href = "/pages/login.html";
      return;
    }
    return request(method, path, body);
  }

  return res.json();
}

async function refreshToken() {
  const refresh = localStorage.getItem("refresh_token");
  if (!refresh) return false;
  const res = await fetch(`${BASE_URL}/auth/refresh`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${refresh}`,
    },
  });
  if (!res.ok) return false;
  const data = await res.json();
  localStorage.setItem("access_token", data.access_token);
  return true;
}

export const api = {
  get: (path) => request("GET", path),
  post: (path, body) => request("POST", path, body),
  put: (path, body) => request("PUT", path, body),
  patch: (path, body) => request("PATCH", path, body),
  delete: (path) => request("DELETE", path),
};
