//localStorage.removeItem("companion");
//localStorage.removeItem("personCompanion");
//localStorage.removeItem("personPatient");
//localStorage.removeItem("patient");

if (localStorage.getItem("patient") === null) {     // local storage patient id
    localStorage.setItem("patient", 17);
}
if (localStorage.getItem("personPatient") === null) {      // local storage person id of patient
    localStorage.setItem("personPatient", 46);
}
if (localStorage.getItem("personCompanion") === null) {      // local storage person id of companion
    localStorage.setItem("personCompanion", 43);
}
if (localStorage.getItem("companion") === null) {     // local storage companion id
    localStorage.setItem("companion", 22);
}