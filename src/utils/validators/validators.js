export const required = value => {
    if(value) return undefined;

    return 'Поле обязательно для заполнения';
}

export const maxLengthCreator = (maxLength) => (value) => {
    if(value && value.length > maxLength) return `Max Lengthh is ${maxLength} symbols`;
    return undefined;
}

export const checkEmail = email => {
    if (/^(\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+[,;]?[ ]?)+$/.test(email)){
        return undefined;
    }
    return 'Неверный адрес электронной почты';
}

