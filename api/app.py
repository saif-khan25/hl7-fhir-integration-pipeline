from flask import Flask, request, jsonify

app = Flask(__name__)

@app.route('/fhir', methods=['POST'])
def receive_fhir():
    data = request.json
    return jsonify({"status": "received", "entries": len(data.get("entry", []))})

if __name__ == '__main__':
    app.run(port=5000)
