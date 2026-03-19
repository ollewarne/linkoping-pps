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


    // -------------------------------------------------------------------------------------------------
    // --------------------------------------------- GAMLA ---------------------------------------------
    // -------------------------------------------------------------------------------------------------



    
    // // ----- FORM 1 ----- 
    // form1Header: 'Register Workday',
    // // fieldset 1
    // form1WorkH: 'Working hours',
    // // fieldset 2
    // form1Checkbox: 'I have non-working hours to register',
    // nonWorkH: 'Non-working hours',
    // nonWorkHExplanation: "Block the time that you don't want to plan",
    // // fieldset 3
    // workEnvironment: 'Work Environment',
    // workEnvironmentDefault: 'Select an environment',
    // // submit
    // submitSuccess: 'Workday settings saved',

    // //  ----- FORM 1 - ERRORS ----- 


    // // ----- FORM 2 ----- 
    // form2Header: 'Register Activity',
    // // fieldset 1
    // form2Activity: 'Activity',
    // form2Category: 'Category',
    // form2CategoryDefault: 'Pick a category',
    // form2Title: 'Title',
    // form2TitleDefault: 'Enter a title',
    // // fieldset 2
    // form2Rank: 'Rank of importance',
    // form2RankLow: '1: Low',
    // form2RankHigh: '4: High',
    // // fieldset 3
    // form2EstimatedDuration: 'Estimated Duration',
    // // fieldset 4
    // form2TimeStructure: 'Time Structure',
    // // submit
    // form2Submit: 'Add Activity',

    // //  ----- FORM 2 - ERRORS ----- 




    },

    // -------------------------------------------------------------------------------------------------
    // -------------------------------------------------------------------------------------------------
    // -------- SVENSKA ---------
    // -------------------------------------------------------------------------------------------------
    // -------------------------------------------------------------------------------------------------

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





    // -------------------------------------------------------------------------------------------------
    // --------------------------------------------- GAMLA ---------------------------------------------
    // -------------------------------------------------------------------------------------------------
    //     // ----- FORM 1 ----- 
    // form1Header: 'Registera Arbetsdag',
    // // fieldset 1
    // form1WorkH: 'Arbetstid',
    // // fieldset 2
    // form1Checkbox: 'Jag har arbetsfri tid att registrera',
    // nonWorkH: 'Arbetsfri Tid',
    // nonWorkHExplanation: 'Blockera den tid du inte vill planera',
    // // fieldset 3
    // workEnvironment: 'Arbetsmiljö',
    // workEnvironmentDefault: 'Välj en arbetsmiljö',
    // // submit
    // submitSuccess: 'Inställningar för arbetsdag sparade',

    // //  ----- FORM 1 - ERRORS ----- 

    // // ----- FORM 2 ----- 
    // form2Header: 'Registera Aktivitet',
    // // fieldset 1
    // form2Activity: 'Aktivitet',
    // form2Category: 'Kategori',
    // form2CategoryDefault: 'Välj en kategori',
    // form2Title: 'Titel',
    // form2TitleDefault: 'Fyll i en titel',
    // // fieldset 2
    // form2Rank: 'Rankning',
    // form2RankLow: '1: Låg prio',
    // form2RankHigh: '4: Hög prio',
    // // fieldset 3
    // form2EstimatedDuration: 'Uppskattad tidsåtgång',
    // // fieldset 4
    // form2TimeStructure: 'Tidsstruktur',
    // // submit
    // form2Submit: 'Lägg till aktivitet',

    // //  ----- FORM 2 - ERRORS ----- 





    },

}
