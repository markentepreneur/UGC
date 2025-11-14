import { Query } from "mongoose";

export class ApiFeatures {
  query: Query<unknown, unknown>;
  queryString: URLSearchParams;
  totalCount: Query<unknown, unknown> | null = null;

  constructor(query: Query<unknown, unknown>, queryString: URLSearchParams) {
    this.query = query;
    this.queryString = queryString;
  }

  /**
   * Applies filtering logic to the query.
   * NOTE: totalCount is NOT updated here anymore,
   * to avoid incorrect value when pagination/limit applied.
   */
  filter() {
    const queryCopy = Object.fromEntries(this.queryString.entries());
    const queryExcluded = ["sort", "page", "limit", "pageSize"];
    queryExcluded.forEach((item) => delete queryCopy[item]);

    const queryStr = JSON.stringify(queryCopy);
    const queryObj = JSON.parse(
      queryStr.replace(/\b(gt|gte|lt|lte|exists)\b/g, (match) => `$${match}`)
    );
    for (const key in queryObj) {
      let originalKey = key;
      if (key.includes("--")) {
        originalKey = key.replace("--", ".");
        queryObj[originalKey] = queryObj[key];
        delete queryObj[key];
      }
      const value = queryObj[originalKey];
      if (typeof value === "string") {
        if (value.toLowerCase() === "true") {
          queryObj[originalKey] = true;
        } else if (value.toLowerCase() === "false") {
          queryObj[originalKey] = false;
        } else {
          queryObj[originalKey] = new RegExp(`^${value}`, "i");
        }
      }
    }
    console.log({ queryObj });

    this.query.find(queryObj);

    return this;
  }

  sort() {
    if (this.queryString.get("sort")) {
      this.query.sort(this.queryString.get("sort")); // ex -date || +date
    }

    return this;
  }

  /**
   * Applies pagination. Also sets totalCount with document count for the filtered query (without pagination!).
   * Returns a promise, so you must await paginate() before returning the result in the route.
   */
  paginate() {
    const page = +(this.queryString.get("page") || 1);
    const limit = +(this.queryString.get("limit") || 9);
    const skip = (page - 1) * limit;

    // Capture a clone of the query (before skip/limit) for count.
    // (mongoose 7+ supports `.clone()`)
    const countQuery = this.query.model.find(this.query.getQuery());

    // Set pagination
    this.query.skip(skip).limit(limit);

    // Get totalCount
    this.totalCount = countQuery.countDocuments();

    return this;
  }
}
