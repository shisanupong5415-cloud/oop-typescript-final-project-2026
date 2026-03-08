# Data Model Documentation

**Project Name:** Support / Ticket System  
**Model Set:** 8  

เอกสารฉบับนี้อธิบายโครงสร้างข้อมูล (Data Model) ทั้งหมดที่ใช้ในระบบรับแจ้งปัญหาและติดตามสถานะ (Support / Ticket System) โดยแบ่งออกเป็น Enumerations สำหรับควบคุมสถานะ และ Interfaces สำหรับโครงสร้างข้อมูลหลัก

---

## 1. Enumerations (ประเภทข้อมูลแบบกำหนดค่าคงที่)

ระบบมีการใช้ Enum เพื่อควบคุมสถานะและระดับความสำคัญให้เป็นไปตามมาตรฐาน ป้องกันการกรอกข้อมูลผิดพลาด

### 1.1 `TicketStatus`
ระบุสถานะปัจจุบันของ Ticket
* `OPEN`: เปิดอยู่ รอการตอบกลับจากเจ้าหน้าที่
* `RESOLVED`: แก้ไขปัญหาเรียบร้อยแล้ว
* `REJECTED`: ถูกปฏิเสธโดยเจ้าหน้าที่

### 1.2 `TicketPriority`
ระบุระดับความสำคัญของ Ticket
* `LOW`: ความสำคัญต่ำ
* `MEDIUM`: ความสำคัญปานกลาง
* `HIGH`: ความสำคัญสูง

---

## 2. Core Models (โครงสร้างข้อมูลหลัก)

Core Model หลักของระบบตามโจทย์คือ **Ticket** และ **Customer** ซึ่งได้รับการออกแบบให้มี Attribute ไม่ต่ำกว่า 10 รายการตามข้อกำหนด

### 2.1 Ticket (ข้อมูลการแจ้งปัญหา)
เก็บข้อมูลรายละเอียดของแต่ละ Ticket ที่ลูกค้าสร้างขึ้นเพื่อแจ้งปัญหาเข้ามาในระบบ *(รวม 11 Attributes)*

| Attribute | Type | Description | Category (Guideline) |
| :--- | :--- | :--- | :--- |
| `id` | `number` | รหัสอ้างอิง Ticket (auto-increment) | Identity |
| `email` | `string` | อีเมลของลูกค้าที่แจ้งปัญหา | Identity / Relation |
| `subject` | `string` | หัวข้อปัญหาที่แจ้ง | Core Domain |
| `details` | `string` | รายละเอียดของปัญหาที่ต้องการความช่วยเหลือ | Core Domain |
| `status` | `TicketStatus` | สถานะปัจจุบันของ Ticket | Status / State |
| `priority` | `TicketPriority` | ระดับความสำคัญของ Ticket | Configuration / Flag |
| `createdAt` | `string` | วันและเวลาที่สร้าง Ticket (ISO format) | Timestamp |
| `updatedAt` | `string` | วันและเวลาที่แก้ไข Ticket ล่าสุด (ISO format) | Timestamp |
| `response` | `string \| null` | ข้อความตอบกลับจากเจ้าหน้าที่ | Core Domain |
| `staffName` | `string \| null` | ชื่อเจ้าหน้าที่ที่รับผิดชอบ Ticket | Relation |
| `resolvedAt` | `string \| null` | วันและเวลาที่ Ticket ถูก Resolve หรือ Reject (ISO format) | Timestamp |

### 2.2 Customer (ลูกค้า)
เป็นโมดูลสำหรับฝั่งลูกค้าที่ต้องการแจ้งปัญหา โดย Customer สามารถสร้าง Ticket ใหม่ และติดตามสถานะ Ticket ของตนเองผ่านการยืนยันด้วย Ticket ID + Email

Customer actions:
* **สร้าง Ticket** — ส่งข้อมูลการแจ้งปัญหาเข้าระบบ พร้อมระบุอีเมล, หัวข้อ, รายละเอียด และระดับความสำคัญ (ไม่บังคับ)
* **ติดตาม Ticket** — ค้นหา Ticket ที่เคยสร้างไว้ โดยยืนยันตัวตนด้วยรหัส Ticket ID และอีเมล

---

## 3. Supporting Models (โครงสร้างข้อมูลสนับสนุน)

### 3.1 CreateTicketDto (ข้อมูลสำหรับสร้าง Ticket)
โครงสร้างข้อมูลที่ลูกค้าส่งเข้ามาเมื่อต้องการสร้าง Ticket ใหม่

