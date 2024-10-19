import { Query } from "mongoose";

type SortOrderType = "asc" | "desc" | 1 | -1;

class CourseQueryBuilder<T> {
  public modelQuery: Query<T[], T>;
  public query: Record<string, unknown>;

  constructor(modelQuery: Query<T[], T>, query: Record<string, unknown>) {
    this.modelQuery = modelQuery;
    this.query = query;
  }

  filter() {
    const queryObj = { ...this.query };
    const excludeFields = ["limit", "page", "sortBy", "sortOrder"];

    excludeFields.forEach((el) => delete queryObj[el]);

    const excludeFields2 = [
      "minprice",
      "maxprice",
      "tags",
      "startdate",
      "enddate",
      "level",
      "durationinweeks",
    ];
    for (const key of Object.keys(queryObj)) {
      if (queryObj[key] === "") {
        delete queryObj[key];
      }

      if (!excludeFields2.includes(key?.toLocaleLowerCase())) {
        queryObj[key] = { $regex: queryObj[key], $options: "i" };
      }
    }

    // price
    if (queryObj["minPrice"] && queryObj["maxPrice"]) {
      queryObj["price"] = {
        $gte: queryObj["minPrice"],
        $lte: queryObj["maxPrice"],
      };
    }

    // tags
    if (queryObj["tags"]) {
      // it will match partially
      // queryObj["tags.name"] = { $regex: queryObj["tags"], $options: "i" };

      // it will match fully not partially...
      queryObj["tags.name"] = {
        $regex: `^${queryObj["tags"]}$`,
        $options: "i",
      };
    }

    // date range
    if (queryObj["startDate"] && queryObj["endDate"]) {
      queryObj["startDate"] = {
        $gte: queryObj["startDate"],
      };
      queryObj["endDate"] = {
        $lte: queryObj["endDate"],
      };
    }

    // level
    if (queryObj["level"]) {
      queryObj["details.level"] = {
        $regex: queryObj["level"],
        $options: "i",
      };
    }

    // // duration
    // if (queryObj["durationInWeeks"]) {
    //   queryObj["durationInWeeks"] = {
    //     $gte: queryObj["durationInWeeks"],
    //   };
    // }

    delete queryObj["minPrice"];
    delete queryObj["maxPrice"];
    delete queryObj["tags"];
    delete queryObj["level"];

    // eslint-disable-next-line no-console
    console.log(queryObj);

    this.modelQuery = this.modelQuery.find(queryObj);

    return this;
  }

  sort() {
    const queryObj = { ...this.query };
    const { sortBy = "startDate", sortOrder = "desc" } = queryObj;

    this.modelQuery = this.modelQuery.sort({
      [sortBy as string]: sortOrder as SortOrderType,
    });

    return this;
  }

  // pagination
  pagination() {
    const queryObj = { ...this.query };
    const { page = 1, limit = 10 }: { page?: number; limit?: number } =
      queryObj;
    const skip = (page - 1) * limit;

    this.modelQuery = this.modelQuery.skip(skip).limit(limit);

    return this;
  }
}

export default CourseQueryBuilder;
