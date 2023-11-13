const successSection = document.querySelector('.success-section')
const formSection = document.querySelector('.form-wrapper')
const form = document.getElementById('cardForm');
const continuetoForm = document.getElementById('continue');

const defaultValues = { //Defines the defaults values in the tags
    nameTag: "Jane Appleseed",
    cardNumberTag: "0000000000000000",
    monthTag: "00",
    yearTag: "00",
    cvcTag: "000"
}


const inputElements = { //Defines the id of the input and then the tag it refers to
    name: 'nameTag',
    number: 'cardNumberTag',
    month: 'monthTag',
    year: 'yearTag',
    cvc: 'cvcTag'
}

const onInputHanlder = (input, tag) =>{
    const inputValue = input.value;
    const getTagId = tag.getAttribute('id')
    
    if(getTagId === "nameTag"){
       handleStringInput(inputValue, tag, getTagId)
    }else{
       handleNumberInput(inputValue, tag, getTagId);
    }
   
}

const returnToForm = () =>{
    form.reset()
    formSection.style.display = "flex"
    successSection.style.display = "none"
}

const submitHandler = (e) => {
    e.preventDefault();
    document.querySelectorAll('.error').forEach(error => error.remove());
    const formData = Object.fromEntries(new FormData(e.target));
    let eachFieldIsCorrect = true;
   

    const fieldStatus = Object.keys(formData).map(key => {
        const inputValue = formData[key];
        const isValueEmpty = inputValue.trim() === '';
        let isLengthValid = key === 'number' ? inputValue.length === 16 : true;
        let isOnlyNumbers = key === 'number' ? !isNaN(inputValue) : true;

        return {
            field: key,
            isEmpty: isValueEmpty,
            isLengthValid: isLengthValid,
            isOnlyNumbers: isOnlyNumbers
        };
    });

    fieldStatus.forEach(field => {
        const input = document.getElementById(field.field);
        const errorMessage = document.createElement('p');
        errorMessage.classList.add('error');

        const errorText = (field) => {
           return field.isEmpty
                ? `Can't be blank`
                : !field.isLengthValid
                ? 'You need to enter 16 digits'
                : 'Wrong format, only numbers allowed';
        }

        if (field.isEmpty || !field.isLengthValid || !field.isOnlyNumbers) {
            input.classList.add('empty');
            eachFieldIsCorrect = false;
            errorMessage.textContent = errorText(field);
            input.insertAdjacentElement('afterend', errorMessage);
        } else {
            input.classList.remove('empty');
            const existingError = input.nextElementSibling;
            if (existingError?.classList.contains('error')) existingError.remove();
        }
    });

    if (eachFieldIsCorrect) {
        formSection.style.display = 'none';
        successSection.style.display = 'flex';
    }
};

const handleNumberInput = (value, tag, idText) =>{
    const tagLength = defaultValues[idText].length;
    const newValue = value.padStart(tagLength, '0');
    const formatedValue = (valueToFormat) => valueToFormat.replace(/\s/g, '').replace(/(.{4})/g, '$1 ').trim();
    value? 
        tag.innerText = formatedValue(newValue)
    :
        tag.innerText = formatedValue(defaultValues[idText])
}

const handleStringInput = (value, tag, idText) => {
    value? 
        tag.innerText = value
    :
        tag.innerText = defaultValues[idText]
}

window.onload = () =>{

    form.addEventListener('submit', (e) => submitHandler(e))
    continuetoForm.addEventListener('click', () => returnToForm())

    for(const inputId in inputElements){
        const input = document.getElementById(inputId)
        const tag = document.getElementById(inputElements[inputId])

        input.addEventListener('input', () => onInputHanlder(input, tag))
    }

}