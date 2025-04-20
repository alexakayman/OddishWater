from flask import Flask, request, jsonify
from flask_cors import CORS
import httpx
import ormsgpack
import os
import traceback
from dotenv import load_dotenv

load_dotenv()  # Load environment variables from .env file

app = Flask(__name__)
CORS(app)  # Enable CORS to allow frontend to access the API

# API key for Fish.audio
FISH_AUDIO_API_KEY = "246a43b8201246888db77843669c5d66"

@app.route('/api/transcribe', methods=['POST'])
def transcribe_audio():
    try:
        if 'audio' not in request.files:
            return jsonify({"error": "No audio file provided"}), 400
        
        audio_file = request.files['audio']
        audio_data = audio_file.read()
        
        if not audio_data:
            return jsonify({"error": "Empty audio file provided"}), 400
            
        # Log details about the received file
        print(f"Received audio file: {audio_file.filename}, size: {len(audio_data)} bytes")
        
        # Get optional parameters from request
        language = request.form.get('language', 'en')
        ignore_timestamps = request.form.get('ignore_timestamps', 'False').lower() == 'true'
        
        # Prepare the request data
        request_data = {
            "audio": audio_data,
            "language": language,
            "ignore_timestamps": ignore_timestamps
        }
        
        print(f"Sending request to Fish Audio API with language={language}, ignore_timestamps={ignore_timestamps}")
        
        # Send the request to Fish Audio API
        with httpx.Client(timeout=30.0) as client:  # Set a 30-second timeout
            response = client.post(
                "https://api.fish.audio/v1/asr",
                headers={
                    "Authorization": f"Bearer {FISH_AUDIO_API_KEY}",
                    "Content-Type": "application/msgpack",
                },
                content=ormsgpack.packb(request_data),
            )
        
        # Check if the request was successful
        response.raise_for_status()
        
        result = response.json()
        print(f"Transcription successful: {result.get('text', '')[:50]}...")
        
        # Return the transcription result
        return jsonify(result)
    
    except httpx.HTTPStatusError as e:
        error_msg = f"API request failed: {str(e)}"
        print(error_msg)
        print(f"Response content: {e.response.content}")
        return jsonify({"error": error_msg}), 500
        
    except Exception as e:
        error_msg = f"Transcription failed: {str(e)}"
        print(error_msg)
        print(traceback.format_exc())  # Print the full traceback for debugging
        return jsonify({"error": error_msg}), 500

if __name__ == '__main__':
    # Set host to 0.0.0.0 to make it accessible externally
    app.run(debug=True, host='0.0.0.0', port=5000) 