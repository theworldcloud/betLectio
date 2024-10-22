const profile: Record<string, () => void> = {};

profile.changeLoginTimestamps = function() {
    const elements = [];

    const table: string = "form[path='AdgangIndstillinger'] table tr";
    elements.push(...Array.from(document.querySelectorAll(`${table} td:nth-child(1)`)));
    elements.push(...Array.from(document.querySelectorAll(`${table} td:nth-child(2)`)));

    elements.forEach(function(element) {
        let [ date, time ] = element.innerHTML.split(" ");
        let [ day, monthYear ] = date.split("/");
        let [ month, year ] = monthYear.split("-");

        day = parseInt(day) > 9 ? day : "0" + day;
        month = parseInt(month) > 9 ? month : "0" + month;

        date = `${day}/${month}-${year}`;
        time = time.replace(":", ".");

        element.innerHTML = `${date} ${time}`;
    });
}

Object.keys(profile).forEach(func => profile[func]());
