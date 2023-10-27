const RandomPassword = function () {
    const length = 8;
    const characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789<>.,.?/}]{]+_-)(*&^%$#@!=";
    let randomPassword = '';
    const charactersLength = characters.length;

    for (let i = 0; i < length; i++) {
        randomPassword += characters.charAt(Math.floor(Math.random() * charactersLength));
    }

    return randomPassword;
};

export default RandomPassword;
