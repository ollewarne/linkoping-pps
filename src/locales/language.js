export const languageLibrary = {


// -------- ENGELSKA ---------

    en: {
    // ----- ÅTERKOMMANDE -----
    start: 'Start',
    end: 'End',
    save: 'Save',
    add: 'Add',
    hours: 'Hours',
    minutes: 'Minutes',
    active: 'Active',
    break: 'Break',
    times: 'Times',
    low: 'Low',
    high: 'High',
    cancel: 'Cancel',

    // ----- FORM 1 ----- 
    form1Header: 'Register Workday',
    // fieldset 1
    form1WorkH: 'Working hours',
    form1WorkHExplanation: 'Explanation???',
    // fieldset 2
    form1Checkbox: 'I have non-working hours to register',
    nonWorkH: 'Non-working hours',
    nonWorkHExplanation: 'Explanation???',
    // fieldset 3
    workEnvironment: 'Work Environment',
    workEnvironmentDefault: 'Select an environment',
    // submit
    submitSuccess: 'Workday settings saved',

    //  ----- FORM 1 - ERRORS ----- 
    errorNoWorkHoursStart: 'Please enter your start time',
    errorNoWorkHoursEnd: 'Please enter your end time',
    errorEndBeforeStart: "End time can't be before start time",
    
    errorNoNonWorkHours: 'Please enter your non-working hours',
    errorHoursBetweenWorkingHours: 'Non-working hours must be within your working hours',
    errorNoWorkEnvironment: 'Please select your work environment',

    // ----- FORM 2 ----- 
    form2Header: 'Register Activity',
    // fieldset 1
    form2Activity: 'Activity',
    form2Category: 'Category',
    form2CategoryDefault: 'Pick a category',
    form2Title: 'Title',
    form2TitleDefault: 'Enter a title',
    // fieldset 2
    form2Rank: 'Rank of importance',
    form2RankLow: '1: Low',
    form2RankHigh: '4: High',
    // fieldset 3
    form2EstimatedDuration: 'Estimated Duration',
    // fieldset 4
    form2TimeStructure: 'Time Structure',
    // submit
    form2Submit: 'Add Activity',

    //  ----- FORM 2 - ERRORS ----- 
    errorGreaterThanZero: 'One field must be greater than 0',


    // ----- UTVÄRDERING ----- 
    evaluateButton: 'Open Pause Statistics',
    evaluateEfficency: 'Efficency level',
    evaluateEnergy: 'Energy level',
    evaluateFactors: 'Influencing factors: ',
    evaluateFactorsDefault: 'Select a factor or leave blank'

},



// -------- SVENSKA ---------

sv: {
    // ----- ÅTERKOMMANDE -----
    start: 'Start',
    end: 'Slut',
    save: 'Spara',
    add: 'Lägg till',
    hours: 'Timmar',
    minutes: 'Minuter',
    active: 'Aktiv',
    break: 'Paus',
    times: 'Tider',
    low: 'Låg',
    high: 'Hög',
    cancel: 'Avbryt',

    // ----- FORM 1 ----- 
    form1Header: 'Registera Arbetsdag',
    // fieldset 1
    form1WorkH: 'Arbetstid',
    form1WorkHExplanation: 'Förklaring???',
    // fieldset 2
    form1Checkbox: 'Jag har arbetsfri tid att registrera',
    nonWorkH: 'Arbetsfri Tid',
    nonWorkHExplanation: 'Förklaring???',
    // fieldset 3
    workEnvironment: 'Arbetsmiljö',
    workEnvironmentDefault: 'Välj en arbetsmiljö',
    // submit
    submitSuccess: 'Inställningar för arbetsdag sparade',

    //  ----- FORM 1 - ERRORS ----- 
    errorNoWorkHoursStart: 'Vänligen ange din starttid',
    errorNoWorkHoursEnd: 'Vänligen ange din sluttid',
    errorEndBeforeStart: 'Sluttiden kan inte vara innan startiden',

    errorNoNonWorkHours: 'Vänligen ange dina icke-arbetstider',
    errorHoursBetweenWorkingHours: 'Icke-arbetstider måste ligga inom dina arbetstider',
    errorNoWorkEnvironment: 'Vänligen välj din arbetsmiljö',

    // ----- FORM 2 ----- 
    form2Header: 'Registera Aktivitet',
    // fieldset 1
    form2Activity: 'Aktivitet',
    form2Category: 'Kategori',
    form2CategoryDefault: 'Välj en kategori',
    form2Title: 'Titel',
    form2TitleDefault: 'Fyll i en titel',
    // fieldset 2
    form2Rank: 'Rankning',
    form2RankLow: '1: Låg prio',
    form2RankHigh: '4: Hög prio',
    // fieldset 3
    form2EstimatedDuration: 'Uppskattad tidsåtgång',
    // fieldset 4
    form2TimeStructure: 'Tidsstruktur',
    // submit
    form2Submit: 'Lägg till aktivitet',

    //  ----- FORM 2 - ERRORS ----- 
    errorGreaterThanZero: 'Ett fält måste vara större än 0',


    // ----- UTVÄRDERING ----- 
    evaluateButton: 'Öppna pausstatistik',
    evaluateEfficency: 'Produktivitetsnivå',
    evaluateEnergy: 'Energinivå',
    evaluateFactors: 'Påverkande faktorer: ',
    evaluateFactorsDefault: 'Välj en faktor eller lämna blank'



}

}

