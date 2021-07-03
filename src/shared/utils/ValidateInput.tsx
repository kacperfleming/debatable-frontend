const ValidateInput = (value:any, rules:any) => {
    let warning = null;
    let checkedValue = value;

    if(rules.NWS) {
        checkedValue = value.trim();
    }
    if(!warning && rules.minLength) {
        warning = checkedValue.length < rules.minLength ? `This field must have at least ${rules.minLength} characters.` : null;
    }
    if(!warning && rules.maxLength) {
        warning = checkedValue.length > rules.maxLength ? `This field might be ${rules.maxLength} characters long.` : null;
    }
    // if(!warning && rules.isEqual) {
    //     console.log(checkedValue);
    //     console.log(rules.isEqual);
    //     warning = checkedValue !== rules.isEqual.value ? `This field must match ${rules.isEqual.field} field.` : null;
    // }
    if(!warning && rules.isEmail) {
        const emailRegex = new RegExp(/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/);
        warning = emailRegex.test(checkedValue) ? null : `This field requires an email.`;
    }

    return warning;
}

export default ValidateInput;