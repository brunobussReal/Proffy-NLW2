const db = require('./db');
const createProffy = require('./createProffys');

db.then(async (database) => {
    // Data
    proffyValue = {
        name: 'Kauan Schaeffer',
        avatar: 'https://avatars0.githubusercontent.com/u/37464395?s=460&u=463274b9ecfdf58b59713229addaf5545c0c034c&v=4',
        whatsapp: '4199999999',
        bio: 'Amante da busca constante pelo saber.<br><br>Apaixonado pela filosofia e suas reflexões, sempre buscando escrever e refletir acerca de questões epistemológicas, metafísicas, antropológicas e axiológicas.'
    }

    classValue = {
        subject: 4,
        cost: '1',
    }

    classScheduleValues = [
        {
            weekday: 1,
            time_from: 720,
            time_to: 940
        },
        {
            weekday: 3,
            time_from: 520,
            time_to: 1220
        }
    ]

    // Insert
    await createProffy(database, { proffyValue, classValue, classScheduleValues });

    // Select All
    const proffysSelect = await database.all("SELECT * FROM proffys");
    //console.log(proffysSelect);

    // Select proffy with class
    const proffyAndClassesSelect = await database.all(`
        SELECT Classes.*, Proffys.* 
        FROM proffys
        JOIN classes ON (Classes.proffy_id = Proffys.id)
        WHERE Classes.proffy_id = 1; 
    `);
    //console.log(proffyAndClassesSelect);

    const classesScheduleSelect = await database.all(`
        SELECT *
        FROM Class_schedule
        WHERE Class_schedule.class_id = 1
        AND Class_schedule.weekday = "3"
        AND Class_schedule.time_from <= "620"
        AND Class_schedule.time_to > "620";
    `);
    console.log(classesScheduleSelect);

});