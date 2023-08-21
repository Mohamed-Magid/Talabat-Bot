const isValidTalabatURL = url => {
    const regex = /^(https?:\/\/)?(www\.)?talabat\.com\/[^\s]*$/;
    return regex.test(url);
}

module.exports = isValidTalabatURL;