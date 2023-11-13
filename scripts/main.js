const successSection = document.querySelector('.success-section')
const formSection = document.querySelector('.form-wrapper')
const form = document.getElementById('cardForm');
const continuetoForm = document.getElementById('continue');

const onInputHanlder = (input, tag) =>{
    const inputValue = input.value;
    const getIdText = tag.getAttribute('id')
    
    if(getIdText === "nameTag"){
       handleStringInput(inputValue, tag, getIdText)
    }else{
       handleNumberInput(inputValue, tag, getIdText);
    }
   
}

const returnToForm = () =>{
    form.reset()
    formSection.style.display = "flex"
    successSection.style.display = "none"
}

const submitHandler = (e) => {
    e.preventDefault();
    const data = Object.fromEntries(new FormData(e.target));
    let allFieldsIsFilled = true;
    document.querySelectorAll('.error').forEach(error => error.remove());

    const fieldStatus = Object.keys(data).map(key => {
        const inputValue = data[key];
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

        if (field.isEmpty || !field.isLengthValid || !field.isOnlyNumbers) {
            input.classList.add('empty');
            allFieldsIsFilled = false;

            const errorText = field.isEmpty
                ? 'Can\'t be blank'
                : !field.isLengthValid
                ? 'You need to enter 16 digits'
                : 'Wrong format, only numbers allowed';

            errorMessage.textContent = errorText;
            input.insertAdjacentElement('afterend', errorMessage);
        } else {
            input.classList.remove('empty');
            const existingError = input.nextElementSibling;
            if (existingError?.classList.contains('error')) {
                existingError.remove();
            }
        }
    });

    if (allFieldsIsFilled) {
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