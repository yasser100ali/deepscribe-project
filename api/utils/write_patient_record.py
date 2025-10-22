import json
import os
from datetime import datetime
from typing import Dict, Any, Optional, List

PATIENT_RECORDS_PATH = os.path.join(
    os.path.dirname(os.path.dirname(os.path.dirname(__file__))),
    "patient_records.json"
)

def write_patient_intake(
    name: str,
    age: int,
    sex: str,
    chief_complaint: str,
    symptoms: List[str],
    medications: Optional[List[str]] = None,
    conditions: Optional[List[str]] = None,
    family_history: Optional[str] = None,
    conversation_summary: str = "",
    ai_assessment: str = "",
    reason_for_visit: str = "",
    allergies: Optional[List[str]] = None
) -> Dict[str, Any]:
    """
    Write a new patient intake record to the patient_records.json file.
    This creates an entry under the 'AI_scribes' key.
    
    Args:
        name: Patient's full name
        age: Patient's age
        sex: Patient's sex (M/F)
        chief_complaint: Main reason for visit
        symptoms: List of symptoms reported
        medications: List of current medications (optional)
        conditions: List of existing medical conditions (optional)
        family_history: Relevant family medical history (optional)
        conversation_summary: Summary of the conversation
        ai_assessment: AI's assessment and recommendations
        reason_for_visit: Whether scheduling appointment, asking questions, etc.
        allergies: List of known allergies (optional)
        
    Returns:
        Dict with status and patient_id of the created record
    """
    try:
        # Load existing records
        with open(PATIENT_RECORDS_PATH, 'r') as f:
            data = json.load(f)
        
        # Ensure AI_scribes key exists
        if "AI_scribes" not in data:
            data["AI_scribes"] = {}
        
        # Create patient ID from name (lowercase, replace spaces with underscores)
        patient_id = name.lower().replace(" ", "_").replace(".", "")
        
        # Create timestamp
        timestamp = datetime.now().isoformat()
        
        # Create the patient intake record
        intake_record = {
            "timestamp": timestamp,
            "patient_info": {
                "name": name,
                "age": age,
                "sex": sex
            },
            "chief_complaint": chief_complaint,
            "reason_for_visit": reason_for_visit,
            "symptoms": symptoms if symptoms else [],
            "current_medications": medications if medications else [],
            "existing_conditions": conditions if conditions else [],
            "allergies": allergies if allergies else [],
            "family_history": family_history if family_history else "Not provided",
            "conversation_summary": conversation_summary,
            "ai_assessment": ai_assessment,
            "status": "pending_review"
        }
        
        # Add to AI_scribes
        data["AI_scribes"][patient_id] = intake_record
        
        # Write back to file
        with open(PATIENT_RECORDS_PATH, 'w') as f:
            json.dump(data, f, indent=2)
        
        return {
            "status": "success",
            "message": f"Patient intake record created successfully for {name}",
            "patient_id": patient_id,
            "timestamp": timestamp
        }
        
    except Exception as e:
        return {
            "status": "error",
            "message": f"Failed to write patient record: {str(e)}"
        }

