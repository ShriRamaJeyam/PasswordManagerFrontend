export const putLocal = (name,value) => {
    localStorage.setItem(name,JSON.stringify(value));
};

export const getLocal = (name) => {
    return JSON.parse(localStorage.getItem(name));
};

export const deepClone = (data) => {
    return JSON.parse(JSON.stringify(data));
};

export const downloadTextFile = (text,filename) => {
    const data = encodeURIComponent(text);
    const e = document.createElement('a');
    e.style.display = 'none';
    e.setAttribute('download', filename);
    e.setAttribute('href', `data:text/plain;charset=utf-8,${data}`);
    document.body.appendChild(e);
    e.click();
    document.body.removeChild(e);
}