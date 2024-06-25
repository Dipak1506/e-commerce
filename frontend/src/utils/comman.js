export const checkEmail = (email) => {
    const validRegex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;

    if (!email || email.length === 0){
        return false;
    }

    if (!validRegex.test(email)){
        return false;
    }
    return true;
}

export const checkUsername = (username) => {
    const validRegex = /^(?=.*[a-zA-Z])(?=.*[0-9])[a-zA-Z0-9]+$/;

    if (!username || username.length === 0){
        return false;
    }

    if (!validRegex.test(username)){
        return false;
    }
    return true;
}