export const mockData = {
    "26-03-03": {
        workdayData: {
            workHours: { start: "08:00", end: "16:00" },
            nonWorkHours: { start: "12:00", end: "13:00" },
            workEnvironment: { location: "Home" }
        },
        activities: [
            {
                scheduledTime: "08:00",
                id: 1,
                category: "Planning",
                isMeeting: false,
                title: "Sprint Planning Review",
                ranking: 3,
                estimatedDuration: 90,
                activeTime: 25,
                breakTime: 5,
                currentlyActive: false,
                totalTimeSpent: 92,
                statistics: {
                    "08:32": { energy: 4, productivity: 3, factor: "focused" },
                    "09:03": { energy: 3, productivity: 4, factor: null },
                    "09:39": { energy: 4, productivity: 4, factor: null }
                }
            },
            {
                scheduledTime: "09:30",
                id: 2,
                category: "Technical",
                isMeeting: false,
                title: "API Integration Development",
                ranking: 2,
                estimatedDuration: 120,
                activeTime: 25,
                breakTime: 5,
                currentlyActive: false,
                totalTimeSpent: 118,
                statistics: {
                    "10:02": { energy: 4, productivity: 4, factor: null },
                    "10:30": { energy: 4, productivity: 4, factor: "energized" },
                    "11:37": { energy: 4, productivity: 4, factor: null },
                    "11:59": { energy: 3, productivity: 3, factor: "notifications" }
                }
            },
            {
                scheduledTime: "11:30",
                id: 3,
                category: "Communication",
                isMeeting: false,
                title: "Email Responses",
                ranking: 1,
                estimatedDuration: 30,
                activeTime: 25,
                breakTime: 5,
                currentlyActive: false,
                totalTimeSpent: 30,
                statistics: {
                    "12:00": { energy: 2, productivity: 2, factor: "hungry" }
                }
            },
            {
                scheduledTime: "13:00",
                id: 4,
                category: "Creative",
                isMeeting: false,
                title: "UI Design Mockups",
                ranking: 4,
                estimatedDuration: 120,
                activeTime: 25,
                breakTime: 5,
                currentlyActive: false,
                totalTimeSpent: 125,
                statistics: {
                    "13:37": { energy: 4, productivity: 4, factor: "focused" },
                    "14:04": { energy: 4, productivity: 4, factor: null },
                    "14:34": { energy: 4, productivity: 4, factor: null },
                    "15:00": { energy: 4, productivity: 4, factor: "energized" }
                }
            },
            {
                scheduledTime: "15:00",
                id: 5,
                category: "Administrative",
                isMeeting: false,
                title: "Timesheet and Expense Reports",
                ranking: 2,
                estimatedDuration: 60,
                activeTime: 25,
                breakTime: 5,
                currentlyActive: false,
                totalTimeSpent: 55,
                statistics: {
                    "15:49": { energy: 3, productivity: 2, factor: "tired" },
                    "16:00": { energy: 2, productivity: 3, factor: null }
                }
            }
        ]
    },

    "26-03-04": {
        workdayData: {
            workHours: { start: "08:00", end: "16:00" },
            nonWorkHours: { start: "12:00", end: "13:00" },
            workEnvironment: { location: "Shared office" }
        },
        activities: [
            {
                scheduledTime: "08:00",
                id: 1,
                category: "Meeting",
                isMeeting: true,
                title: "Team Standup",
                ranking: 5,
                meetingTimes: { start: "08:00", end: "09:00" },
                estimatedDuration: 60,
                currentlyActive: false,
                totalTimeSpent: 60,
                statistics: {
                    "08:30": { energy: 4, productivity: 4, factor: null },
                    "09:00": { energy: 4, productivity: 3, factor: null }
                }
            },
            {
                scheduledTime: "09:00",
                id: 2,
                category: "Analytical",
                isMeeting: false,
                title: "Data Analysis Report",
                ranking: 3,
                estimatedDuration: 120,
                activeTime: 25,
                breakTime: 5,
                currentlyActive: false,
                totalTimeSpent: 123,
                statistics: {
                    "09:30": { energy: 4, productivity: 4, factor: "focused" },
                    "10:00": { energy: 4, productivity: 4, factor: null },
                    "10:30": { energy: 3, productivity: 4, factor: "others" },
                    "11:00": { energy: 4, productivity: 3, factor: null }
                }
            },
            {
                scheduledTime: "11:00",
                id: 3,
                category: "Learning",
                isMeeting: false,
                title: "React Documentation Study",
                ranking: 4,
                estimatedDuration: 60,
                activeTime: 25,
                breakTime: 5,
                currentlyActive: false,
                totalTimeSpent: 58,
                statistics: {
                    "11:30": { energy: 4, productivity: 4, factor: "energized" },
                    "12:00": { energy: 4, productivity: 4, factor: null }
                }
            },
            {
                scheduledTime: "13:00",
                id: 4,
                category: "Technical",
                isMeeting: false,
                title: "Bug Fixes and Testing",
                ranking: 2,
                estimatedDuration: 90,
                activeTime: 25,
                breakTime: 5,
                currentlyActive: false,
                totalTimeSpent: 87,
                statistics: {
                    "13:30": { energy: 3, productivity: 3, factor: "unfocused" },
                    "14:00": { energy: 4, productivity: 4, factor: null },
                    "14:30": { energy: 4, productivity: 3, factor: null }
                }
            },
            {
                scheduledTime: "14:30",
                id: 5,
                category: "Sales & Marketing",
                isMeeting: false,
                title: "Campaign Performance Review",
                ranking: 3,
                estimatedDuration: 90,
                activeTime: 25,
                breakTime: 5,
                currentlyActive: false,
                totalTimeSpent: 92,
                statistics: {
                    "15:00": { energy: 4, productivity: 4, factor: null },
                    "15:30": { energy: 3, productivity: 3, factor: "tired" },
                    "16:00": { energy: 3, productivity: 4, factor: null }
                }
            }
        ]
    },

    "26-03-05": {
        workdayData: {
            workHours: { start: "08:00", end: "16:00" },
            nonWorkHours: { start: "12:00", end: "13:00" },
            workEnvironment: { location: "Open-plan office" }
        },
        activities: [
            {
                scheduledTime: "08:00",
                id: 1,
                category: "Support",
                isMeeting: false,
                title: "Customer Ticket Resolution",
                ranking: 3,
                estimatedDuration: 120,
                activeTime: 25,
                breakTime: 5,
                currentlyActive: false,
                totalTimeSpent: 115,
                statistics: {
                    "08:30": { energy: 3, productivity: 4, factor: null },
                    "09:00": { energy: 4, productivity: 3, factor: "noise" },
                    "09:30": { energy: 3, productivity: 3, factor: "others" },
                    "10:00": { energy: 4, productivity: 4, factor: null }
                }
            },
            {
                scheduledTime: "10:00",
                id: 2,
                category: "Administrative",
                isMeeting: false,
                title: "Document Organization",
                ranking: 1,
                estimatedDuration: 60,
                activeTime: 25,
                breakTime: 5,
                currentlyActive: false,
                totalTimeSpent: 63,
                statistics: {
                    "10:30": { energy: 2, productivity: 2, factor: "procrastination" },
                    "11:00": { energy: 3, productivity: 3, factor: null }
                }
            },
            {
                scheduledTime: "11:00",
                id: 3,
                category: "Technical",
                isMeeting: false,
                title: "Database Optimization",
                ranking: 4,
                estimatedDuration: 60,
                activeTime: 25,
                breakTime: 5,
                currentlyActive: false,
                totalTimeSpent: 62,
                statistics: {
                    "11:30": { energy: 4, productivity: 4, factor: "focused" },
                    "12:00": { energy: 4, productivity: 4, factor: null }
                }
            },
            {
                scheduledTime: "13:00",
                id: 4,
                category: "Creative",
                isMeeting: false,
                title: "Marketing Content Writing",
                ranking: 3,
                estimatedDuration: 90,
                activeTime: 25,
                breakTime: 5,
                currentlyActive: false,
                totalTimeSpent: 88,
                statistics: {
                    "13:30": { energy: 4, productivity: 4, factor: "energized" },
                    "14:00": { energy: 4, productivity: 4, factor: null },
                    "14:30": { energy: 4, productivity: 4, factor: null }
                }
            },
            {
                scheduledTime: "14:30",
                id: 5,
                category: "Planning",
                isMeeting: false,
                title: "Project Roadmap Update",
                ranking: 2,
                estimatedDuration: 90,
                activeTime: 25,
                breakTime: 5,
                currentlyActive: false,
                totalTimeSpent: 92,
                statistics: {
                    "15:00": { energy: 3, productivity: 3, factor: "restless" },
                    "15:30": { energy: 4, productivity: 3, factor: null },
                    "16:00": { energy: 3, productivity: 4, factor: "tired" }
                }
            }
        ]
    },

    "26-03-06": {
        workdayData: {
            workHours: { start: "08:00", end: "16:00" },
            nonWorkHours: { start: "12:00", end: "13:00" },
            workEnvironment: { location: "Private office" }
        },
        activities: [
            {
                scheduledTime: "08:00",
                id: 1,
                category: "Technical",
                isMeeting: false,
                title: "Code Refactoring",
                ranking: 4,
                estimatedDuration: 180,
                activeTime: 25,
                breakTime: 5,
                currentlyActive: false,
                totalTimeSpent: 175,
                statistics: {
                    "08:30": { energy: 4, productivity: 4, factor: "focused" },
                    "09:00": { energy: 4, productivity: 4, factor: null },
                    "09:30": { energy: 4, productivity: 4, factor: "energized" },
                    "10:00": { energy: 4, productivity: 4, factor: null },
                    "10:30": { energy: 4, productivity: 4, factor: null },
                    "11:00": { energy: 4, productivity: 4, factor: null }
                }
            },
            {
                scheduledTime: "11:00",
                id: 2,
                category: "Communication",
                isMeeting: false,
                title: "Stakeholder Update Email",
                ranking: 2,
                estimatedDuration: 60,
                activeTime: 25,
                breakTime: 5,
                currentlyActive: false,
                totalTimeSpent: 58,
                statistics: {
                    "11:30": { energy: 3, productivity: 3, factor: null },
                    "12:00": { energy: 2, productivity: 3, factor: "hungry" }
                }
            },
            {
                scheduledTime: "13:00",
                id: 3,
                category: "Analytical",
                isMeeting: false,
                title: "User Behavior Analysis",
                ranking: 3,
                estimatedDuration: 90,
                activeTime: 25,
                breakTime: 5,
                currentlyActive: false,
                totalTimeSpent: 95,
                statistics: {
                    "13:30": { energy: 4, productivity: 4, factor: null },
                    "14:00": { energy: 4, productivity: 4, factor: "focused" },
                    "14:30": { energy: 4, productivity: 4, factor: null }
                }
            },
            {
                scheduledTime: "14:30",
                id: 4,
                category: "Learning",
                isMeeting: false,
                title: "TypeScript Advanced Patterns",
                ranking: 4,
                estimatedDuration: 90,
                activeTime: 25,
                breakTime: 5,
                currentlyActive: false,
                totalTimeSpent: 92,
                statistics: {
                    "15:00": { energy: 4, productivity: 4, factor: "energized" },
                    "15:30": { energy: 4, productivity: 4, factor: null },
                    "16:00": { energy: 4, productivity: 4, factor: null }
                }
            }
        ]
    },

    "26-03-07": {
        workdayData: {
            workHours: { start: "08:00", end: "16:00" },
            nonWorkHours: { start: "12:00", end: "13:00" },
            workEnvironment: { location: "Hybrid work" }
        },
        activities: [
            {
                scheduledTime: "08:00",
                id: 1,
                category: "Operations",
                isMeeting: false,
                title: "Server Maintenance",
                ranking: 2,
                estimatedDuration: 90,
                activeTime: 25,
                breakTime: 5,
                currentlyActive: false,
                totalTimeSpent: 93,
                statistics: {
                    "08:30": { energy: 3, productivity: 3, factor: null },
                    "09:00": { energy: 4, productivity: 3, factor: "internet" },
                    "09:30": { energy: 3, productivity: 4, factor: null }
                }
            },
            {
                scheduledTime: "09:30",
                id: 2,
                category: "Sales & Marketing",
                isMeeting: false,
                title: "Lead Generation Strategy",
                ranking: 3,
                estimatedDuration: 60,
                activeTime: 25,
                breakTime: 5,
                currentlyActive: false,
                totalTimeSpent: 57,
                statistics: {
                    "10:00": { energy: 4, productivity: 4, factor: null },
                    "10:30": { energy: 4, productivity: 3, factor: null }
                }
            },
            {
                scheduledTime: "10:30",
                id: 3,
                category: "Creative",
                isMeeting: false,
                title: "Video Script Writing",
                ranking: 4,
                estimatedDuration: 90,
                activeTime: 25,
                breakTime: 5,
                currentlyActive: false,
                totalTimeSpent: 90,
                statistics: {
                    "11:00": { energy: 4, productivity: 4, factor: "focused" },
                    "11:30": { energy: 4, productivity: 4, factor: null },
                    "12:00": { energy: 4, productivity: 4, factor: null }
                }
            },
            {
                scheduledTime: "13:00",
                id: 4,
                category: "Technical",
                isMeeting: false,
                title: "Feature Implementation",
                ranking: 3,
                estimatedDuration: 120,
                activeTime: 25,
                breakTime: 5,
                currentlyActive: false,
                totalTimeSpent: 118,
                statistics: {
                    "13:30": { energy: 4, productivity: 4, factor: null },
                    "14:00": { energy: 4, productivity: 4, factor: "energized" },
                    "14:30": { energy: 4, productivity: 4, factor: null },
                    "15:00": { energy: 4, productivity: 4, factor: null }
                }
            },
            {
                scheduledTime: "15:00",
                id: 5,
                category: "Administrative",
                isMeeting: false,
                title: "Meeting Notes Compilation",
                ranking: 1,
                estimatedDuration: 60,
                activeTime: 25,
                breakTime: 5,
                currentlyActive: false,
                totalTimeSpent: 62,
                statistics: {
                    "15:30": { energy: 2, productivity: 3, factor: "tired" },
                    "16:00": { energy: 3, productivity: 2, factor: null }
                }
            }
        ]
    },

    "26-03-08": {
        workdayData: {
            workHours: { start: "08:00", end: "16:00" },
            nonWorkHours: { start: "12:00", end: "13:00" },
            workEnvironment: { location: "Public place" }
        },
        activities: [
            {
                scheduledTime: "08:00",
                id: 1,
                category: "Planning",
                isMeeting: false,
                title: "Weekly Goals Setting",
                ranking: 3,
                estimatedDuration: 60,
                activeTime: 25,
                breakTime: 5,
                currentlyActive: false,
                totalTimeSpent: 62,
                statistics: {
                    "08:30": { energy: 4, productivity: 4, factor: null },
                    "09:00": { energy: 3, productivity: 4, factor: "noise" }
                }
            },
            {
                scheduledTime: "09:00",
                id: 2,
                category: "Technical",
                isMeeting: false,
                title: "Security Audit Review",
                ranking: 4,
                estimatedDuration: 120,
                activeTime: 25,
                breakTime: 5,
                currentlyActive: false,
                totalTimeSpent: 125,
                statistics: {
                    "09:30": { energy: 3, productivity: 4, factor: "others" },
                    "10:00": { energy: 4, productivity: 3, factor: null },
                    "10:30": { energy: 4, productivity: 4, factor: null },
                    "11:00": { energy: 4, productivity: 4, factor: "focused" }
                }
            },
            {
                scheduledTime: "11:00",
                id: 3,
                category: "Communication",
                isMeeting: false,
                title: "Client Proposal Draft",
                ranking: 2,
                estimatedDuration: 60,
                activeTime: 25,
                breakTime: 5,
                currentlyActive: false,
                totalTimeSpent: 53,
                statistics: {
                    "11:30": { energy: 3, productivity: 3, factor: "notifications" },
                    "12:00": { energy: 2, productivity: 3, factor: null }
                }
            },
            {
                scheduledTime: "13:00",
                id: 4,
                category: "Analytical",
                isMeeting: false,
                title: "Performance Metrics Dashboard",
                ranking: 3,
                estimatedDuration: 90,
                activeTime: 25,
                breakTime: 5,
                currentlyActive: false,
                totalTimeSpent: 90,
                statistics: {
                    "13:30": { energy: 4, productivity: 4, factor: null },
                    "14:00": { energy: 4, productivity: 4, factor: "energized" },
                    "14:30": { energy: 4, productivity: 4, factor: null }
                }
            },
            {
                scheduledTime: "14:30",
                id: 5,
                category: "Support",
                isMeeting: false,
                title: "Technical Support Queue",
                ranking: 2,
                estimatedDuration: 90,
                activeTime: 25,
                breakTime: 5,
                currentlyActive: false,
                totalTimeSpent: 90,
                statistics: {
                    "15:00": { energy: 3, productivity: 3, factor: "stressed" },
                    "15:30": { energy: 3, productivity: 4, factor: null },
                    "16:00": { energy: 4, productivity: 3, factor: "tired" }
                }
            }
        ]
    },

    "26-03-09": {
        workdayData: {
            workHours: { start: "08:00", end: "16:00" },
            nonWorkHours: { start: "12:00", end: "13:00" },
            workEnvironment: { location: "Home" }
        },
        activities: [
            {
                scheduledTime: "08:00",
                id: 1,
                category: "Other",
                isMeeting: false,
                title: "Workspace Setup and Organization",
                ranking: 1,
                estimatedDuration: 30,
                activeTime: 25,
                breakTime: 5,
                currentlyActive: false,
                totalTimeSpent: 28,
                statistics: {
                    "08:30": { energy: 3, productivity: 2, factor: null }
                }
            },
            {
                scheduledTime: "08:30",
                id: 2,
                category: "Technical",
                isMeeting: false,
                title: "Deployment Pipeline Configuration",
                ranking: 3,
                estimatedDuration: 150,
                activeTime: 25,
                breakTime: 5,
                currentlyActive: false,
                totalTimeSpent: 152,
                statistics: {
                    "09:00": { energy: 4, productivity: 4, factor: "focused" },
                    "09:30": { energy: 4, productivity: 4, factor: null },
                    "10:00": { energy: 4, productivity: 4, factor: null },
                    "10:30": { energy: 4, productivity: 4, factor: "energized" },
                    "11:00": { energy: 4, productivity: 4, factor: null }
                }
            },
            {
                scheduledTime: "11:00",
                id: 3,
                category: "Learning",
                isMeeting: false,
                title: "Cloud Architecture Course",
                ranking: 4,
                estimatedDuration: 60,
                activeTime: 25,
                breakTime: 5,
                currentlyActive: false,
                totalTimeSpent: 60,
                statistics: {
                    "11:30": { energy: 4, productivity: 4, factor: null },
                    "12:00": { energy: 4, productivity: 4, factor: null }
                }
            },
            {
                scheduledTime: "13:00",
                id: 4,
                category: "Creative",
                isMeeting: false,
                title: "Presentation Design",
                ranking: 3,
                estimatedDuration: 120,
                activeTime: 25,
                breakTime: 5,
                currentlyActive: false,
                totalTimeSpent: 118,
                statistics: {
                    "13:30": { energy: 4, productivity: 4, factor: null },
                    "14:00": { energy: 4, productivity: 4, factor: "focused" },
                    "14:30": { energy: 4, productivity: 4, factor: null },
                    "15:00": { energy: 4, productivity: 4, factor: null }
                }
            },
            {
                scheduledTime: "15:00",
                id: 5,
                category: "Planning",
                isMeeting: false,
                title: "Next Sprint Preparation",
                ranking: 2,
                estimatedDuration: 60,
                activeTime: 25,
                breakTime: 5,
                currentlyActive: false,
                totalTimeSpent: 62,
                statistics: {
                    "15:30": { energy: 3, productivity: 3, factor: "tired" },
                    "16:00": { energy: 3, productivity: 4, factor: null }
                }
            }
        ]
    }
};
