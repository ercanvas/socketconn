const express = require('express');
const net = require('net');
const path = require('path');
const app = express();
const PORT = process.env.PORT || 3000;

const SECRET = "123456"; // Bunu çevresel değişkene taşıman iyi olur

app.use(express.static(path.join(__dirname, 'public')));
app.use(express.json());

app.post('/connect', (req, res) => {
    const { password } = req.body;
    if (password !== SECRET) {
        return res.status(403).send('Yanlış şifre.');
    }

    const client = new net.Socket();
    client.connect(9000, '192.168.183.164', () => {
        client.write('ls\n');
    });

    let response = '';
    client.on('data', (data) => {
        response += data.toString();
    });

    client.on('end', () => {
        res.send(response);
    });

    client.on('error', (err) => {
        res.status(500).send('Sunucuya bağlanılamadı: ' + err.message);
    });
});

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
