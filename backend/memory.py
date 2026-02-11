# memory.py

memory_store = {
    "career": [],
    "tour": []
}

def add_message(agent, role, message):
    memory_store[agent].append({
        "role": role,
        "message": message
    })

def get_history(agent):
    return memory_store[agent]

def clear_history(agent):
    memory_store[agent] = []
