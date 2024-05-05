import { Url } from "../api/apiaccess/Url";
import Labels from "../contants/Labels.json";
import Networking from "../../utils/api/apiaccess/ApiAccess";
import {
    useLocation,
    useNavigate,
    useParams,
} from "react-router-dom";
const Label = Labels[window.globalConfig.language];
const isValid = { isValid: false, message: "" };

export function withRouter(Component) {
    function ComponentWithRouterProp(props) {
        let location = useLocation();
        let navigate = useNavigate();
        let params = useParams();
        return (
            <Component
                {...props}
                router={{ location, navigate, params }}
            />
        );
    }
    return ComponentWithRouterProp;
}

export function replaceNull(someObj, replaceValue = "") {
    const replacer = (key, value) => {
        if (typeof value === "number") {
            return value;
        } else if (typeof value === "boolean") {
            return value;
        } else {
            return String(value) === "null" ||
                String(value) === "undefined" ||
                Object.keys(value).length === 0 ||
                String(value).trim() === ""
                ? replaceValue
                : value;
        }
    };
    return JSON.parse(JSON.stringify(someObj, replacer));
}

export const emailValidator = (email, minLength, maxLength, message,) => {
    const requiredResult = requireValidator(email);
    if (requiredResult.isValid) {
        return requiredResult;
    }
    const minLengthResult = minLengthValidation(email, minLength, message);
    if (minLengthResult.isValid) {
        return minLengthResult;
    }
    const maxLengthResult = maxLengthValidation(email, maxLength, message);
    if (maxLengthResult.isValid) {
        return maxLengthResult;
    }
    const emailFormatResult = validateEmailFormat(email, message);
    if (emailFormatResult.isValid) {
        return emailFormatResult;
    }
    return isValid;
};

export const passwordValidator = (password, minLength, maxLength, message,) => {
    const requiredResult = requireValidator(password);
    if (requiredResult.isValid) {
        return requiredResult;
    }
    const minLengthResult = minLengthValidation(password, minLength, message);
    if (!minLengthResult.isValid) {
        return minLengthResult;
    }
    const maxLengthResult = maxLengthValidation(password, maxLength, message);
    if (!maxLengthResult.isValid) {
        return maxLengthResult;
    }
    return isValid;
}

export const minLengthValidation = (value, minLength, message) => {
    if (value.length < minLength)
        return { isValid: true, message: message !== undefined ? message : `${Label.message.minLength} ${minLength}` };
    return isValid;
}

export const maxLengthValidation = (value, maxLength, message) => {
    if (value.length <= maxLength)
        return isValid;
    else
        return { isValid: true, message: message !== undefined ? message : `${Label.message.maxLength} ${maxLength}` };
}

export const validateEmailFormat = (email, message) => {
    const re = /\S+@\S+\.\S+/;
    if (!re.test(email)) {
        return { isValid: true, message: message !== undefined ? message : `${Label.message.emailValidation}` };
    } else {
        return isValid;
    }
};
export const requireValidator = (value, message) => {
    if (replaceNull(value)?.trim()?.length === 0) {
        return { isValid: true, message: message !== undefined ? message : `${Label.message.required}` };
    }
    return isValid;
};
export const alphaAndNumbericOnly = (value, message,) => {
    let rg = /^[\a-zA-Z0-9]+(\s?$|\s{1,}[\a-zA-Z0-9]+)+$/
    if (!rg.test(value)) {
        return { isValid: true, message: message !== undefined ? message : `${Label.message.specialCharacterErrorMessage}` };
    }

    return isValid;
};

export const alphaNumbericSpaceandCommaOnly = (value, message,) => {
    let rg = /^[\.a-zA-Z0-9,\s]*$/
    if (!rg.test(value)) {
        return { isValid: true, message: message !== undefined ? message : `${Label.message.specialCharacterErrorMessage}` };
    }
    return isValid;
};

export const alphaSpaceandCommaOnly = (value, message,) => {
    let rg = /^[\.a-zA-Z,\s]*$/
    if (!rg.test(value)) {
        return { isValid: true, message: message !== undefined ? message : `${Label.message.specialCharacterErrorMessage}` };
    }
    return isValid;
};

export const numbersOnly = (value, message,) => {
    let rg = /^\d+$/
    if (!rg.test(value)) {
        return { isValid: true, message: message !== undefined ? message : `${Label.message.specialCharacterErrorMessage}` };
    }
    return isValid;
};
export const alphaSpaceOnly = (value, message,) => {
    let rg = /^[a-zA-Z ]*$/
    if (!rg.test(value)) {
        return { isValid: true, message: message !== undefined ? message : `${Label.message.alphaAndSpaceOnlyErrorMessage}` };
    }
    return isValid;
};

export const numbersandDeciamlOnly = (value, message,) => {
    let rg = /^[+-]?([0-9]+([.][0-9]*)?|[.][0-9]+)$/

    if (!rg.test(value)) {
        return { isValid: true, message: message !== undefined ? message : `${Label.message.specialCharacterErrorMessage}` };
    }
    return isValid;
};

export const amountCommaSeperator = (number) => {
    if (number !== null || number !== '') {
        const parts = number.toString().split('.');
        const integerPart = parts[0].replace(/\B(?=(?:(\d\d)+(\d)(?!\d))+(?!\d))/g, ',')

        let formattedNumber = integerPart;
        if (parts.length > 1) {
            formattedNumber += '.' + parts[1];
        }
        return formattedNumber;
    }
    return '';
}

export function sortArray(data, keyName, typeofSorting) {
    if (Array.isArray(data)) {
        if (typeofSorting === "ASC") {
            data = data.toSorted((a, b) => a[keyName] - b[keyName]);
        } else {
            data = data.toSorted((a, b) => b[keyName] - a[keyName]);
        }
        return data;
    }
}

export const alphaphetsOnly = (value, message,) => {
    let rg = /^[a-zA-Z\s]*$/
    if (!rg.test(value)) {
        return { isValid: true, message: message !== undefined ? message : `${Label.message.alphaphetsOnly}` };
    }
    return isValid;
};

export function sessionExpired(S = '', f) {
    let data = {
        'SessionID': S,
    }
    try {
        Networking.getApi(Url.sessionCheck, data)
            .then((res) => {
                if (res.status === 405 || res.status === 401) {
                    window.location.href = '/';
                }
            })
            .catch((error) => {
                console.error("API Error:", error);
            })
    } catch (error) {
        console.error("API Error:", error);
    };
}



// export const IsNotEmpty = (value) => {
//     if (value !== undefined && value !== null && value !== "" && value !== {} && value !== []) {
//         return true
//     } else {
//         return false
//     }
// }
