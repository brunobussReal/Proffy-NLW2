const subjects = [
    "Artes",
    "Biologia",
    "Matematica",
    "Ingles",
    "Quimica",
    "Artes",
    "Artes",
    "Artes",
    "Artes",
    "Artes"
]

const weekdays = [
    "Domingo",
    "Segunda",
    "Terça",
    "Quarta",
    "Quinta",
    "Sexta",
    "Sabado",
]

function getSubject(subjectNumber){
    const arrayPosition = +subjectNumber -1
    return subjects[arrayPosition]
}

function convertHoursToMinutes(time){
    const [hours, minutes] = time.split(":")
    return Number((hours * 60) + minutes)
}

module.exports = {
    subjects,
    weekdays,
    getSubject,
    convertHoursToMinutes
}