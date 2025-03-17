import { useState } from "react";

const useValidation = () => {
    const [ errors, setErrors ] = useState({});

    const validate = (data, ignoredFields = []) => {
        let newErrors = {};
        for (const key in data) {
            if (!data[key] && !ignoredFields.includes(key)) newErrors[key] = true;
        }
        setErrors(newErrors);
        return Object.keys(newErrors).length
    };

    return { errors, setErrors, validate };
};

export default useValidation;