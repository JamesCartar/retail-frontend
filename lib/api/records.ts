import { api } from "./client";
import { API_ENDPOINTS } from "@/common/constants";
import {
  RecordItem,
  Pagination,
  CreateRecordApiInput,
  ReportRecordItem,
} from "@/common/types";
import { AxiosResponse } from "axios";

export type transferRecordReport = {
  date: string;
  totalAmount: number;
  totalFee: number;
  records: ReportRecordItem[];
};

export const recordService = {
  async getRecents(params: { page: number; limit: number }) {
    const queryParams = new URLSearchParams({
      page: String(params.page),
      limit: String(params.limit),
    });
    const url = `${API_ENDPOINTS.RECORDS.LIST}?${queryParams.toString()}`;

    return api.get<{
      transferRecords: RecordItem[];
      pagination: Pagination;
    }>(url);
  },

  async getReports(params: {
    startDate?: string;
    endDate?: string;
    pay?: string;
    page?: number;
  }) {
    const queryParams = new URLSearchParams({
      startDate: params.startDate || "",
      endDate: params.endDate || "",
      pay: params.pay || "",
      page: params.page ? String(params.page) : "1",
    });
    const url = `${API_ENDPOINTS.RECORDS.REPORTS}?${queryParams.toString()}`;

    return api.get<{
      transferRecords: transferRecordReport[];
    }>(url);
  },

  async generateReport(body: {
    startDate: string;
    endDate: string;
    fileType: "pdf" | "excel";
  }) {
    return api.post<AxiosResponse<Blob>>(API_ENDPOINTS.RECORDS.REPORTS, body, {
      responseType: "blob",
    });
  },

  async create(data: CreateRecordApiInput) {
    return api.post<RecordItem>(API_ENDPOINTS.RECORDS.CREATE, data);
  },
};
