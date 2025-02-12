import pg8000

conn = pg8000.connect(
    user="admin",
    password="admin",
    host="localhost",
    port=5432,
    database="section6"
)

cursor = conn.cursor()
cursor.execute("SELECT * FROM Users")  # Example query
rows = cursor.fetchall()

for row in rows:
    print(row)

conn.close()