import SecureStorage from 'secure-web-storage';
var CryptoJS = require("crypto-js");
import Lables from "../../utils/contants/Labels.json";

var secretKey = Lables[window.globalConfig.language].token.secretToken;

var SecureStorage = new SecureStorage(localStorage, {
    hash: function hash(key) {
        return CryptoJS.SHA256(key, secretKey).toString();
    },
    encrypt: function encrypt(data) {
        return CryptoJS.AES.encrypt(data, secretKey).toString();
    },
    decrypt: function decrypt(data) {
        return CryptoJS.AES.decrypt(data, secretKey).toString(CryptoJS.enc.Utf8);
    }
});

export default SecureStorage;