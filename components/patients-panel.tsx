"use client";

import React from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { PatientRecord } from "@/types/patient";
import { cn } from "@/lib/utils";

interface PatientsPanelProps {
  records: Record<string, PatientRecord>;
  onSelectPatient: (patientId: string, record: PatientRecord) => void;
}

export function PatientsPanel({ records, onSelectPatient }: PatientsPanelProps) {
  const patientEntries = Object.entries(records);

  return (
    <div className="flex flex-col h-full">
      <div className="flex-shrink-0 px-6 py-6 border-b">
        <h2 className="text-2xl font-semibold tracking-tight">Patient Records</h2>
        <p className="text-sm text-muted-foreground mt-1">
          {patientEntries.length} {patientEntries.length === 1 ? "patient" : "patients"}
        </p>
      </div>

      <div className="flex-1 overflow-y-auto px-6 py-4">
        <div className="space-y-3">
          {patientEntries.map(([patientId, record], index) => (
            <motion.div
              key={patientId}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.05, duration: 0.3 }}
            >
              <Button
                variant="outline"
                className="w-full h-auto p-4 flex flex-col items-start gap-2 hover:bg-accent/50 transition-all"
                onClick={() => onSelectPatient(patientId, record)}
              >
                <div className="flex items-start justify-between w-full">
                  <div className="flex flex-col items-start gap-1">
                    <p className="font-semibold text-base">{record.patient.name}</p>
                    <p className="text-xs text-muted-foreground">
                      MRN: {record.patient.mrn}
                    </p>
                  </div>
                  <div className="flex flex-col items-end gap-1">
                    <span
                      className={cn(
                        "text-xs px-2 py-0.5 rounded-full",
                        record.patient.sex === "M"
                          ? "bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-300"
                          : "bg-pink-100 text-pink-700 dark:bg-pink-900/30 dark:text-pink-300"
                      )}
                    >
                      {record.patient.sex === "M" ? "Male" : "Female"}, {record.patient.age}
                    </span>
                  </div>
                </div>

                <div className="w-full text-left">
                  <p className="text-sm text-muted-foreground line-clamp-2">
                    <span className="font-medium">Chief Complaint:</span> {record.chief_complaint}
                  </p>
                </div>

                <div className="flex flex-wrap gap-2 w-full">
                  <span className="text-xs bg-muted px-2 py-1 rounded">
                    {new Date(record.timestamp).toLocaleDateString()}
                  </span>
                  <span className="text-xs bg-muted px-2 py-1 rounded">
                    {record.provider.specialty}
                  </span>
                </div>
              </Button>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}

