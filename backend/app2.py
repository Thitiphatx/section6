from flask import Flask, jsonify
from flask_cors import CORS
from flask_sqlalchemy import SQLAlchemy
from sqlalchemy.sql import text  # Import text() for raw SQL queries

app = Flask(__name__)

app.config['SQLALCHEMY_DATABASE_URI'] = "postgresql://admin:admin@postgres:5432/section6"
db = SQLAlchemy(app)

CORS(app)

@app.route("/")
def test2():
    try:
        result = db.session.query(Users)  # Wrap with text()
        users = [dict(row) for row in result]

        # Return the result as a JSON or render as HTML (in this case, JSON for clarity)
        return jsonify(users)
    except Exception as e:
        return f"<div>Error: {str(e)}</div>"

if __name__ == '__main__':
    app.run(debug=True)
