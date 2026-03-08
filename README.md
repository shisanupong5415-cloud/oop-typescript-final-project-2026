# OOP Final Project - Support / Ticket System

## 📌 Project Overview

โปรเจคนี้เป็นระบบ Backend REST API สำหรับ **ระบบรับแจ้งปัญหาและติดตาม Ticket (Support / Ticket System)** พัฒนาด้วย **NestJS Framework** และ **TypeScript** โดยเป็นส่วนหนึ่งของ Final Project รายวิชา **Object-Oriented Programming**

ระบบถูกออกแบบเพื่อให้ผู้ใช้งานสามารถ **แจ้งปัญหา (Create Ticket)** และ **ติดตามสถานะ Ticket** ได้ ในขณะที่เจ้าหน้าที่สามารถ **ดูและจัดการ Ticket ทั้งหมดในระบบ**

ระบบประกอบด้วย 2 ส่วนหลัก ได้แก่:

1. **Customer Module:** สำหรับลูกค้าใช้สร้าง Ticket และติดตามสถานะ Ticket
2. **Ticket Management Module:** สำหรับเจ้าหน้าที่ใช้จัดการ Ticket (ดู, แก้ไข, อัปเดตสถานะ และลบ Ticket)

ระบบใช้การจำลองฐานข้อมูลด้วยไฟล์ **JSON-based Database** และมีการเขียนเอกสาร API ด้วย **Swagger (OpenAPI)**

---

## 👥 Team & Contributors

* ธีรภัทร์ ถิระอัมพรพิชญ์ 68010547
* ธันยธร ศรีพงษ์เพลิด 68010520
* ชิษณุพงศ์ แจ่มใส 68010251

---

## 🛠 Technology Stack

* **Framework:** NestJS
* **Language:** TypeScript
* **API Style:** REST API
* **Database:** JSON-based (file-based storage)
* **API Documentation:** Swagger (OpenAPI)
* **Validation:** `class-validator` และ `class-transformer`
* **Email Service:** Nodemailer
* **Template Engine:** Handlebars (HBS)

---

## 🚀 การติดตั้งและรันโปรเจค

### 1. ติดตั้ง Dependencies

เปิด Terminal แล้วรันคำสั่ง:

```bash
npm install
````

### 2. รัน Development Server

```bash
npm run start:dev
```

### 3. ดู API Documentation (Swagger)

เมื่อ Server ทำงานแล้ว สามารถเข้าไปทดสอบ API ทั้งหมดได้ที่

```
http://localhost:3000/api
```

---

## 📁 Project Structure

```text
.
├── docs/
│   ├── api-specification.md
│   ├── data-model.md
│   └── uml-diagram.png
│
├── src/
│   ├── main.ts
│   ├── app.module.ts
│   │
│   ├── modules/
│   │   ├── tickets/
│   │   │   ├── dto/
│   │   │   ├── entities/
│   │   │   ├── tickets.controller.ts
│   │   │   └── tickets.service.ts
│   │   │
│   │   └── customer/
│   │       ├── dto/
│   │       ├── customer.controller.ts
│   │       └── customer.service.ts
│   │
│   └── common/
│       ├── enums/
│       ├── interfaces/
│       └── utils/
│
├── data/
│   └── tickets.json
│
├── package.json
├── tsconfig.json
└── README.md
```

---

## 🎫 System Features

### 1. Customer Features

ลูกค้าสามารถใช้งานระบบเพื่อแจ้งปัญหาและติดตาม Ticket

* สร้าง Ticket ใหม่
* ติดตามสถานะ Ticket
* รับอีเมลแจ้งเตือนเมื่อสร้าง Ticket สำเร็จ

### 2. Ticket Management (Staff)

เจ้าหน้าที่สามารถจัดการ Ticket ภายในระบบ

* ดู Ticket ทั้งหมด
* ดู Ticket ตาม ID
* อัปเดตสถานะ Ticket
* เพิ่มการตอบกลับ (Response)
* ลบ Ticket

---

## 🖥️ User Interface (UI) – *Beta*

นอกจาก REST API แล้ว โปรเจคนี้ยังมีการพัฒนา **User Interface (UI)** เพื่อให้ผู้ใช้งานสามารถโต้ตอบกับระบบผ่านเว็บเบราว์เซอร์ อย่างไรก็ตาม UI ในปัจจุบันยังอยู่ในสถานะ **Beta (อยู่ระหว่างการพัฒนา)** และยังไม่ครบทุกฟีเจอร์

UI นี้ถูกสร้างขึ้นเพื่อช่วยในการทดสอบระบบ API และจำลองการใช้งานจริงของผู้ใช้

### วิธีเปิดใช้งาน Web UI

เมื่อรัน Server แล้ว สามารถเข้าใช้งาน Web Interface ได้ผ่าน Browser ที่

```
http://localhost:3000
```

### Current UI Features (Beta)

* หน้า **Create Ticket** สำหรับลูกค้าใช้สร้าง Ticket ใหม่
* หน้า **Track Ticket** สำหรับตรวจสอบสถานะ Ticket
* หน้า **Manage Tickets** สำหรับเจ้าหน้าที่ดูรายการ Ticket ทั้งหมด

### Example UI Routes

```
/create-ticket
/track-ticket
/manage-ticket
```

### หมายเหตุ

UI นี้ถูกพัฒนาขึ้นเพื่อใช้เป็น **Demo Interface สำหรับทดสอบ API** เท่านั้น โดยระบบหลักของโปรเจคยังคงเป็น **Backend REST API**

ในอนาคตอาจมีการพัฒนาเพิ่มเติม เช่น

* Dashboard สำหรับเจ้าหน้าที่
* ระบบ Login สำหรับ Staff
* การแสดงสถานะ Ticket แบบ Real-time
* การออกแบบ UI/UX ให้สมบูรณ์มากขึ้น

---

---

## 📄 ลิงก์ไปยังเอกสารทางเทคนิค (Documentation)

สามารถดูเอกสารรายละเอียดของระบบได้ที่โฟลเดอร์ `docs/`

* 🔌 **API Specification** – รายละเอียด Endpoint ทั้งหมด
* 🧱 **Data Model Documentation** – โครงสร้างข้อมูลของระบบ
* 📊 **UML Diagram** – แผนภาพความสัมพันธ์ของโมเดลในระบบ

---