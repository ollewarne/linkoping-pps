import { useState } from "react";
import { userOptions } from "../../constants/userOptions";
import "./PauseStatistics.css";

function PauseStatistics({ onSave, onClose }) {
  const [lang, setLang] = useState('en');
  const impacts = userOptions[lang].impacts;

  const [formData, setFormData] = useState({
    efficiency: 3,
    energy: 3,
    factor: '',
  });

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    const dateWithTimeStamp = {
      ...formData,
      timestamp: new Date().toISOString()
    };

    if (onSave) {
      onSave(dateWithTimeStamp);
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
          <label>Efficency level</label>
          <div className="radio-indicator">
            <span>Low</span>
            <span>High</span>
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

          <label>Energy level</label>
          <div className="radio-indicator">
            <span>Low</span>
            <span>High</span>
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

          <label>Influencing factors</label>
          <select
            name="factor"
            value={formData.factor}
            onChange={handleChange}
          >
            <option value="" disabled>
              select a factor or leave blank
            </option>
            {impacts.map(f => (
              <option key={f.value} value={f.value}>
                {f.label}
              </option>
            ))}
          </select>

          <div className="button-group">
            <button type="submit">Save</button>
            <button type="button" onClick={onClose}>Cancel</button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default PauseStatistics;
