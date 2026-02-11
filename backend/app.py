from flask import Flask, request, jsonify
from flask_cors import CORS
from agents.career_agent import get_career_advice
from agents.tour_agent import get_tour_plan
from memory import add_message

app = Flask(__name__)
CORS(app)

@app.route("/career", methods=["POST"])
def career_chat():
    user_message = request.json.get("message")

    add_message("career", "User", user_message)
    reply = get_career_advice(user_message)
    add_message("career", "AI", reply)

    return jsonify({"reply": reply})


@app.route("/tour", methods=["POST"])
def tour_chat():
    user_message = request.json.get("message")

    add_message("tour", "User", user_message)
    reply = get_tour_plan(user_message)
    add_message("tour", "AI", reply)

    return jsonify({"reply": reply})


if __name__ == "__main__":
    app.run(debug=True, use_reloader=False)
