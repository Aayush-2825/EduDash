# 🧑‍🏫 EduDash — Modern Role-Based Coaching Platform

EduDash is a full-stack, role-based coaching platform built using **Next.js 14 App Router**, **Prisma**, and **NextAuth.js**, designed to serve two main user types — **Teachers** and **Students**. The app includes dashboards, class-based content uploads, test creation, performance tracking, and more.

---

## 🚀 Tech Stack

- **Frontend**: Next.js 14 (App Router), Tailwind CSS, TypeScript, Shadcn/UI, Lucide Icons
- **Backend**: Prisma ORM, PostgreSQL, Server Actions & API Routes
- **Auth**: NextAuth.js (Email + OAuth - GitHub, Google)
- **Upload**: Cloudinary 
- **Email**: Resend (but currently using SMTP of google )

---

## ✅ Completed Features

### 🔐 Authentication System (✅ Done)
- [x] Email/password login (using Credentials Provider)
- [x] OAuth login (Google, GitHub)
- [x] Email verification system using **Resend**
- [x] JWT-based session with role (Student/Teacher)
- [x] Role-based middleware redirection
- [x] Secure sign out logic
- [x] Forgot password (structure implemented, email part pending)
- [x] Prevent unauthorized dashboard access
- [x] Dynamic login redirect based on role

### 🧑‍🏫 Teacher Panel - Phase 1 (🛠 In Progress)
- [x] Role stored in DB using Prisma Enum (`STUDENT`, `TEACHER`, `ADMIN`)
- [x] Approved teacher logic via `approved` boolean
- [x] Class creation form with unique class code
- [x] View and manage created classes
- [x] Upload lectures and notes to class/subject
- [ ] Create and assign tests to specific classes
- [ ] See student performance & analytics

### 🎓 Student Panel - Phase 1 (🛠 In Progress)
- [x] Role-based dashboard UI
- [x] Join class using unique code
- [x] View lectures and notes
- [ ] Attempt tests and view score breakdown
- [ ] Track progress & analytics

---

## 📁 Folder Structure (Simplified)

```
/app
  /auth
    /login
    /register
  /student
    /dashboard
    /classes
  /teacher
    /dashboard
    /classes
    /lectures
    /tests

/lib
  db.ts
  auth.ts
  mail.ts
  tokens.ts

/actions
  register.ts
  login.ts
  create-class.ts

/constants
  teacher.ts

/schemas
  login.ts
  register.ts
  createClass.ts
```

---

## 🔜 Upcoming Features

- [x] Subject-wise class management
- [x] Video lecture upload and streaming (Cloudinary or ImageKit)
- [x] File upload for notes
- [ ] Automated test creation and evaluation
- [ ] Notifications and announcements panel
- [ ] Admin panel for approving teachers
- [ ] Mobile responsiveness

---



## 📊 Progress Tracker

| Module            | Status          |
|-------------------|------------------|
| Auth              | ✅ Complete      |
| Middleware        | ✅ Complete      |
| Role Management   | ✅ Complete      |
| Teacher Dashboard | 🛠 In Progress   |
| Student Dashboard | 🛠 In Progress   |
| File Upload       |  complete       |
| Test System       | 🚧 Planned       |
| Admin Panel       | 🚧 Planned       |

---

## ✍️ Author

**Aayush Raj** — Dual Degree CSE, NIT Hamirpur  
Feel free to contribute or suggest ideas!

---