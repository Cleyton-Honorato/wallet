import { baseApi } from '@app/api';
import type {
  AddEmergencyFundMovementRequest,
  EmergencyFund,
  EmergencyFundMovement,
  EmergencyFundMovementType,
  UpdateEmergencyFundRequest,
} from '../types/emergencyFund.types';

type ApiMovementType = 'DEPOSIT' | 'WITHDRAWAL';

interface ApiEmergencyFundMovement {
  id: number;
  type: ApiMovementType;
  amount: number;
  date: string;
  description: string | null;
}

interface ApiEmergencyFund {
  id: number;
  balance: number;
  targetAmount: number;
  updatedAt: string;
  movements: ApiEmergencyFundMovement[];
}

const toDomainType = (type: ApiMovementType): EmergencyFundMovementType =>
  type === 'DEPOSIT' ? 'deposit' : 'withdrawal';

const toApiType = (type: EmergencyFundMovementType): ApiMovementType =>
  type === 'deposit' ? 'DEPOSIT' : 'WITHDRAWAL';

function toMovement(raw: ApiEmergencyFundMovement): EmergencyFundMovement {
  return {
    id: String(raw.id),
    type: toDomainType(raw.type),
    amount: raw.amount,
    date: raw.date,
    description: raw.description ?? undefined,
  };
}

function toEmergencyFund(raw: ApiEmergencyFund): EmergencyFund {
  return {
    id: String(raw.id),
    balance: raw.balance,
    targetAmount: raw.targetAmount,
    updatedAt: raw.updatedAt,
    movements: raw.movements.map(toMovement),
  };
}

export const emergencyFundApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getEmergencyFund: builder.query<EmergencyFund, void>({
      query: () => '/emergency-fund',
      transformResponse: toEmergencyFund,
      providesTags: ['EmergencyFund'],
    }),
    updateEmergencyFund: builder.mutation<EmergencyFund, UpdateEmergencyFundRequest>({
      query: (body) => ({ url: '/emergency-fund', method: 'PUT', body }),
      transformResponse: toEmergencyFund,
      invalidatesTags: ['EmergencyFund', 'Dashboard'],
    }),
    addEmergencyFundMovement: builder.mutation<
      EmergencyFund,
      AddEmergencyFundMovementRequest
    >({
      query: ({ type, ...rest }) => ({
        url: '/emergency-fund/movements',
        method: 'POST',
        body: { type: toApiType(type), ...rest },
      }),
      transformResponse: toEmergencyFund,
      invalidatesTags: ['EmergencyFund', 'Dashboard'],
    }),
  }),
});

export const {
  useGetEmergencyFundQuery,
  useUpdateEmergencyFundMutation,
  useAddEmergencyFundMovementMutation,
} = emergencyFundApi;
