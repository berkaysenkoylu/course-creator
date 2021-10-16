const INPUT_TEMPLATE = {
    elementType: 'input',
    elementConfig: {
        type: 'text',
        placeholder: ''
    },
    label: "",
    validation: {
        required: true
    },
    valid: false,
    touched: false,
    value: ''
};

const addInputField = (inputObj, newInputObj) => {
    const copiedInputObj = { ...inputObj };
    const { inputKey, placeholder, label, validation } = newInputObj;

    let newFormControl = { ...INPUT_TEMPLATE };
    let copiedConfig = { ...newFormControl.elementConfig };

    copiedConfig.placeholder = placeholder;
    newFormControl.elementConfig = copiedConfig;
    newFormControl.label = label;
    newFormControl.validation = validation;

    copiedInputObj[inputKey] = newFormControl;

    return {
        ...copiedInputObj
    };
}

export default addInputField;