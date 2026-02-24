import React, { useState, useEffect } from "react";
import { userOptions } from "../../constants/userOptions";
import { useTranslator } from "../../contexts/languageContext";
import "./PauseStatistics.css";
import { languageLibrary } from "../../locales/language";
import { useDnd } from "../PopupManager/PopupManager";

const event_key = "pauseStatistics/events";
const last_id_key = "pauseStatistics/lastID";

type ImpactOption = {
  value: string;
  label: string;
};

type FormData = {
  id?: number;
  efficiency: number | null;
  energy: number | null;
  factor: string | null;
  timestamp?: string;
};

type PauseStatisticsProps = {
  onSave?: (data: FormData) => void;
};

function PauseStatistics({ onSave  }: PauseStatisticsProps) {
  const { language } = useTranslator();

  const impacts: ImpactOption[] = userOptions[language].impacts;

  const [formData, setFormData] = useState<FormData>({
    efficiency: 3,
    energy: 3,
    factor: "",
  });

  const saveEvent = (data: Omit<FormData, "id" | "timestamp">) => {
    const lastIdStr = localStorage.getItem(last_id_key) ?? "0";
    const newId = Number(lastIdStr) + 1;

    const newEntry: FormData = {
      id: newId,
      ...data,
      timestamp: new Date().toISOString(),
    };

    const existingEvents: FormData[] = JSON.parse(
      localStorage.getItem(event_key) ?? "[]"
    );

    existingEvents.push(newEntry);
    localStorage.setItem(event_key, JSON.stringify(existingEvents));
    localStorage.setItem(last_id_key, String(newId));

    onSave?.(newEntry);
  };

  const saveNull = () =>
    saveEvent({ efficiency: null, energy: null, factor: null });

  const handleChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const { name, value } = event.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (
    event: React.SyntheticEvent<HTMLFormElement, SubmitEvent>
  ) => {
    event.preventDefault();
    saveEvent(formData);

    setFormData({
      efficiency: 3,
      energy: 3,
      factor: impacts[0]?.value ?? "",
    });
  };

  return (
    <div className="popup-statistics">
      <div className="content-statistics">
        <form onSubmit={handleSubmit}>
          <label>{languageLibrary[language].evaluateEfficiency}</label>

          <div className="radio-indicator">
            <span>{languageLibrary[language].low}</span>
            <span>{languageLibrary[language].high}</span>
          </div>

          <div>
            {[1, 2, 3, 4].map((num) => (
              <label key={num} style={{ marginRight: "10px" }}>
                <input
                  type="radio"
                  name="efficiency"
                  value={num}
                  checked={formData.efficiency === num}
                  onChange={() =>
                    setFormData((prev) => ({ ...prev, efficiency: num }))
                  }
                />
                {num}
              </label>
            ))}
          </div>

          <label>{languageLibrary[language].evaluateEnergy}</label>

          <div className="radio-indicator">
            <span>{languageLibrary[language].low}</span>
            <span>{languageLibrary[language].high}</span>
          </div>

          <div>
            {[1, 2, 3, 4].map((num) => (
              <label key={num} style={{ marginRight: "10px" }}>
                <input
                  type="radio"
                  name="energy"
                  value={num}
                  checked={formData.energy === num}
                  onChange={() =>
                    setFormData((prev) => ({ ...prev, energy: num }))
                  }
                />
                {num}
              </label>
            ))}
          </div>

          <label>{languageLibrary[language].evaluateFactors}</label>

          <select
            name="factor"
            value={formData.factor ?? ""}
            onChange={handleChange}
          >
            <option value="" disabled>
              {languageLibrary[language].evaluateFactorsDefault}
            </option>

            {impacts.map((f) => (
              <option key={f.value} value={f.value}>
                {f.label}
              </option>
            ))}
          </select>

          <div className="button-group">
            <button type="submit">
              {languageLibrary[language].save}
            </button>

            <button type="button" onClick={saveNull}>
              {languageLibrary[language].cancel}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default PauseStatistics;
