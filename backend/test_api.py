"""
Простой скрипт для тестирования API эндпоинтов.
Убедитесь, что сервер запущен (uvicorn main:app --reload)
"""

import requests
import json
from datetime import datetime

BASE_URL = "http://localhost:8000"

def print_response(title, response):
    print(f"\n{'=' * 60}")
    print(f"{title}")
    print(f"{'=' * 60}")
    print(f"Status Code: {response.status_code}")
    try:
        print(json.dumps(response.json(), indent=2, default=str))
    except:
        print(response.text)

def test_health():
    response = requests.get(f"{BASE_URL}/health")
    print_response("Health Check", response)

def test_get_vibes():
    response = requests.get(f"{BASE_URL}/api/vibes")
    print_response("GET /api/vibes", response)

def test_create_vibe(content):
    payload = {"content": content}
    response = requests.post(f"{BASE_URL}/api/vibes", json=payload)
    print_response(f"POST /api/vibes - '{content}'", response)
    return response.json()["id"] if response.status_code == 200 else None

def test_like_vibe(vibe_id):
    response = requests.patch(f"{BASE_URL}/api/vibes/{vibe_id}/like")
    print_response(f"PATCH /api/vibes/{vibe_id}/like", response)

def test_invalid_vibe():
    # Попытка создать вайб без контента
    payload = {"content": ""}
    response = requests.post(f"{BASE_URL}/api/vibes", json=payload)
    print_response("POST /api/vibes - Empty content (should fail)", response)

def test_too_long_vibe():
    # Попытка создать вайб с контентом > 280 символов
    payload = {"content": "A" * 281}
    response = requests.post(f"{BASE_URL}/api/vibes", json=payload)
    print_response("POST /api/vibes - Too long (>280 chars, should fail)", response)

def test_not_found():
    response = requests.patch(f"{BASE_URL}/api/vibes/99999/like")
    print_response("PATCH /api/vibes/99999/like - Not found (should fail)", response)

def main():
    print("\n🎵 VibeCheck API Testing Script 🎵")
    print(f"Base URL: {BASE_URL}")

    try:
        # Test health
        test_health()

        # Get initial vibes
        test_get_vibes()

        # Create some vibes
        vibe_id_1 = test_create_vibe("Отличный день!")
        vibe_id_2 = test_create_vibe("Немного устал")
        vibe_id_3 = test_create_vibe("Feeling great! 🌟")

        # Get vibes again
        test_get_vibes()

        # Like some vibes
        if vibe_id_1:
            test_like_vibe(vibe_id_1)
            test_like_vibe(vibe_id_1)

        if vibe_id_2:
            test_like_vibe(vibe_id_2)

        # Get updated vibes
        test_get_vibes()

        # Test validation errors
        test_invalid_vibe()
        test_too_long_vibe()
        test_not_found()

        print("\n" + "=" * 60)
        print("✅ Testing complete!")
        print("=" * 60)

    except requests.exceptions.ConnectionError:
        print("\n❌ Error: Could not connect to the server.")
        print("Make sure the server is running:")
        print("  uvicorn main:app --reload")

if __name__ == "__main__":
    main()
