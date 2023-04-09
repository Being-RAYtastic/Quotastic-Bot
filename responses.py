import random
from quotes import quotes

def get_response(message: str) -> str:
    process_message = message.lower()

    if process_message == '-quote':
        return str(random.choice(quotes))

random.shuffle(quotes)


         