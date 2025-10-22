"use client";

import React from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { PatientRecord } from "@/types/patient";
import { cn } from "@/lib/utils";
import { ChevronLeft } from "lucide-react";

interface PatientDetailProps {
  patientId: string;
  record: PatientRecord;
  onBack: () => void;
}

export function PatientDetail({ patientId, record, onBack }: PatientDetailProps) {
  const [showTranscript, setShowTranscript] = React.useState(false);

  return (
    <div className="flex flex-col h-full">
      {/* Header */}
      <div className="flex-shrink-0 px-6 py-4 border-b">
        <Button
          variant="ghost"
          size="sm"
          onClick={onBack}
          className="mb-3 -ml-2"
        >
          <ChevronLeft className="h-4 w-4 mr-1" />
          Back to Patients
        </Button>
        <div className="flex items-start justify-between">
          <div>
            <h2 className="text-2xl font-semibold tracking-tight">
              {record.patient.name}
            </h2>
            <p className="text-sm text-muted-foreground mt-1">
              MRN: {record.patient.mrn} • DOB: {record.patient.dob}
            </p>
          </div>
          <span
            className={cn(
              "text-xs px-3 py-1 rounded-full font-medium",
              record.patient.sex === "M"
                ? "bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-300"
                : "bg-pink-100 text-pink-700 dark:bg-pink-900/30 dark:text-pink-300"
            )}
          >
            {record.patient.sex === "M" ? "Male" : "Female"}, {record.patient.age}
          </span>
        </div>
      </div>

      {/* Content */}
      <div className="flex-1 overflow-y-auto px-6 py-4">
        <div className="space-y-6">
          {/* Encounter Info */}
          <Section title="Encounter Information">
            <InfoRow label="Date" value={new Date(record.timestamp).toLocaleString()} />
            <InfoRow label="Location" value={record.location} />
            <InfoRow
              label="Provider"
              value={`${record.provider.name} (${record.provider.specialty})`}
            />
            <InfoRow label="Chief Complaint" value={record.chief_complaint} />
          </Section>

          {/* Vitals */}
          <Section title="Vitals">
            <div className="grid grid-cols-2 gap-3">
              {record.vitals.bp && <InfoRow label="BP" value={record.vitals.bp} />}
              {record.vitals.hr_bpm && (
                <InfoRow label="Heart Rate" value={`${record.vitals.hr_bpm} bpm`} />
              )}
              {record.vitals.temp_f && (
                <InfoRow label="Temperature" value={`${record.vitals.temp_f}°F`} />
              )}
              {record.vitals.spo2_pct && (
                <InfoRow label="SpO2" value={`${record.vitals.spo2_pct}%`} />
              )}
              {record.vitals.rr_bpm && (
                <InfoRow label="Resp Rate" value={`${record.vitals.rr_bpm} bpm`} />
              )}
              {record.vitals.bmi && <InfoRow label="BMI" value={record.vitals.bmi.toString()} />}
            </div>
          </Section>

          {/* History */}
          <Section title="History">
            <div className="space-y-3">
              <div>
                <p className="text-sm font-medium mb-1">HPI</p>
                <p className="text-sm text-muted-foreground">{record.history.hpi}</p>
              </div>
              {record.history.pmh && record.history.pmh.length > 0 && (
                <ListItem label="PMH" items={record.history.pmh} />
              )}
              {record.history.medications_prior_to_visit &&
                record.history.medications_prior_to_visit.length > 0 && (
                  <ListItem
                    label="Medications"
                    items={record.history.medications_prior_to_visit}
                  />
                )}
              {record.history.allergies && record.history.allergies.length > 0 && (
                <ListItem label="Allergies" items={record.history.allergies} />
              )}
            </div>
          </Section>

          {/* Assessment */}
          <Section title="Assessment">
            <div className="space-y-3">
              {record.assessment.map((item, index) => (
                <div
                  key={index}
                  className="p-3 rounded-lg border bg-card"
                >
                  <p className="font-medium text-sm mb-1">{item.problem}</p>
                  <p className="text-xs text-muted-foreground mb-2">ICD-10: {item.icd10}</p>
                  {item.likely_etiologies && item.likely_etiologies.length > 0 && (
                    <ul className="text-sm space-y-1 mt-2">
                      {item.likely_etiologies.map((etiology, i) => (
                        <li key={i} className="text-muted-foreground text-xs">
                          • {etiology}
                        </li>
                      ))}
                    </ul>
                  )}
                  {item.control && (
                    <p className="text-xs text-muted-foreground mt-2">Control: {item.control}</p>
                  )}
                </div>
              ))}
            </div>
          </Section>

          {/* Medications */}
          {record.plan.medication_changes && record.plan.medication_changes.length > 0 && (
            <Section title="Medication Changes">
              <div className="space-y-2">
                {record.plan.medication_changes.map((change, index) => (
                  <div key={index} className="text-sm">
                    {change.start && (
                      <p className="text-green-600 dark:text-green-400">
                        <span className="font-medium">START:</span> {change.start}
                      </p>
                    )}
                    {change.stop && (
                      <p className="text-red-600 dark:text-red-400">
                        <span className="font-medium">STOP:</span> {change.stop}
                      </p>
                    )}
                    {change.continue && (
                      <p className="text-blue-600 dark:text-blue-400">
                        <span className="font-medium">CONTINUE:</span> {change.continue}
                      </p>
                    )}
                  </div>
                ))}
              </div>
            </Section>
          )}

          {/* Transcript */}
          <Section title="Transcript">
            <Button
              variant="outline"
              className="w-full"
              onClick={() => setShowTranscript(!showTranscript)}
            >
              {showTranscript ? "Hide" : "Show"} Transcript
            </Button>

            {showTranscript && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                className="mt-4 space-y-3"
              >
                {record.transcript.map((entry, index) => (
                  <div
                    key={index}
                    className={cn(
                      "p-3 rounded-lg",
                      entry.speaker === "Provider"
                        ? "bg-blue-50 dark:bg-blue-950/20"
                        : "bg-muted"
                    )}
                  >
                    <div className="flex items-center gap-2 mb-1">
                      <span className="text-xs font-medium">{entry.speaker}</span>
                      <span className="text-xs text-muted-foreground">{entry.t}</span>
                    </div>
                    <p className="text-sm">{entry.text}</p>
                  </div>
                ))}
              </motion.div>
            )}
          </Section>
        </div>
      </div>
    </div>
  );
}

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div>
      <h3 className="text-lg font-semibold mb-3">{title}</h3>
      <div className="space-y-2">{children}</div>
    </div>
  );
}

function InfoRow({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <p className="text-xs text-muted-foreground">{label}</p>
      <p className="text-sm font-medium">{value}</p>
    </div>
  );
}

function ListItem({ label, items }: { label: string; items: string[] }) {
  return (
    <div>
      <p className="text-sm font-medium mb-1">{label}</p>
      <ul className="space-y-1">
        {items.map((item, i) => (
          <li key={i} className="text-sm text-muted-foreground">
            • {item}
          </li>
        ))}
      </ul>
    </div>
  );
}

