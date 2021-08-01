const validateInput = (value:string | number, rules:{[key:string]: string | number}) => {
    let warning = null;
    let checkedValue = value;

    if(!value || !rules) return;
    if(rules.NWS && typeof value === 'string') {
        checkedValue = value.trim();
    }
    if(typeof checkedValue === 'string') {
        if(!warning && rules.minLength) {
            warning = checkedValue.length < rules.minLength ? `This field must have at least ${rules.minLength} characters.` : null;
        }
        if(!warning && rules.maxLength) {
            warning = checkedValue.length > rules.maxLength ? `This field might be ${rules.maxLength} characters long.` : null;
        }
        if(!warning && rules.isEmail) {
            const emailRegex = new RegExp(/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/);
            warning = emailRegex.test(checkedValue) ? null : `This field requires an email.`;
        }
    }
        
    return warning;
}

export default validateInput;