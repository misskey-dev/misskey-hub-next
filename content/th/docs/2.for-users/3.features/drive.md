# Drive

ไดรฟ์เป็นคุณสมบัติที่ช่วยให้คุณจัดการไฟล์บน Misskey

:::tip

ในทางเทคนิคแล้ว ไฟล์ทั้งหมดได้รับการจัดการจากส่วนกลางบนระบบ Misskey และอินเทอร์เฟซที่เปิดเผยต่อผู้ใช้อาจถือเป็นไดรฟ์

:::

นอกจากความสามารถในการอัปโหลดไฟล์ใดๆ จาก [หน้าไดรฟ์](x-mi-web://my/drive) ของ Misskey Web แล้ว รูปภาพที่ตั้งเป็นรูปประจำตัวและไฟล์ที่แนบมากับบันทึกจะถูกอัปโหลดไปยังไดรฟ์ทั้งหมด

ไฟล์ที่อัปโหลดไปยังไดรฟ์สามารถดาวน์โหลดไฟล์ได้ตลอดเวลา และคุณยังสามารถใช้ไฟล์ซ้ำได้โดยการ "แนบไฟล์จากไดรฟ์" เมื่อสร้างบันทึก

คุณยังสามารถสร้างโฟลเดอร์ภายในไดรฟ์เพื่อจัดระเบียบไฟล์หลายไฟล์พร้อมกันได้

:::warning

ในปัจจุบัน เมื่อคุณลบไฟล์ออกจากไดรฟ์ เนื้อหาทั้งหมด (บันทึก หน้า ฯลฯ) ที่แนบไฟล์นั้นก็จะหายไปเช่นกัน

:::

## มีเนื้อหาละเอียดอ่อน (NSFW)

มีความละเอียดอ่อนหรือ NSFW (Not safe for work) คือค่าสถานะที่สามารถตั้งค่าให้กับไฟล์ในไดรฟ์ได้
ไฟล์ที่ถูกทำเครื่องหมายว่าละเอียดอ่อนจะไม่แสดงขึ้นหากไม่มีการโต้ตอบจากผู้ดู
ธงนี้ใช้เพื่อกำหนดภาพที่ถือว่าไม่เหมาะสมสำหรับการดูในที่ทำงานหรือในที่สาธารณะ และเพื่อป้องกันไม่ให้ภาพดังกล่าวแสดงโดยกะทันหัน

การตั้งค่าสถานะนี้สามารถเปิดหรือปิดได้ด้วยตนเอง หรืออาจตั้งค่าได้ตามการตัดสินใจ
ของผู้ดูแล
