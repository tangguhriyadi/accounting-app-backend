import { Pagination } from "../utils/global_type";
export const success = (
    message: string,
    results: unknown,
    pagination?: Pagination
) => {
    return {
        message,
        results,
        pagination,
    };
};
