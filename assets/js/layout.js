import { getCurrentUser, logout } from "./auth.js";

export function renderLayout(activePage = "") {
  const user = getCurrentUser();
  const params = new URLSearchParams(location.search);
  const projectId = params.get("project");

  const projectLinks = projectId ? `
    <div class="sidebar-section">
      <p class="sidebar-label">PROJECT</p>
      <a href="task-pool.html?project=${projectId}" class="sidebar-link ${activePage === 'pool' ? 'active' : ''}">
        <span class="sidebar-icon">🗂️</span> Task Pool
      </a>
      <a href="backlog.html?project=${projectId}" class="sidebar-link ${activePage === 'backlog' ? 'active' : ''}">
        <span class="sidebar-icon">📋</span> Backlog
      </a>
      <a href="board.html?project=${projectId}" class="sidebar-link ${activePage === 'board' ? 'active' : ''}">
        <span class="sidebar-icon">🏄</span> Board
      </a>
      <a href="sprints.html?project=${projectId}" class="sidebar-link ${activePage === 'sprints' ? 'active' : ''}">
        <span class="sidebar-icon">🏃</span> Sprints
      </a>
      <a href="stories.html?project=${projectId}" class="sidebar-link ${activePage === 'stories' ? 'active' : ''}">
        <span class="sidebar-icon">📖</span> User Stories
      </a>
      <a href="members.html?project=${projectId}" class="sidebar-link ${activePage === 'members' ? 'active' : ''}">
        <span class="sidebar-icon">👥</span> Members
      </a>
    </div>` : "";

  document.body.innerHTML = `
    <div class="app-shell">
      <aside class="sidebar">
        <div class="sidebar-brand">
          <div class="brand-logo">LS</div>
          <span class="brand-name">LightSprint</span>
        </div>
        <div class="sidebar-section">
          <a href="dashboard.html" class="sidebar-link ${activePage === 'dashboard' ? 'active' : ''}">
            <span class="sidebar-icon">🏠</span> Dashboard
          </a>
        </div>
        ${projectLinks}
        <div class="sidebar-footer">
          <div class="user-badge">
            <div class="user-avatar">${(user?.name || "U")[0].toUpperCase()}</div>
            <div class="user-info">
              <p class="user-name">${user?.name || "User"}</p>
              <p class="user-email">${user?.email || ""}</p>
            </div>
          </div>
          <button onclick="window.__logout()" class="logout-btn">Logout</button>
        </div>
      </aside>
      <main class="main-content" id="page-content"></main>
    </div>`;

  window.__logout = logout;
}

export function setContent(html) {
  document.getElementById("page-content").innerHTML = html;
}
