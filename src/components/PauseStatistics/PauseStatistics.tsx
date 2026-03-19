import React, { useState } from "react";
import { userOptions } from "../../constants/userOptions";
import { useTranslator } from "../../contexts/languageContext";
import "./PauseStatistics.css";
import { languageLibrary } from "../../locales/language";
import { useActivities } from "../../contexts/activityContext";
import { useTimer } from "../../contexts/TimerContext";
import type { StatisticEntry } from "../../types"

type ImpactOption = {
    value: string;
    label: string;
};

function getTimestamp(): string {
    const timestamp: string = new Date().toLocaleTimeString(undefined, {
        hour: '2-digit',
        minute: '2-digit',
        hour12: false
    });
    return timestamp;
}

function PauseStatistics() {
    const { activityDispatch } = useActivities();
    const { activeActivity, setShowPopup } = useTimer();
    const { language } = useTranslator();

    const impacts: ImpactOption[] = userOptions[language].impacts;

    const [formData, setFormData] = useState<StatisticEntry>({
        productivity: 3,
        energy: 3,
        factor: "",
    });

    const saveEvent = (data: StatisticEntry) => {
        if (!activeActivity) return;

        const timestamp = getTimestamp();
        if (!timestamp) return;

        activityDispatch({
            type: "ADD_STATISTIC",
            payload: {
                id: activeActivity.id,
                timestamp: timestamp,
                stat: {
                    productivity: data.productivity,
                    energy: data.energy,
                    factor: data.factor
                }
            }
        });
        setShowPopup(false);
    };

    const saveNull = () => {
        saveEvent({
            productivity: null,
            energy: null,
            factor: null
        });
    };

    const handleChange = (event: React.ChangeEvent<HTMLSelectElement | HTMLInputElement>) => {
        const { name, value } = event.target;
        setFormData((prev) => ({
            ...prev,
            [name]: name === "factor" ? value : (value === "" ? null : Number(value)),
        }));
    };

    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        saveEvent(formData);
        setFormData({
            productivity: 3,
            energy: 3,
            factor: "",
        });
    };

    return (
        <div className="popup-statistics">
            <div className="content-statistics">
                <form onSubmit={handleSubmit}>
                    <label>{languageLibrary[language].evaluateEfficiency}</label>

                    <div className="radio-wrapper">
                        <div className="radio-indicator">
                            <span>{languageLibrary[language].low}</span>
                            <span>{languageLibrary[language].high}</span>
                        </div>
                        <div className="radio-group">
                            {[1, 2, 3, 4].map((num: number) => (
                                <label key={num}>
                                    <input
                                        type="radio"
                                        name="productivity"
                                        value={num}
                                        checked={formData.productivity === num}
                                        onChange={() =>
                                            setFormData((prev) => ({ ...prev, productivity: num }))
                                        }
                                    />
                                    {num}
                                </label>
                            ))}
                        </div>
                    </div>

                    <label>{languageLibrary[language].evaluateEnergy}</label>

                    <div className="radio-wrapper">
                        <div className="radio-indicator">
                            <span>{languageLibrary[language].low}</span>
                            <span>{languageLibrary[language].high}</span>
                        </div>
                        <div className="radio-group">
                            {[1, 2, 3, 4].map((num) => (
                                <label key={num}>
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
