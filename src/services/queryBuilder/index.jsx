import { query } from "js-query-builder";
import qs from "qs";

const queryBuilder = (
  url,
  {
    fields = [],
    include = [],
    append = [],
    take = 0,
    sort = "",
    filter = {},
    offset = 1,
    extra = {},
  } = {}
) => {
  let queryObj = query(url);

  if (fields.length) {
    queryObj.param("fields", fields);
  }

  if (include.length) {
    queryObj.include(include);
  }

  if (append.length) {
    queryObj.append(append);
  }
  if (take > 0) {
    queryObj.param("take", Number(take));
  }

  if (sort) {
    queryObj.sort(sort);
  }

  if (Object.keys(filter).length) {
    Object.keys(filter).forEach((item) => {
      const normalized = qs
        .stringify({ filter: { [item]: filter[item] } }, { encode: false })
        .split("&");
      normalized.forEach((item) => {
        const splited = item.split("=");
        if (splited.length === 2 && splited[0] && splited[1]) {
          queryObj.param(splited[0], splited[1]);
        }
      });
    });
  }

  if (Object.keys(extra).length) {
    Object.keys(extra).forEach((key) => {
      if (key && extra[key]) {
        queryObj.param(key, extra[key]);
      }
    });
  }

  if (offset > 1) {
    queryObj.page(Number(offset));
  }

  return decodeURIComponent(queryObj.build());
};

export default queryBuilder;