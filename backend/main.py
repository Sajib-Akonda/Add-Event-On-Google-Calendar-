from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from services.calendar import create_calendar_event

app = FastAPI()

# This is crucial! It allows your React app (running on port 5173) 
# to securely send messages to this Python app (running on port 8000).
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173"], 
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# This defines the data structure we expect from React
class EventRequest(BaseModel):
    prompt: str

@app.post("/api/add-event")
async def add_event(request: EventRequest):
    print(f"Received from React: {request.prompt}")
    
    # ⚠️ For now, we are hardcoding the event details to test the Google API.
    # Later, you will pass 'request.prompt' into your LLM to generate these variables!
    test_summary = "Meeting via AutoPrep AI"
    test_start = "2026-07-10T10:00:00Z" # Make sure this date is in the future!
    test_end = "2026-07-10T11:00:00Z"
    
    # Call the function you wrote in calendar.py
    event_link = create_calendar_event(
        summary=test_summary, 
        start_time=test_start, 
        end_time=test_end, 
        description=request.prompt
    )
    
    if event_link:
        return {"message": "Success", "eventLink": event_link}
    else:
        raise HTTPException(status_code=500, detail="Failed to create event")