const express = require('express');
const fs = require('fs');
const app = express();

app.use(express.urlencoded({ extended: true })); // для разбора данных формы в теле запроса

app.get('/', (req, res) => {
    const ip = req.ip; // Получаем IP адрес клиента
    const client = req.headers['user-agent']; // Получаем идентификатор HTTP клиента
    const today = new Date().toISOString(); // Получаем текущую дату и время в формате ISO
    const param = req.query.a; // Получаем значение переменной "a" из строки запроса

    const logEntry = '${today}; ${ip}; ${client}; sensor=${param}\r\n-----------------\r\n';

    // Запись данных в файл
    fs.appendFile('log.csv', logEntry, (err) => {
        if (err) throw err;
    });

    res.send('<p>GPRS data read page</p>'); // Отправляем HTML ответ клиенту
});

const port = 5000;
app.listen(port, () => {
    console.log('Server running on port ${port}');
});
