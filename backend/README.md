# Audio Transcription Backend

This is a Flask backend providing a RESTful API for audio transcription service using Fish.audio API.

## Setup

1. Create a virtual environment (recommended):
   ```
   python -m venv venv
   source venv/bin/activate  # On Windows: venv\Scripts\activate
   ```

2. Install dependencies:
   ```
   pip install -r requirements.txt
   ```

3. Run the application:
   ```
   python app.py
   ```

The server will start on http://localhost:5000

## API Endpoints

### Audio Transcription API
- `POST /api/transcribe`: Transcribe an audio file

#### Transcription Request Format
Send a POST request with form data:
- `audio`: The audio file to transcribe (required)
- `language`: Language code (optional, defaults to 'en')
- `ignore_timestamps`: Set to 'True' to ignore precise timestamps (optional, defaults to 'False')

#### Transcription Response Format
```json
{
  "text": "Complete transcribed text",
  "duration": 10.5,
  "segments": [
    {
      "text": "Segment text",
      "start": 0.0,
      "end": 2.5
    },
    ...
  ]
}
``` 