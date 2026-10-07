import { getCurrentUser, logout } from "../assets/js/auth.js";

export function renderNavbar(containerId = "navbar") {
  const user = getCurrentUser();
  const el = document.getElementById(containerId);
  if (!el) return;

  el.innerHTML = `
    <nav class="bg-white border-b border-slate-200 px-6 py-3 flex items-center justify-between sticky top-0 z-40">
      <div class="flex items-center gap-4">
        <a href="dashboard.html" class="flex items-center gap-2 text-indigo-600 font-bold text-lg">
          <div class="w-8 h-8 bg-indigo-600 rounded-lg flex items-center justify-center text-white text-sm font-bold">LS</div>
          LightSprint
        </a>
      </div>
      <div class="flex items-center gap-3">
        <span class="text-sm text-slate-600">Hi, <strong>${user?.name || "User"}</strong></span>
        <button onclick="window.__logout()" class="text-sm text-slate-500 hover:text-red-500 transition-colors px-3 py-1.5 border border-slate-200 rounded-lg">
          Logout
        </button>
      </div>
    </nav>`;

  window.__logout = logout;
}
