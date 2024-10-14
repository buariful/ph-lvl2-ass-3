import { Request } from "express";

interface QueryFilters {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  [key: string]: any;
}

interface PaginationOptions {
  skip: number;
  limit: number;
}

interface SortOptions {
  [key: string]: 1 | -1;
}

interface QueryBuilderResult {
  queryFilters: QueryFilters;
  paginationOptions: PaginationOptions;
  sortOptions: SortOptions;
}

const buildQuery = (req: Request): QueryBuilderResult => {
  const { page = 1, limit = 10, sort, tags, ...filters } = req.query;

  const queryFilters: QueryFilters = {};

  // Standard filters (convert to regex for case-insensitive partial matching)
  Object.entries(filters).forEach(([key, value]) => {
    if (typeof value === "string") {
      queryFilters[key] = new RegExp(value, "i");
    }
  });

  // Handling tags filtering
  if (tags) {
    const tagFilters = JSON.parse(tags as string) as {
      name?: string;
      isDeleted?: boolean;
    };
    queryFilters.tags = {};

    if (tagFilters.name) {
      queryFilters.tags.name = new RegExp(tagFilters.name, "i");
    }

    if (typeof tagFilters.isDeleted !== "undefined") {
      queryFilters.tags.isDeleted = tagFilters.isDeleted;
    }
  }

  // Pagination
  const paginationOptions: PaginationOptions = {
    skip: (Number(page) - 1) * Number(limit),
    limit: Number(limit),
  };

  // Sorting
  const sortOptions: SortOptions = {};
  if (sort && typeof sort === "string") {
    const [field, order] = sort.split(":");
    sortOptions[field] = order === "desc" ? -1 : 1;
  }

  return { queryFilters, paginationOptions, sortOptions };
};

export default buildQuery;
