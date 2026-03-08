ผมจะทำ **API Specification สำหรับระบบของคุณ (Support / Ticket System – Model Set 8)** ให้ในรูปแบบเดียวกับตัวอย่างที่อาจารย์ให้ เพื่อให้คุณเอาไปใส่ไฟล์

```
docs/api-specification.md
```

ได้เลย ✅

---

# API Specification

**Project:** Support / Ticket System (Model Set 8)
**Base URL:** `http://localhost:3000`
**Swagger UI:** `http://localhost:3000/api`

---

# 📌 Standard Response Format

ทุก Endpoint ในระบบจะตอบกลับในรูปแบบ JSON มาตรฐานดังนี้

```json
{
  "success": true,
  "message": "string",
  "data": "object | array | null"
}
```

---

# 🎫 1. Ticket Management (Staff)

ใช้สำหรับเจ้าหน้าที่ในการดูและจัดการ Ticket

---

# 1.1 ดึง Ticket ทั้งหมด

**Method:** GET
**Endpoint:** `/tickets`

**Description:** ดึงรายการ Ticket ทั้งหมดในระบบ

**Response (200 OK)**

```json
{
  "success": true,
  "message": "Tickets retrieved successfully",
  "data": [
    {
      "id": 1,
      "email": "user@example.com",
      "subject": "Internet problem",
      "details": "Internet not working",
      "status": "OPEN",
      "priority": "MEDIUM",
      "createdAt": "2026-03-08T10:00:00Z",
      "updatedAt": "2026-03-08T10:00:00Z",
      "response": null,
      "staffName": null,
      "resolvedAt": null
    }
  ]
}
```

---

# 1.2 ดึง Ticket ตาม ID

**Method:** GET
**Endpoint:** `/tickets/{id}`

**Path Parameter**

```
id: number
```

**Response (200 OK)**

```json
{
  "success": true,
  "message": "Ticket found",
  "data": {
    "id": 1,
    "email": "user@example.com",
    "subject": "Internet problem",
    "details": "Internet not working",
    "status": "OPEN",
    "priority": "MEDIUM",
    "createdAt": "2026-03-08T10:00:00Z",
    "updatedAt": "2026-03-08T10:00:00Z",
    "response": null,
    "staffName": null,
    "resolvedAt": null
  }
}
```

---

# 1.3 อัปเดต Ticket

**Method:** PATCH
**Endpoint:** `/tickets/{id}`

**Description:** เจ้าหน้าที่อัปเดตสถานะหรือการตอบกลับ

**Request Body Example**

```json
{
  "staffName": "Admin",
  "response": "Please restart your router",
  "status": "RESOLVED"
}
```

**Response (200 OK)**

```json
{
  "success": true,
  "message": "Ticket updated successfully",
  "data": {}
}
```

---

# 1.4 แทนที่ Ticket ทั้งหมด

**Method:** PUT
**Endpoint:** `/tickets/{id}`

**Description:** แทนที่ข้อมูล Ticket ทั้งหมด

**Request Body**

```json
{
  "email": "user@example.com",
  "subject": "Internet problem",
  "details": "Internet still not working",
  "priority": "HIGH"
}
```

---

# 1.5 ลบ Ticket

**Method:** DELETE
**Endpoint:** `/tickets/{id}`

**Description:** ลบ Ticket ออกจากระบบ

**Response (200 OK)**

```json
{
  "success": true,
  "message": "Ticket deleted successfully",
  "data": null
}
```

---

# 👤 2. Customer (User)

ใช้สำหรับลูกค้าในการสร้างและติดตาม Ticket

---

# 2.1 สร้าง Ticket ใหม่

**Method:** POST
**Endpoint:** `/customer`

**Description:** ลูกค้าสร้าง Ticket เพื่อแจ้งปัญหา

**Request Body**

```json
{
  "email": "user@example.com",
  "subject": "Internet problem",
  "details": "Internet not working",
  "priority": "MEDIUM"
}
```

**Response (201 Created)**

```json
{
  "success": true,
  "message": "Ticket created successfully",
  "data": {
    "ticketId": 1,
    "message": "Ticket created successfully"
  }
}
```

---

# 2.2 ติดตาม Ticket

**Method:** GET
**Endpoint:** `/customer/track`

**Query Parameters**

```
ticketId: number
email: string
```

**Example**

```
/customer/track?ticketId=1&email=test@example.com
```

**Response (200 OK)**

```json
{
  "success": true,
  "message": "Ticket found",
  "data": {
    "id": 1,
    "email": "test@example.com",
    "subject": "Help needed",
    "details": "Cannot login",
    "status": "RESOLVED",
    "priority": "MEDIUM",
    "createdAt": "2026-03-06T11:12:49.111Z",
    "updatedAt": "2026-03-06T12:42:51.933Z",
    "response": "ok",
    "staffName": "Admin",
    "resolvedAt": "2026-03-06T12:42:51.933Z"
  }
}
```

---

# 📊 Ticket Status Enum

สถานะของ Ticket ในระบบ

```
OPEN – Ticket ถูกสร้างและรอดำเนินการ  
RESOLVED – ปัญหาได้รับการแก้ไขแล้ว  
REJECTED – Ticket ถูกปฏิเสธหรือไม่สามารถดำเนินการได้
```

---

# ⚡ Ticket Priority Enum

ระดับความสำคัญของ Ticket

```
LOW
MEDIUM
HIGH
```

---

# 🔄 Ticket Workflow

ลำดับการทำงานของ Ticket

```
OPEN → RESOLVED
  ↘
   REJECTED
```

---

# 📌 Error Handling

ระบบจะใช้ HTTP Status Code มาตรฐาน

| Status Code | Description           |
| ----------- | --------------------- |
| 200         | Success               |
| 201         | Resource Created      |
| 400         | Bad Request           |
| 404         | Resource Not Found    |
| 500         | Internal Server Error |

---