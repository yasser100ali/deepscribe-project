import json
import os
from typing import Optional, Tuple, List, Dict, Any

def _load_patient_records() -> Dict[str, Any]:
    """
    Helper function to load patient records from JSON file.
    
    Returns:
        Dictionary containing patient_scribes data, or empty dict if error.
    """
    current_dir = os.path.dirname(os.path.abspath(__file__))
    project_root = os.path.dirname(os.path.dirname(current_dir))
    records_path = os.path.join(project_root, "patient_records.json")

    try:
        with open(records_path, "r") as f:
            data = json.load(f)
            return data.get("patient_scribes", {})
    except (FileNotFoundError, json.JSONDecodeError):
        return {}

def get_patient_names() -> List[Dict[str, str]]:
    """
    Retrieve all patient names and their corresponding patient IDs.
    
    Returns:
        List of dictionaries with 'patient_id' and 'name' keys.
        Example: [{"patient_id": "jordan_carter", "name": "Jordan Carter"}, ...]
    """
    patient_scribes = _load_patient_records()
    
    patient_list = []
    for patient_id, record in patient_scribes.items():
        patient_info = record.get("patient", {})
        name = patient_info.get("name", "")
        if name:
            patient_list.append({
                "patient_id": patient_id,
                "name": name
            })
    
    return patient_list

def get_patient_info(
    patient_id: str,
    age: Optional[Tuple[int, int]] = None,
    gender: Optional[str] = None,
) -> Dict[str, Any]:
    """
    Retrieve a specific patient record by patient ID with optional filters.

    Args:
        patient_id: Required patient ID to retrieve (e.g., "jordan_carter", "emily_chen")
        age: Optional tuple of (start_age, end_age) to filter patients within age range.
             The upper limit is capped at 100.
        gender: Optional gender to filter by (M, F, or variations like "Male", "Female")

    Returns:
        Patient record dictionary if found and matches filters, otherwise empty dict.

    Example:
        # Get patient by ID
        get_patient_info(patient_id="jordan_carter")
        
        # Get patient by ID with age filter
        get_patient_info(patient_id="emily_chen", age=(30, 50), gender="F")
    """
    patient_scribes = _load_patient_records()
    
    # Get the specific patient record
    patient_record = patient_scribes.get(patient_id)
    if not patient_record:
        return {"error": f"Patient ID '{patient_id}' not found"}
    
    patient_info = patient_record.get("patient", {})
    
    # Apply optional filters
    if age is not None:
        start_age, end_age = age
        end_age = min(end_age, 100)
        patient_age = patient_info.get("age")
        if patient_age is None or not (start_age <= patient_age <= end_age):
            return {"error": f"Patient does not match age range {start_age}-{end_age}"}
    
    if gender is not None:
        # Normalize gender input
        gender_normalized = gender.upper()
        if gender_normalized in ("MALE", "M"):
            gender_normalized = "M"
        elif gender_normalized in ("FEMALE", "F"):
            gender_normalized = "F"
        
        patient_sex = patient_info.get("sex", "").upper()
        if patient_sex != gender_normalized:
            return {"error": f"Patient does not match gender filter '{gender}'"}
    
    return patient_record
