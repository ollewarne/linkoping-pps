// src/components/HistoryCard/HistoryCard.test.tsx
import React from "react";
import { render, screen } from "@testing-library/react";
import HistoryCard from "./HistoryCard";
import { categoryColors } from "../../constants/categoryColors";

jest.mock("../../constants/categoryColors", () => ({
  categoryColors: {
    Work: "rgb(0, 255, 0)",
    NonWork: "rgba(173, 34, 204, 1)",
  },
}));

const mockActivity = {
  category: "Work",
  title: "Team Meeting",
  scheduledTimeStart: "09:00",
  scheduledTimeStop: "10:00",
  isCompleted: true,
};

test("renders HistoryCard with correct title and time", () => {
  render(<HistoryCard activity={mockActivity} />);
  expect(screen.getByText("Team Meeting")).toBeInTheDocument();
  expect(screen.getByText("09:00 - 10:00")).toBeInTheDocument();
});

test("applies correct category color", () => {
  const { container } = render(<HistoryCard activity={mockActivity} />);
  const timeContainer = container.querySelector("div div") as HTMLElement;
  expect(timeContainer).toHaveStyle({ borderColor: categoryColors });
});

test("shows correct icon for completed activity", () => {
  render(<HistoryCard activity={mockActivity} />);
  const img = screen.getByRole("img") as HTMLImageElement;
  expect(img.src).toContain("/activity-done.svg");
});