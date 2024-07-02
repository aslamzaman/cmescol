import { villageDropdown } from "./dropdown";

export const isDate = (value) => {
    const timestamp = Date.parse(value);
    return !isNaN(timestamp);
}

export const formatedDate = (dt) => {
    const initialDate = isDate(dt);
    let d = "";
    if (initialDate) {
        d = new Date(dt);
    } else {
        d = new Date("1970-01-01");
    }
    const d1 = d.getFullYear();
    const d2 = d.getMonth();
    const d3 = d.getDate();
    const utcDate = new Date(Date.UTC(d1, d2, d3));
    return utcDate.toISOString().split('T')[0];
}

export const myAge = (dt) => {
    const d = isDate(dt);
    let d1 = 0;
    if (d) {
        d1 = new Date(dt).getTime();
    } else {
        d1 = Date.now();
    }
    
    let d2 = Date.now();
    let d3 = d2 - d1;
  
    return Math.round(d3 / (1000 * 31556952));
}

export const mobileNumCheck = (num) => {
    const m = parseInt(num).toString();
    return m.length === 10 ? `0${m}` : m.length > 10 ? '** More digit' : '** Less digit'
}


export const dateChackingForLogalto = (dt, cat) => {
    const d = isDate(dt);
    let st = "";
    if (d) {
        const age = myAge(dt);
        if (cat === "perticipant") {
            if (age < 13 || age > 56) {
                st = `** There is no age limit (${age})`;
            } else {
                st = dt;
            }
        } else {
            if (age < 20 || age > 90) {
                st = `** There is no age limit (${age})`;
            } else {
                st = dt;
            }
        }
    } else {
        st = `** The date is not formatted`;
    }
    return st;
}



export const sortVillage = (unit) => {
    const searchVillage = villageDropdown.filter(village=> village.unit === unit)
    const uniqueNames = new Set();
    const result = searchVillage.filter(item => {
        const isDuplicate = uniqueNames.has(item.name);
        uniqueNames.add(item.name);
        return !isDuplicate;
    });
    return result;
}
