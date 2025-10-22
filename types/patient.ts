export interface PatientVitals {
  bp?: string;
  hr_bpm?: number;
  rr_bpm?: number;
  temp_f?: number;
  spo2_pct?: number;
  bmi?: number;
}

export interface Patient {
  mrn: string;
  name: string;
  dob: string;
  age: number;
  sex: string;
}

export interface TranscriptEntry {
  t: string;
  speaker: string;
  text: string;
}

export interface MedicationChange {
  stop?: string;
  start?: string;
  continue?: string;
}

export interface Assessment {
  problem: string;
  icd10: string;
  likely_etiologies?: string[];
  red_flags_present?: boolean;
  control?: string;
  severity?: string;
  concern?: string;
  context?: string;
  control_summary?: string;
}

export interface PatientRecord {
  encounter_id: string;
  timestamp: string;
  location: string;
  provider: {
    name: string;
    specialty: string;
  };
  patient: Patient;
  chief_complaint: string;
  vitals: PatientVitals;
  history: {
    hpi: string;
    pmh: string[];
    medications_prior_to_visit: string[];
    allergies: string[];
    social_history: Record<string, string>;
    family_history: string[];
  };
  exam: Record<string, string>;
  assessment: Assessment[];
  plan: {
    medication_changes?: MedicationChange[];
    orders_today?: string[];
    conditional_orders?: string[];
    education?: string[];
    follow_up?: Array<{
      type: string;
      when: string;
      purpose: string;
    }>;
    shared_decision_making?: string;
    diagnostic_workup?: string[];
    empiric_treatment?: string[];
  };
  impact_on_function?: Record<string, string>;
  self_care_and_remedies?: Record<string, string | string[]>;
  exposures?: Record<string, string | string[]>;
  medication_side_effects_and_concerns?: Record<string, any>;
  adherence_and_acceptance?: Record<string, any>;
  transcript: TranscriptEntry[];
}

export interface PatientRecords {
  patient_scribes: Record<string, PatientRecord>;
}

