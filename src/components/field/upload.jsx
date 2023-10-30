import React, { useState } from 'react';
import { Upload } from 'antd';
const App = ({
    field,
    label,
    required = false,
    placeholder,
    errorMessage = "To'ldirish shart",
    form: { setFieldValue, errors, touched, setFieldTouched },
}) => {
    return (
        <div className='my-2'>
            <Upload
                listType="picture-card"
                status={touched[field.name] && errors[field.name] && "error"}
                onBlur={() => setFieldTouched(field.name, true)}
                onChange={(e) => setFieldValue(field.name, e.file.originFileObj)}
                onPreview={false}
            >
                + Upload
            </Upload >
            {!field.value && touched[field.name] && errors[field.name] && (
                <small className="text-red-500 font-bold text-xs">
                    {errorMessage}
                </small>
            )}
        </div>
    );
};
export default App;