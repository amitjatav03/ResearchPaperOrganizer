from flask import Flask, request, jsonify, send_from_directory
from flask_cors import CORS
import PyPDF2
import re
import os
import webbrowser

app = Flask(__name__, static_folder=".", static_url_path="")
CORS(app)

# Function to extract year from PDF metadata
def extract_year(info):
    for key in ("/doi", "/ModDate"):
        value = info.get(key, "")
        match = re.search(r"(19|20)\d{2}", value)
        if match:
            return match.group(0)
    return ""

# API endpoint to extract metadata from uploaded PDF
@app.route('/extract_metadata', methods=['POST'])
def extract_metadata():
    try:
        file = request.files['file']
        info = PyPDF2.PdfReader(file).metadata or {}
        metadata = {
            "title": info.get("/Title", "") or "",
            "authors": info.get("/Author", "") or "",
            "year": extract_year(info),
            "journal": info.get("/Creator", "") or "",
            "keywords": info.get("/Keywords", "") or ""
        }

        # If no metadata found, return error message
        if not any(metadata.values()):
            return jsonify({"error": "Unable to fetch metadata, please fill manually"}), 200
        return jsonify(metadata)
    
    except Exception as e:
        return jsonify({"error": str(e)}), 500

# Serve the index.html file at the root URL
@app.route("/")
def index():
    return send_from_directory(os.getcwd(), "index.html")

# Run the Server/App
if __name__ == "__main__":
    port = 5000
    webbrowser.open(f"http://localhost:{port}/")
    app.run(host="0.0.0.0", port=port, debug=True)
