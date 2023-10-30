import React from 'react';
import { Select } from 'antd';
const handleChange = (value) => {
    console.log(`selected ${value}`);
};
const App = ({
    field: { value, name },
    placeholder,
    options = [],
    optionLabelProp = "label",
    errorMessage = "Tanlash shart",
    form: { setFieldValue, errors, touched, setFieldTouched }
}) => (
    <div className='my-2 cursor-pointer'>
        <select className="form-control cursor-pointer" onChange={(e) => setFieldValue(name, e.target.value)}>
            {
                options.map((item, index) => {
                    return (
                        <option key={index} value={item.id}>{item.title}</option>
                    )
                })
            }
        </select>
        {
            !value && touched[name] && errors[name] && (
                <small className="text-red-500 font-semibold text-xs">
                    {errorMessage}
                </small>
            )
        }
    </div >
);
export default App;