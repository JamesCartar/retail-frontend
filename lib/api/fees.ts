import { api } from "./client";
import { API_ENDPOINTS } from "@/common/constants";
import { Fee, CreateFeeApiInput } from "@/common/types";

export const feeService = {
  async getAll() {
    const url = `${API_ENDPOINTS.FEES.LIST}`;
    const response = await api.get<{ transferFees: Fee[] }>(url);
    return response;
  },

  async getByAmount(amount: number) {
    const response = await api.get<{
      transferFee: Fee;
    }>(API_ENDPOINTS.FEES.GET(amount));
    return response;
  },

  async create(data: { data: CreateFeeApiInput[] }) {
    return api.post<Fee>(API_ENDPOINTS.FEES.CREATE, data);
  },
};
