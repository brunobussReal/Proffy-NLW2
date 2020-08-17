const { subjects, weekdays, getSubject, convertHoursToMinutes } = require('./utils/format')

const database = require('./database/db')

function pageLanding(req, res){
    return res.render("index.html")
}

async function pageStudy(req, res){
    const filters = req.query

    if (!filters.subject || !filters.weekday || !filters.time){
        return res.render("study.html", { filters , subjects , weekdays })
    }

    const timeToMinutes = convertHoursToMinutes(filters.time)

    const query =  `    
        SELECT Classes.*, Proffys.*
        FROM Proffys
        JOIN Classes ON (Classes.proffy_id = Proffys.id)
        WHERE EXISTS (
            SELECT Class_schedule.*
            FROM Class_schedule
            WHERE Class_schedule.class_id = Classes.id
            AND Class_schedule.weekday = ${filters.weekday}
            AND Class_schedule.time_from <= ${filters.timeToMinutes}
            AND Class_schedule.time_to > ${filters.timeToMinutes}
        )
        AND Classes.subject = '${filters.subjects}'
    `;
    try {
        const db = await database
        const proffys = await db.all(query)

        proffys.map((proffy) => {
            proffy.subject = getSubject(proffy.subject);
        });

        return res.render("study.html", { proffys, filters , subjects, weekdays })
    
    } catch (error) {
        console.log(error)
    }
}

function pageGiveClasses(req, res){
    return res.render("give-classes.html", {subjects , weekdays})
}

async function saveClasses(req, res){
    const createProffy = require('./database/createProffys')

    const proffyValue = {
        name: req.body.name,
        avatar: req.body.avatar,
        contato: req.body.contato,
        bio: req.body.bio
    }

    const classValue = {
        subject: req.body.subject,
        cost: req.body.cost
    }

    const classScheduleValues = req.body.weekday.map((weekday, index) => {
            return {
                weekday,
                time_from: convertHoursToMinutes(req.body.time_from[index]),
                time_to: convertHoursToMinutes(req.body.time_to[index]) 
            }
        });

    try {
        const db = await database
        await createProffy(db, { proffyValue, classValue, classScheduleValues})

        let queryString = "?subject=" + req.body.subject;
        queryString+= "&weekday=" + req.body.weekday[0];
        queryString += "&time=" + req.body.time_from[0]; 
        return res.redirect("/study" + queryString);
    } catch (error) {
        console.log(error)
    }
    
}

module.exports = {
    pageGiveClasses,
    pageLanding,
    pageStudy,
    saveClasses
}