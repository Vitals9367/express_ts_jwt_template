export const validatePassword = (password:string):boolean => {

    const maxLenght = 32;
    const minLenght = 8;

    if(password.length > maxLenght || password.length < minLenght)
        return false;

    return true;
}

export const validateEmail = (email:string) => {

    const parts = email.split("@");

    if(parts.length != 2)
        return false;
    
    if(!parts[1].includes('.'))
        return false;

    if(parts[1].length < 4 || parts[1].length > 24)
        return false;    

    if(parts[0].length < 4 || parts[0].length > 24)
        return false;

    if(email.length < 6 || email.length > 24)
        return false;

    return true;
}