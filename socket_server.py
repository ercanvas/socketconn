import socket
import os

def handle_client(conn):
    while True:
        data = conn.recv(1024).decode().strip()
        if not data:
            break
        if data == "ls":
            files = "\n".join(os.listdir("."))
            conn.send(files.encode())
    conn.close()

server = socket.socket(socket.AF_INET, socket.SOCK_STREAM)
server.bind(('0.0.0.0', 9000))
server.listen(1)
print("Socket sunucusu dinleniyor...")

while True:
    conn, addr = server.accept()
    print(f"Bağlantı geldi: {addr}")
    handle_client(conn)
