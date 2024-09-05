import { z } from "zod";

// Define a Zod schema for query parameters
export const queryParams = z.object({
    page: z
        .string()
        .regex(/^\d+$/)
        .transform(Number)
        .default(() => "1"),
    limit: z
        .string()
        .regex(/^\d+$/)
        .transform(Number)
        .default(() => "10"),
    sort_added: z
        .string()
        .regex(/^(latest|oldest)$/i)
        .optional()
        .default(() => "latest"),
    keyword: z.string().optional().default(""),
});

// Type alias for the inferred type from Zod schema
export type QueryParams = z.infer<typeof queryParams>;

export const transformSortOrder = (sort_added: string) => {
    if (sort_added === "oldest") {
        return "asc";
    }

    return "desc";
};
