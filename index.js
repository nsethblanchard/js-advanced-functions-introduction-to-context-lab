// Your code here

function createEmployeeRecord(array){
    const employee = {
        firstName: array[0], 
        familyName: array[1], 
        title: array[2],
        payPerHour: array[3],  
        timeInEvents: [], 
        timeOutEvents: []
    }
    return employee
}

function createEmployeeRecords(array){
    let records = []
    for (const elem of array) {
        let record = createEmployeeRecord(elem)
        records.push(record)     
    }
    return records
}

function createTimeInEvent(record, timeIn) {
    let newObj = {
        type: "TimeIn",
        hour: parseInt(`${timeIn.slice(11)}`),
        date: `${timeIn.slice(0, 10)}`
    }
    record.timeInEvents.push(newObj)
    return record
}

function createTimeOutEvent(record, timeOut) {
    let newObj = {
        type: "TimeOut",
        hour: parseInt(`${timeOut.slice(11)}`),
        date: `${timeOut.slice(0, 10)}`
    }
    record.timeOutEvents.push(newObj)
    return record
}

function hoursWorkedOnDate(record, day) {
    let inOn = record.timeInEvents.find(function(e){
        return e.date === day
    })
    
    let outOn = record.timeOutEvents.find(function(e){
        return e.date === day
    })
    return (outOn.hour - inOn.hour)/100
}

function wagesEarnedOnDate(record, date) {
    let wage = hoursWorkedOnDate(record, date) * record.payPerHour
    return wage
}

function allWagesFor(employee) {
    let dates = employee.timeInEvents.map(function(e){
        return e.date
    })
    
    let pay = dates.reduce(function(acc, current){
        return acc + wagesEarnedOnDate(employee, current)
    }, 0)

    return pay
}

function findEmployeeByFirstName(array, firstName) {
    return array.find(name => name.firstName === firstName)
}

function calculatePayroll(array){
    return array.reduce(function(acc, current){
        return acc + allWagesFor(current)
    }, 0)
}