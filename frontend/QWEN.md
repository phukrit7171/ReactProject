├── src/
│   ├── assets/              // เก็บไฟล์ static เช่น รูปภาพ, font
│   │   └── images/
│   ├── components/          // UI Components ทั่วไปที่นำเสนอข้อมูลเท่านั้น (Dumb components)
│   │   ├── common/          // Components เล็กๆ ที่ใช้ซ้ำบ่อย หรือเป็น Wrapper ของ MUI components
│   │   │   ├── Avatar.jsx       // อาจเป็น wrapper ของ MUI Avatar เพื่อเพิ่ม logic บางอย่าง
│   │   │   ├── AppButton.jsx    // Wrapper ของ MUI Button เพื่อกำหนด variant/color/size เป็นค่าเริ่มต้น
│   │   │   ├── AppInput.jsx     // Wrapper ของ MUI TextField เพื่อให้มี style และ validation ที่สอดคล้องกัน
│   │   │   ├── LoadingSpinner.jsx // Component แสดงสถานะโหลด (อาจใช้ MUI CircularProgress)
│   │   │   ├── ErrorMessage.jsx   // Component แสดงข้อผิดพลาด (อาจใช้ MUI Alert)
│   │   │   ├── ConfirmationModal.jsx // Wrapper ของ MUI Modal/Dialog สำหรับการยืนยัน
│   │   │   └── StyledDataGrid.jsx // Wrapper ของ MUI DataGrid ที่มีการตั้งค่า style/columns เริ่มต้น
│   │   └── layout/          // Components สำหรับโครงสร้างหน้าหลักของเว็บ
│   │       ├── Navbar.jsx       // แถบนำทางด้านบน (ใช้ MUI AppBar, Toolbar)
│   │       ├── Sidebar.jsx      // แถบด้านข้างสำหรับแสดงรายชื่อแชท (ใช้ MUI Drawer, List)
│   │       ├── PageWrapper.jsx  // Component ห่อหุ้มเนื้อหาแต่ละหน้า (ใช้ MUI Container, Box)
│   │       └── ProtectedRoute.jsx // Component สำหรับจัดการ Route ที่ต้อง Login
│   ├── constants/           // ค่าคงที่ที่ใช้ทั้งโปรเจกต์
│   │   ├── muiThemeConfig.js  // ค่าคงที่สำหรับ Theme เช่น color palette, typography scales
│   │   ├── apiConfig.js     // ค่าคงที่เกี่ยวกับ API เช่น BASE_URL
│   │   └── routes.js        // Path ของหน้าต่างๆ ในแอป
│   ├── features/            // โฟลเดอร์หัวใจหลักของแอป แบ่งโค้ดตามฟีเจอร์
│   │   ├── auth/            // ฟีเจอร์: การยืนยันตัวตน
│   │   │   ├── authApi.js
│   │   │   ├── authSlice.js
│   │   │   ├── LoginForm.jsx    // Component 'ฟอร์ม' Login (สร้างจาก MUI TextField, Button, Stack)
│   │   │   └── RegisterForm.jsx // Component 'ฟอร์ม' สมัครสมาชิก
│   │   ├── users/           // ฟีเจอร์: การจัดการผู้ใช้
│   │   │   ├── usersApi.js
│   │   │   ├── UserList.jsx     // Component แสดงรายชื่อผู้ใช้ (อาจใช้ StyledDataGrid.jsx)
│   │   │   ├── UserListItem.jsx // Component แสดง User 1 คน (ใช้ MUI ListItem, ListItemAvatar)
│   │   │   └── SettingsForm.jsx // ฟอร์มตั้งค่า (ใช้ MUI TextField, Select, Switch)
│   │   ├── chat/            // ฟีเจอร์: การแชท
│   │   │   ├── chatroomsApi.js
│   │   │   ├── messagesApi.js
│   │   │   ├── chatSlice.js
│   │   │   ├── ChatRoomList.jsx
│   │   │   ├── ChatRoomListItem.jsx
│   │   │   ├── ChatWindow.jsx   // หน้าต่างแชทหลัก (ใช้ MUI Grid, Paper)
│   │   │   ├── MessageList.jsx
│   │   │   ├── Message.jsx      // แสดง 1 ข้อความ (ใช้ MUI Box, Typography, Paper)
│   │   │   └── MessageInput.jsx // ที่พิมพ์ข้อความ (ใช้ MUI TextField, IconButton)
│   │   ├── friends/         // ฟีเจอร์: การจัดการเพื่อน
│   │   │   ├── friendsApi.js
│   │   │   ├── FriendList.jsx
│   │   │   ├── FriendListItem.jsx
│   │   │   ├── FriendRequestList.jsx
│   │   │   ├── FriendRequestItem.jsx
│   │   │   └── UserSearch.jsx
│   ├── hooks/               // Custom Hooks ที่สร้างขึ้นเองเพื่อใช้ซ้ำ Logic
│   │   ├── useAuth.js
│   │   └── useDebounce.js
│   ├── pages/               // Components ที่ทำหน้าที่ประกอบกันเป็น "หน้าเว็บ" จริงๆ
│   │   ├── LoginPage.jsx
│   │   ├── RegisterPage.jsx
│   │   ├── ChatPage.jsx
│   │   ├── FriendsPage.jsx
│   │   ├── SettingsPage.jsx
│   │   └── NotFoundPage.jsx
│   ├── services/            // ศูนย์กลางการตั้งค่า Service ภายนอก
│   │   └── api.js           // จุดศูนย์กลางและไฟล์ตั้งต้นของ RTK Query
│   ├── store/               // ศูนย์กลางของ Redux
│   │   └── store.js         // ไฟล์สำหรับกำหนดค่า (Configure) Redux Store
│   ├── styles/              // Global styles และการตั้งค่า Theme สำหรับ MUI
│   │   ├── muiTheme.js      // ไฟล์สร้าง Theme object โดยใช้ createTheme จาก MUI
│   │   └── ThemeProvider.jsx // Component ที่ห่อหุ้ม App เพื่อใส่ ThemeProvider และ CssBaseline
│   ├── utils/               // ฟังก์ชันช่วยเหลือทั่วไปที่ไม่เกี่ยวกับ UI
│   │   ├── formatDate.js
│   │   ├── validation.js
│   │   └── tokenStorage.js
│   ├── App.jsx              // Component หลักของแอป (จัดการ Routing และ Layout หลัก)
│   └── main.jsx             // จุดเริ่มต้นของแอป (Render App และครอบด้วย Provider ต่างๆ เช่น Redux, Theme)