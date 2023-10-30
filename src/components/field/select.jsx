import { Select } from 'antd';


const onChange = (value) => {
  console.log(`selected ${value}`);
};
const onSearch = (value) => {
  console.log('search:', value);
};
const select = ({
  field: { value, name },
  placeholder,
  options,
  optionLabelProp = "label",
  errorMessage = "Tanlash shart",
  form: { setFieldValue, errors, touched, setFieldTouched }
}) => (
  <div>
    <Select
      key={value}
      rootClassName='w-full'
      options={options}
      defaultValue={value}
      onBlur={() => setFieldTouched(name, true)}
      placeholder={placeholder}
      optionLabelProp={optionLabelProp}
      onChange={(e) => setFieldValue(name, e)}
    />
    {!value && touched[name] && errors[name] && (
      <small className="text-red-500 font-semibold text-xs">
        {errorMessage}
      </small>
    )}
  </div>
);
export default select;