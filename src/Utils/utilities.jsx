export const putLocal = (name,value) => {
    localStorage.setItem(name,JSON.stringify(value));
};

export const getLocal = (name) => {
    return JSON.parse(localStorage.getItem(name));
};

export const deepClone = (data) => {
    return JSON.parse(JSON.stringify(data));
};