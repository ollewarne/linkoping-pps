export const languageLibrary: Record<string, Record<string, string>> = {


// -------- ENGELSKA ---------

    en: {

    // ----- ÅTERKOMMANDE -----
    start: 'Start',
    end: 'End',
    save: 'Save',
    saved: 'Saved',
    add: 'Add',
    cancel: 'Cancel',

    //aFORM (start timer), aFORM(Plan Activity)
    hours: 'Hours',
    minutes: 'Minutes',
    active: 'Active',
    break: 'Break',
    times: 'Times',

    yes: 'Yes',
    no: 'No',
    low: 'Low',
    high: 'High',

    // NAV
    pageTitle: 'Productivity',
    navLinkHome: 'Home',
    navLinkStats: 'Statistics',

    // HOME PAGE
    homeHistoryTitle: 'History',
    homeEmptyPage: 'A bit empty here...?',

    // HOME PAGE - BUTTONS
    homePageBtnStartActivity: 'Start Timer',
    homePageBtnAddActivity: 'Plan Activity',
    homePageBtnStartPlanner: 'Start Planned',
    homePageBtnStopPlanner: 'Stop Planned',


    // ACTIVITY FORM
    aFormActivityTimer: 'Activity Timer',
    aFormActivity: 'Activity',
    aFormCategory: 'Category',
    aFormCategoryDefault: 'Pick a category',
    aFormTitle: 'Title',
    aFormTitleDefault: 'Enter a title',
    aFormEstimated: 'Estimated Duration',
    aFormTimeStructure: 'Time Structure',
    aFormTimerSubmit: 'Start Timer',

    aFormActivityPlan: 'Plan Activity',
    aFormEnterScheduleTime: 'Schedule start & end time',
    aFormEnterDuration: 'Enter activity duration',
    aFormScheduleSubmit: 'Add to planner',

    aFormEnterWD: 'Please enter the specifics for your workday before registering activities',


    // WORKDAY FORM
    wdFormTitle: 'Register Workday',
    wdFormWHTitle: 'Working hours',
    wdFormNonWH: 'I have non-working hours to register',
    wdFormNonWHTitle: 'Non-working hours',
    wdFormNonWHExplain: 'Block the time that you don\'t want to plan hour',
    wdFormWorkEnvironment: 'Work environment',
    wdFormWorkEnvironmentDefault: 'Select an environment',



    // ACTIVITY CARD
    aCardDuration: 'Estimated duration',
    aCardDelete: 'Are you sure?',


    // ERRORS
    errorNoWorkHoursStart: 'Please enter your start time',
    errorNoWorkHoursEnd: 'Please enter your end time',
    errorEndBeforeStart: "End time can't be before start time",
    
    errorNoNonWorkHours: 'Please enter your non-working hours',
    errorHoursBetweenWorkingHours: 'Non-working hours must be within your working hours',
    errorNoWorkEnvironment: 'Please select your work environment',
    errorGreaterThanZero: 'One field must be greater than 0',

    // EVALUATE
    evaluateButton: 'Open Pause Statistics',
    evaluateEfficiency: 'Efficiency level',
    evaluateEnergy: 'Energy level',
    evaluateFactors: 'Influencing factors: ',
    evaluateFactorsDefault: 'Select a factor or leave blank',


    // TIMER
    timerWorking: 'Working',
    timerPause: 'Pause',
    timerTimeLeft: 'Time left',
    timerTimeRemaining: 'Total time remaining',
    timerBtnStopTimer: 'Stop timer',

    },


    // ------------------------------------------------
    // ------------------- SVENSKA --------------------
    // ------------------------------------------------


    sv: {

    // ----- ÅTERKOMMANDE -----
    start: 'Start',
    end: 'Slut',
    save: 'Spara',
    saved: 'Sparat!',
    add: 'Lägg till',
    cancel: 'Avbryt',


    //aFORM (start timer), aFORM(Plan Activity)
    hours: 'Timmar',
    minutes: 'Minuter',
    active: 'Aktiv',
    break: 'Paus',
    times: 'Tider',

    yes: 'Ja',
    no: 'Nej',
    low: 'Låg',
    high: 'Hög',

    // NAV
    pageTitle: 'Produktivitet',
    navLinkHome: 'Hem',
    navLinkStats: 'Statistik',

    // HOME PAGE
    homeHistoryTitle: 'Historik',
    homeEmptyPage: 'Det var lite tomt här...?',

    // HOME PAGE - BUTTONS
    homePageBtnStartActivity: 'Starta Timer',
    homePageBtnAddActivity: 'Planera Aktivitet',
    homePageBtnStartPlanner: 'Starta Planering',
    homePageBtnStopPlanner: 'Stoppa Planering',


    // ACTIVITY FORM
    aFormActivityTimer: 'Aktivitets Timer',
    aFormActivity: 'Aktivitet',
    aFormCategory: 'Kategori',
    aFormCategoryDefault: 'Välj en kategori',
    aFormTitle: 'Titel',
    aFormTitleDefault: 'Ange en titel',
    aFormEstimated: 'Uppskattad tidsåtgång',
    aFormTimeStructure: 'Tids Struktur',
    aFormTimerSubmit: 'Starta Timer',

    aFormActivityPlan: 'Planera Aktivitet',
    aFormEnterScheduleTime: 'Schemalägg start & slut tid',
    aFormEnterDuration: 'Ange uppskattad tidsåtgång',
    aFormScheduleSubmit: 'Lägg till i planering',

    aFormEnterWD: 'Vänligen ange detaljerna för din arbetsdag innan du registrerar aktiviteter',



    // WORKDAY FORM
    wdFormTitle: 'Registera Arbetsdag',
    wdFormWHTitle: 'Arbetstid',
    wdFormNonWH: 'Jag har arbetsfri tid att registrera',
    wdFormNonWHTitle: 'Arbetsfri Tid',
    wdFormNonWHExplain: 'Blockera den tid du inte vill planera',
    wdFormWorkEnvironment: 'Arbetsmiljö',
    wdFormWorkEnvironmentDefault: 'Välj en arbetsmiljö',



    // ACTIVITY CARD
    aCardDuration: 'Uppskattad tidsåtgång',
    aCardDelete: 'Är du säker?',


    // ERRORS
    errorNoWorkHoursStart: 'Vänligen ange din starttid',
    errorNoWorkHoursEnd: 'Vänligen ange din sluttid',
    errorEndBeforeStart: 'Sluttiden kan inte vara innan startiden',

    errorNoNonWorkHours: 'Vänligen ange dina icke-arbetstider',
    errorHoursBetweenWorkingHours: 'Icke-arbetstider måste ligga inom dina arbetstider',
    errorNoWorkEnvironment: 'Vänligen välj din arbetsmiljö',
    errorGreaterThanZero: 'Ett fält måste vara större än 0',



    // ----- UTVÄRDERING ----- 
    evaluateButton: 'Öppna pausstatistik',
    evaluateEfficiency: 'Produktivitetsnivå',
    evaluateEnergy: 'Energinivå',
    evaluateFactors: 'Påverkande faktorer: ',
    evaluateFactorsDefault: 'Välj en faktor eller lämna blank',

    // TIMER
    timerWorking: 'Arbetar',
    timerPause: 'Paus',
    timerTimeLeft: 'Tid kvar',
    timerTimeRemaining: 'Total tid kvar',
    timerBtnStopTimer: 'Stoppa timer',

    },

}
