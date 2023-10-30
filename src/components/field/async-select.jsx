import { get } from "lodash";
import React from "react";
import { AsyncPaginate } from "react-select-async-paginate";
import api from "services/api";
import queryBuilder from "services/queryBuilder";

const index = ({
  placeholder,
  label,
  optionLabel,
  loadOptionsUrl,
  optionValue,
  menuPlacement = "bottom",
  isMulti = false,
  loadOptionsParams = () => { },
  errorMessage = "Tanlash shart",
  field: { value, name },
  form: { setFieldValue, errors, touched, setFieldTouched }
}) => {
  async function loadOptions(search, { page }) {
    const { data } = await api.get(
      queryBuilder(loadOptionsUrl, {
        page,
        ...loadOptionsParams(search)
      })
    );
    return {
      options: get(data, "data", []),
      hasMore: get(data, "total") > get(data, "perPage") ? true : false,
      additional: {
        page: page + 1
      }
    };
  }
  return (
    <div className="my-2">
      {/* {label ? <h2 className="text-sm">{label}</h2> : null} */}
      <AsyncPaginate
        value={value}
        name={name}
        menuPlacement={menuPlacement}
        isMulti={isMulti}
        onBlur={() => setFieldTouched(name, true)}
        loadOptions={loadOptions}
        getOptionValue={(option) =>
          typeof optionLabel === "function"
            ? optionLabel(option)
            : option[optionLabel]
        }
        getOptionLabel={(option) =>
          typeof optionValue === "function"
            ? optionValue(option)
            : option[optionValue]
        }
        additional={{
          page: 1
        }}
        onChange={(value) => setFieldValue(name, value)}
      />
      {!value && touched[name] && errors[name] && (
        <small className="text-red-500 font-semibold text-xs">
          {errorMessage}
        </small>
      )}
    </div>
  );
};

export default index;