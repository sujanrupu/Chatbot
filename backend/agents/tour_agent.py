from config import model
from memory import get_history

def get_tour_plan(user_message):

    history = get_history("tour")

    formatted_history = ""
    for chat in history:
        formatted_history += f"{chat['role']}: {chat['message']}\n"

    prompt = f"""
You are a Travel Planning AI Assistant.

Your role:
- Help users plan trips
- If the question is NOT related to trip or trip planning, politely say:
  "I am a Trip Planner agent and can only help with tour related questions."
- Suggest destinations
- Suggest activities
- Suggest number of days
- Keep answers simple and structured
- Do not use any text formatting or points. Write in signle paragraph.
- Max 8 sentences

Conversation so far:
{formatted_history}

User: {user_message}
AI:
"""

    response = model.generate_content(prompt)
    return response.text
