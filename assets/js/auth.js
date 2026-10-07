import { api } from "./api.js";

export function isLoggedIn() {
  return !!localStorage.getItem("access_token");
}

export function requireAuth() {
  if (!isLoggedIn()) window.location.href = "/pages/login.html";
}

export function getCurrentUser() {
  const raw = localStorage.getItem("current_user");
  return raw ? JSON.parse(raw) : null;
}

export async function logout() {
  localStorage.clear();
  window.location.href = "/pages/login.html";
}

export async function loginUser(email, password) {
  const data = await api.post("/auth/login", { email, password });
  if (data.error) throw new Error(data.error);
  localStorage.setItem("access_token", data.access_token);
  localStorage.setItem("refresh_token", data.refresh_token);
  localStorage.setItem("current_user", JSON.stringify(data.user));
  return data.user;
}

export async function registerUser(name, email, password) {
  const data = await api.post("/auth/register", { name, email, password });
  if (data.error) throw new Error(data.error);
  localStorage.setItem("access_token", data.access_token);
  localStorage.setItem("refresh_token", data.refresh_token);
  localStorage.setItem("current_user", JSON.stringify(data.user));
  return data.user;
}
