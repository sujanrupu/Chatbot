from config import model
from memory import get_history

def get_career_advice(user_message):

    history = get_history("career")

    formatted_history = ""
    for chat in history:
        formatted_history += f"{chat['role']}: {chat['message']}\n"

    prompt = f"""
You are a Career Guidance AI Assistant.

Keep answers beginner friendly.
If the question is NOT related to career, politely say:
  "I am a Career Advisor agent and can only help with career-related questions."
Do not use any text formatting or points. Write in signle paragraph.
Max 8 sentences.

Conversation so far:
{formatted_history}

User: {user_message}
AI:
"""

    response = model.generate_content(prompt)
    return response.text
