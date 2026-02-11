import { useState } from "react"
import BottomNav from "./BottomNav"

export type views = "activityView" | "scheduleView" | "statisticsView"

export default function MobileLayout({ header, activityView, scheduleView, statisticsView }: {
    header: React.ReactNode,
    activityView: React.ReactNode,
    scheduleView: React.ReactNode,
    statisticsView: React.ReactNode
}) {
    const [layoutView, setLayoutView] = useState<views>("activityView")

    function clickHandler(view: views): void {
        setLayoutView(view)
    }

    const viewMap = {
        activityView: activityView,
        scheduleView: scheduleView,
        statisticsView: statisticsView
    }

    return (
        <div>
            {header}
            {viewMap[layoutView]}
            <BottomNav handleClick={clickHandler} activeView={layoutView} />
        </div>
    )
}
