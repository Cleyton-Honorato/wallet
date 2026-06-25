import { baseApi } from '@app/api';
import type { Category, CategoryType } from '@features/categories/types/category.types';

interface ApiCategory {
  id: number;
  name: string;
  color: string;
  icon: string | null;
  type: 'EXPENSE' | 'INCOME';
  isSystem: boolean;
}

interface CreateCategoryBody {
  name: string;
  color: string;
  icon?: string;
  type: 'EXPENSE' | 'INCOME';
}

type UpdateCategoryBody = Partial<CreateCategoryBody>;

function toCategory(raw: ApiCategory): Category {
  return {
    id: String(raw.id),
    name: raw.name,
    color: raw.color,
    icon: raw.icon ?? undefined,
    type: raw.type.toLowerCase() as CategoryType,
    isSystem: raw.isSystem,
  };
}

export const categoriesApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getCategories: builder.query<Category[], void>({
      query: () => '/categories',
      transformResponse: (raw: ApiCategory[]) => raw.map(toCategory),
      providesTags: (result) =>
        result
          ? [
              ...result.map(({ id }) => ({ type: 'Category' as const, id })),
              { type: 'Category' as const, id: 'LIST' },
            ]
          : [{ type: 'Category' as const, id: 'LIST' }],
    }),

    createCategory: builder.mutation<Category, CreateCategoryBody>({
      query: (body) => ({ url: '/categories', method: 'POST', body }),
      transformResponse: (raw: ApiCategory) => toCategory(raw),
      invalidatesTags: [{ type: 'Category', id: 'LIST' }],
    }),

    updateCategory: builder.mutation<Category, { id: string; body: UpdateCategoryBody }>({
      query: ({ id, body }) => ({ url: `/categories/${id}`, method: 'PATCH', body }),
      transformResponse: (raw: ApiCategory) => toCategory(raw),
      invalidatesTags: (_r, _e, { id }) => [
        { type: 'Category', id },
        { type: 'Category', id: 'LIST' },
      ],
    }),

    deleteCategory: builder.mutation<void, string>({
      query: (id) => ({ url: `/categories/${id}`, method: 'DELETE' }),
      invalidatesTags: [{ type: 'Category', id: 'LIST' }],
    }),
  }),
});

export const {
  useGetCategoriesQuery,
  useCreateCategoryMutation,
  useUpdateCategoryMutation,
  useDeleteCategoryMutation,
} = categoriesApi;
