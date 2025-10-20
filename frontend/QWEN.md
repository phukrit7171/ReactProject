├── src/
│   ├── assets/              // เก็บไฟล์ static เช่น รูปภาพ, font
│   │   └── images/
│   ├── components/          // UI Components ทั่วไปที่นำเสนอข้อมูลเท่านั้น (Dumb components)
│   │   ├── common/          // Components เล็กๆ ที่ใช้ซ้ำบ่อย
│   │   │   ├── Avatar.jsx
│   │   │   ├── AppButton.jsx
│   │   │   ├── AppInput.jsx
│   │   │   ├── LoadingSpinner.jsx
│   │   │   ├── ErrorMessage.jsx
│   │   │   └── ConfirmationModal.jsx
│   │   └── layout/          // Components โครงสร้างหน้า
│   │       ├── Navbar.jsx
│   │       ├── Sidebar.jsx
│   │       ├── PageWrapper.jsx
│   │       └── ProtectedRoute.jsx // Component สำหรับจัดการ Route ที่ต้อง Login
│   ├── constants/           // ค่าคงที่ที่ใช้ทั้งโปรเจกต์
│   │   ├── apiConfig.js     // ค่าคงที่เกี่ยวกับ API เช่น BASE_URL
│   │   └── routes.js        // Path ของหน้าต่างๆ ในแอป
│   ├── features/            // โฟลเดอร์หัวใจหลักของแอป แบ่งโค้ดตามฟีเจอร์
│   │   ├── auth/            // ฟีเจอร์: การยืนยันตัวตน
│   │   │   ├── authApi.js
│   │   │   ├── authSlice.js
│   │   │   ├── LoginForm.jsx    // Component 'ฟอร์ม' สำหรับ Login
│   │   │   └── RegisterForm.jsx // Component 'ฟอร์ม' สำหรับสมัครสมาชิก
│   │   ├── users/           // ฟีเจอร์: การจัดการผู้ใช้
│   │   │   ├── usersApi.js
│   │   │   ├── UserList.jsx
│   │   │   ├── UserListItem.jsx // Component แสดง User 1 คนใน List
│   │   │   └── SettingsForm.jsx
│   │   ├── chat/            // ฟีเจอร์: การแชท
│   │   │   ├── chatroomsApi.js
│   │   │   ├── messagesApi.js
│   │   │   ├── chatSlice.js
│   │   │   ├── ChatRoomList.jsx
│   │   │   ├── ChatRoomListItem.jsx // Component แสดงห้องแชท 1 ห้อง
│   │   │   ├── ChatWindow.jsx
│   │   │   ├── MessageList.jsx    // Component แสดงรายการข้อความ
│   │   │   ├── Message.jsx        // Component แสดงข้อความ 1 ข้อความ
│   │   │   └── MessageInput.jsx   // Component สำหรับพิมพ์และส่งข้อความ
│   │   ├── friends/         // ฟีเจอร์: การจัดการเพื่อน
│   │   │   ├── friendsApi.js
│   │   │   ├── FriendList.jsx
│   │   │   ├── FriendListItem.jsx
│   │   │   ├── FriendRequestList.jsx
│   │   │   ├── FriendRequestItem.jsx
│   │   │   └── UserSearch.jsx     // Component สำหรับค้นหา User เพื่อส่งคำขอ
│   ├── hooks/               // Custom Hooks ที่สร้างขึ้นเองเพื่อใช้ซ้ำ Logic
│   │   ├── useAuth.js         // Hook สำหรับดึงข้อมูล auth state ปัจจุบัน
│   │   └── useDebounce.js     // Hook สำหรับหน่วงการทำงาน (เช่น ตอนค้นหา)
│   ├── pages/               // Components ที่ทำหน้าที่ประกอบกันเป็น "หน้าเว็บ" จริงๆ
│   │   ├── LoginPage.jsx      // หน้า Login (นำ LoginForm มาใช้)
│   │   ├── RegisterPage.jsx   // หน้า Register (นำ RegisterForm มาใช้)
│   │   ├── ChatPage.jsx       // หน้าแชทหลัก (ประกอบด้วย Sidebar และ ChatWindow)
│   │   ├── FriendsPage.jsx    // หน้าจัดการเพื่อน (ประกอบด้วย FriendList, Requests)
│   │   ├── SettingsPage.jsx   // หน้าตั้งค่า (นำ SettingsForm มาใช้)
│   │   └── NotFoundPage.jsx   // หน้าสำหรับ URL ที่ไม่มีอยู่จริง
│   ├── services/            // ศูนย์กลางการตั้งค่า Service ภายนอก
│   │   └── api.js           // จุดศูนย์กลางและไฟล์ตั้งต้นของ RTK Query (createApi)
│   ├── store/               // ศูนย์กลางของ Redux
│   │   └── store.js         // ไฟล์สำหรับกำหนดค่า (Configure) Redux Store
│   ├── styles/              // Global styles และการตั้งค่า Theme
│   │   └── theme.js           // การตั้งค่า Theme สำหรับ MUI
│   ├── utils/               // ฟังก์ชันช่วยเหลือทั่วไปที่ไม่เกี่ยวกับ UI
│   │   ├── formatDate.js
│   │   ├── validation.js      // ฟังก์ชันหรือ Schema สำหรับตรวจสอบข้อมูลฟอร์ม
│   │   └── tokenStorage.js    // ฟังก์ชันช่วยจัดการ token ใน localStorage
│   ├── App.jsx              // Component หลักของแอป (จัดการ Routing หลัก)
│   └── main.jsx  