import React from 'react';

const SidebarAdminPanel = () => {
    return (
        <aside>
        <div class="sidebar-title">
          <div>
            <p>پنل مدیریت</p>
            <img src="/public/images/main/icon.PNG" alt />
          </div>
          <div>
            <span id="phone-number"></span>
          </div>
        </div>

        <ul class="sidebar-items">
          <li>
            <a class="active" href="/pages/adminPanel/dashboard.html">
              <i class="bi bi-house"></i>
              <p>داشبورد</p>
            </a>
          </li>
          <li>
            <a href="/pages/adminPanel/users.html">
              <i class="bi bi-people"></i>
              <p>کاربران</p>
            </a>
          </li>
          <li>
            <a href="/pages/adminPanel/posts.html">
              <i class="bi bi-card-text"></i>
              <p>آگهی ها</p>
            </a>
          </li>
          <li>
            <a href="/pages/adminPanel/articles.html">
              <i class="bi bi-card-text"></i>
              <p>مقالات</p>
            </a>
          </li>
          <li>
            <a href="/pages/adminPanel/socials.html">
              <i class="bi bi-globe"></i>
              <p>شبکه های اجتماعی</p>
            </a>
          </li>
        </ul>
      </aside>
    );
}


export default SidebarAdminPanel;