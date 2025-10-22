import json
import os
from typing import Optional, Tuple, List, Dict, Any
from agents import function_tool

@function_tool
def get_patient_info(
    name: Optional[str] = None,
    age: Optional[Tuple[int, int]] = None,
    gender: Optional[str] = None,
) -> List[Dict[str, Any]]:
    """
    Retrieve patient records from patient_records.json with optional filters.

    Args:
        name: Optional patient name to filter by (case-insensitive partial match)
        age: Optional tuple of (start_age, end_age) to filter patients within age range.
             The upper limit is capped at 100.
        gender: Optional gender to filter by (M, F, or variations like "Male", "Female")

    Returns:
        List of patient records that match the filters.
        Each record contains the full patient data from the JSON file.

    Example:
        # Get all patients older than 75
        get_patient_info(age=(75, 100))
        
        # Get female patients named "Jordan" between ages 30-50
        get_patient_info(name="Jordan", age=(30, 50), gender="F")
    """
    # Construct path to patient_records.json
    # The function is in api/utils/get_patient_info.py
    # patient_records.json is in the root directory
    current_dir = os.path.dirname(os.path.abspath(__file__))
    project_root = os.path.dirname(os.path.dirname(current_dir))
    records_path = os.path.join(project_root, "patient_records.json")

    # Load the patient records
    try:
        with open(records_path, "r") as f:
            data = json.load(f)
    except FileNotFoundError:
        return []
    except json.JSONDecodeError:
        return []

    # Extract the list of patient records
    patient_scribes = data.get("patient_scribes", {})
    patients = list(patient_scribes.values())

    # Apply filters
    filtered_patients = []

    for patient_record in patients:
        # Extract patient info from the nested structure
        patient_info = patient_record.get("patient", {})

        # Filter by name
        if name is not None:
            patient_name = patient_info.get("name", "").lower()
            if name.lower() not in patient_name:
                continue

        # Filter by age
        if age is not None:
            start_age, end_age = age
            # Cap the upper limit at 100
            end_age = min(end_age, 100)
            patient_age = patient_info.get("age")
            if patient_age is None or not (start_age <= patient_age <= end_age):
                continue

        # Filter by gender
        if gender is not None:
            # Normalize gender input
            gender_normalized = gender.upper()
            if gender_normalized in ("MALE", "M"):
                gender_normalized = "M"
            elif gender_normalized in ("FEMALE", "F"):
                gender_normalized = "F"

            patient_sex = patient_info.get("sex", "").upper()
            if patient_sex != gender_normalized:
                continue

        # Patient passed all filters
        filtered_patients.append(patient_record)

    return filtered_patients
