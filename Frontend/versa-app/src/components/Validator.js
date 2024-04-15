export const validateEmail = (email) => {
    return email.match(
        /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    ) !== null;
};

export const validatePassword = (password) => {
    let hasUpper = false
    let hasLower = false
    let hasDigit = false
    let hasSpecial = false
    if (password.length < 10) return false
    const specialAlphabet = "!@#$%^&*()_-+=<>?/,.{}[]|'`~:;\""

    for (let i = 0; i < password.length; i++) {
        if (password[i] >= 'A' && password[i] <= 'Z') hasUpper = true
        if (password[i] >= 'a' && password[i] <= 'z') hasLower = true
        if (password[i] >= '0' && password[i] <= '9') hasDigit = true
        if (specialAlphabet.includes(password[i])) hasSpecial = true
    }

    return hasUpper && hasLower && hasDigit && hasSpecial
}


