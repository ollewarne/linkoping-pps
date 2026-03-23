jest.mock("../../../contexts/languageContext", () => ({
  useTranslator: () => ({ language: "en" }),
}));

jest.mock("../../../locales/language", () => ({
  languageLibrary: {
    en: {
      detailsFor: "Details for",
      wdFormTitle: "Working day",
      start: "Working hours",
      wdFormWorkEnvironment: "Working environment",
      aFormActivity: "Activities",
      aFormCategory: "Category",
      time: "Scheduled time",
      aCardDuration: "Duration",
      noPlannedActivity: "No activities registered for this day!",
      cancel: "Close",
    },
  },
}));

jest.mock("../../../constants/userOptions", () => ({
  userOptions: {
    en: {
      category: ["Work"],
      workEnvironment: ["Office"],
    },
  },
}));

import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { DayDetailsPopup } from "./DayDetails.jsx";

const mockDayData = {
  workdayData: {
    workHours: { start: "09:00", end: "17:00" },
    nonWorkHours: { start: "12:00", end: "13:00" },
    workEnvironment: { location: "Office" },
  },
  activities: [
    {
      id: 1,
      title: "Meeting",
      category: "Work",
      scheduledTime: "10:00",
      totalTimeSpent: 60,
    },
  ],
};

test("renders translated content", () => {
  render(
    <DayDetailsPopup
      selectedDate="2026-03-20"
      dayData={mockDayData}
      onClose={jest.fn()}
    />
  );

  expect(screen.getByText(/Details for 2026-03-20/i)).toBeInTheDocument();
  expect(screen.getByText(/Working day/i)).toBeInTheDocument();
  expect(screen.getByText(/Category: Work/i)).toBeInTheDocument();
});

test("calls onClose when button clicked", async () => {
  const user = userEvent.setup();
  const onCloseMock = jest.fn();

  render(
    <DayDetailsPopup
      selectedDate="2026-03-20"
      dayData={mockDayData}
      onClose={onCloseMock}
    />
  );

  await user.click(screen.getByRole("button", { name: /close/i }));
  expect(onCloseMock).toHaveBeenCalledTimes(1);
});