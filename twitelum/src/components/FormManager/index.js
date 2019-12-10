import React, {useState, useEffect} from 'react'

export const FormManager = ({children, initialValues, onFormValidations}) => {

    const [values, setValues] = useState({...initialValues});
    const [errors, setErros] = useState({...initialValues});
    const [touched, setTouched] = useState({...initialValues})

    useEffect(() => {
        setErros(onFormValidations(values));
    }, [onFormValidations, values]);

    const onFormFieldChange = ({target}) => {
        const value = target.value;
        const name =  target.name;
        const updateValues = { ...values, [name]: value};
        setValues(updateValues)
    };

    const onFormFieldBlur = ({target}) =>{
        setTouched({ ...touched, [target.name]: true})
    }

    return(
        <React.Fragment>
            {
                children &&
                    children({
                        values,
                        errors,
                        touched,
                        onFormFieldChange,
                        onFormFieldBlur
                    })
            }
        </React.Fragment>

    )



}