| Attribute | Type | Description | Validation |
| :--- | :--- | :--- | :--- |
| `email` | `string` | อีเมลของลูกค้า | ต้องเป็นรูปแบบอีเมลที่ถูกต้อง, ห้ามว่าง |
| `subject` | `string` | หัวข้อปัญหา | ห้ามว่าง |
| `details` | `string` | รายละเอียดปัญหา | ห้ามว่าง |
| `priority` | `TicketPriority` | ระดับความสำคัญ (ค่าเริ่มต้น: `MEDIUM`) | ต้องเป็นค่าใน Enum (ไม่บังคับ) |

### 3.2 UpdateTicketDto (ข้อมูลสำหรับอัปเดต Ticket)
โครงสร้างข้อมูลที่เจ้าหน้าที่ใช้เพื่ออัปเดต Ticket (Partial Update ผ่าน PATCH)

| Attribute | Type | Description | Validation |
| :--- | :--- | :--- | :--- |
| `staffName` | `string` | ชื่อเจ้าหน้าที่ที่รับผิดชอบ | ห้ามว่างถ้าส่งมา (ไม่บังคับ) |
| `response` | `string` | ข้อความตอบกลับของเจ้าหน้าที่ | ห้ามว่างถ้าส่งมา (ไม่บังคับ) |
| `status` | `TicketStatus` | สถานะใหม่ของ Ticket | ต้องเป็นค่าใน Enum (ไม่บังคับ) |

### 3.3 TrackTicketDto (ข้อมูลสำหรับติดตาม Ticket)
โครงสร้างข้อมูลที่ลูกค้าส่งเข้ามาเพื่อค้นหาและติดตามสถานะ Ticket ของตนเอง

| Attribute | Type | Description | Validation |
| :--- | :--- | :--- | :--- |
| `ticketId` | `number` | รหัส Ticket ที่ต้องการติดตาม | ต้องเป็นตัวเลข, ห้ามว่าง |
| `email` | `string` | อีเมลสำหรับยืนยันตัวตน | ต้องเป็นรูปแบบอีเมลที่ถูกต้อง, ห้ามว่าง |

### 3.4 ApiResponse\<T\> (รูปแบบ Response มาตรฐาน)
โครงสร้าง Response มาตรฐานที่ทุก API Endpoint ใช้ร่วมกัน

| Attribute | Type | Description |
| :--- | :--- | :--- |
| `success` | `boolean` | ผลลัพธ์ว่า Request สำเร็จหรือไม่ |
| `message` | `string` | ข้อความอธิบายผลลัพธ์ |
| `data` | `T \| null` | ข้อมูลที่ส่งกลับ หรือ null ถ้าไม่มีข้อมูล |

---

## 4. ความสัมพันธ์ระหว่าง Model (Relationships)

```
Customer ──สร้าง──> Ticket
   │                  │
   │                  ├── status: TicketStatus (enum)
   │                  └── priority: TicketPriority (enum)
   │
   └──ติดตาม──> Ticket (ยืนยันด้วย ticketId + email)

Staff ──อัปเดต──> Ticket (staffName, response, status)
```

* **Customer** สร้าง Ticket โดยใช้อีเมลเป็นตัวระบุตัวตน ซึ่งอีเมลจะถูกเก็บไว้ใน Ticket
* **Customer** สามารถติดตาม Ticket ของตนเองได้โดยใช้ Ticket ID + Email ในการยืนยัน
* **เจ้าหน้าที่ (Staff)** สามารถดู Ticket ทั้งหมดและอัปเดตได้ (เพิ่มคำตอบ, เปลี่ยนสถานะ, ระบุชื่อผู้รับผิดชอบ)
* เมื่อสถานะ Ticket เปลี่ยนเป็น `RESOLVED` หรือ `REJECTED` ระบบจะบันทึก `resolvedAt` อัตโนมัติ
* เมื่อสถานะ Ticket เปลี่ยนกลับเป็น `OPEN` ระบบจะล้างค่า `resolvedAt` ออก

---

## 5. การจัดเก็บข้อมูล (Data Storage)

* ข้อมูลจัดเก็บในรูปแบบ JSON file ที่ `data/tickets.json`
* ไฟล์จะถูกสร้างอัตโนมัติหากยังไม่มี
* Ticket ID เป็นแบบ auto-increment
* เมื่อสร้าง Ticket ใหม่ ระบบจะส่งอีเมลแจ้งเตือนลูกค้าเป็น background process
