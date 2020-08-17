module.exports = async function(db, {proffyValue, classValue, classScheduleValues}){
    
    const insertedProffy = await db.run(`
        INSERT INTO Proffys (
            name,
            avatar,
            contato,
            bio
        ) VALUES (
            "${proffyValue.name}",
            "${proffyValue.avatar}",
            "${proffyValue.contato}",
            "${proffyValue.bio}"
        );
    `)
    const proffy_id = insertedProffy.lastID
    
    
    const insertedClass = await db.run(`
            INSERT INTO Classes (
                subject,
                cost,
                proffy_id
            ) VALUES (
                "${classValue.subject}",
                "${classValue.cost}",
                "${proffy_id}"
            );
    `)
    const class_id = insertedClass.lastID

    const insertedAllClassSchedules = classScheduleValues.map((value) => {
        return db.run(`
                INSERT INTO Class_Schedule (
                    weekday,
                    time_from,
                    time_to,
                    class_id
                ) VALUES (
                    "${value.weekday}",
                    "${value.time_from}",
                    "${value.time_to}",
                    "${class_id}"
                );
        `)
    }); 

    await Promise.all(insertedAllClassSchedules)

}