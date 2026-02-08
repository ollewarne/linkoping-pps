import { useState } from "react";
import { userOptions } from "../../constants/userOptions";
import { useTranslator } from "../../contexts/languageContext";
import "./PauseStatistics.css";
import { languageLibrary } from "../../locales/language";

const event_key ="pauseStatistics/events";
const last_id_key = "pauseStatistics/lastID";

function PauseStatistics({ onSave, onClose, isDndEnabled }) {
  const { language } = useTranslator()
  const impacts = userOptions[language].impacts;

  const [formData, setFormData] = useState({
    efficiency: 3,
    energy: 3,
    factor: '',
  });

  const saveNull = () => {
    const lastId = Number(localStorage.getItem(last_id_key)) || 0;
    const newId = lastId +1;

    const newEntry = {
      id: newId,
      efficiency: null,
      energy: null,
      factor: null,
      timestamp: new Date().toISOString(),
    };

    const existingEvents = JSON.parse(localStorage.getItem(event_key)) || [];
    existingEvents.push(newEntry);
    localStorage.setItem(event_key, JSON.stringify(existingEvents));
    localStorage.setItem(last_id_key, newId);

    if (onSave) onSave(newEntry);
    if (onClose) onClose();
  }

  if (isDndEnabled) {
    saveNull();
    return null;
  }

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    const lastId = Number(localStorage.getItem(last_id_key)) || 0;
    const newId = lastId + 1;

    const newEntry = {
      id: newId,
      ...formData,
      timestamp: new Date().toISOString(),
    };

    const existingEvents =
      JSON.parse(localStorage.getItem(event_key)) || [];

    existingEvents.push(newEntry);

    localStorage.setItem(event_key, JSON.stringify(existingEvents));
    localStorage.setItem(last_id_key,newId);

    if (onSave) {
      onSave(newEntry);
    }
    setFormData({
      efficiency: 3,
      energy: 3,
      factor: impacts[0].value,
    });
    if (onClose) onClose();
  };

  return (
    <div className="popup-statistics">
      <div className="content-statistics">
        <form onSubmit={handleSubmit}>
          <label>{languageLibrary[language].evaluateEfficency}</label>
          <div className="radio-indicator">
            <span>{languageLibrary[language].low}</span>
            <span>{languageLibrary[language].high}</span>
          </div>
          <div>
            {[1, 2, 3, 4, 5].map(num => (
              <label key={num} style={{ marginRight: "10px" }}>
                <input
                  type="radio"
                  name="efficiency"
                  value={num}
                  checked={formData.efficiency === num}
                  onChange={() =>
                    setFormData(prev => ({ ...prev, efficiency: num }))
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
            {[1, 2, 3, 4, 5].map(num => (
              <label key={num} style={{ marginRight: "10px" }}>
                <input
                  type="radio"
                  name="energy"
                  value={num}
                  checked={formData.energy === num}
                  onChange={() =>
                    setFormData(prev => ({ ...prev, energy: num }))
                  }
                />
                {num}
              </label>
            ))}
          </div>

          <label>{languageLibrary[language].evaluateFactors}</label>
          <select
            name="factor"
            value={formData.factor}
            onChange={handleChange}
          >
            <option value="" disabled>
              {languageLibrary[language].evaluateFactorsDefault}
            </option>
            {impacts.map(f => (
              <option key={f.value} value={f.value}>
                {f.label}
              </option>
            ))}
          </select>

          <div className="button-group">
            <button type="submit">{languageLibrary[language].save}</button>
            <button type="button" onClick={saveNull}>{languageLibrary[language].cancel}</button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default PauseStatistics;
