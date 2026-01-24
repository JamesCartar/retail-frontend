/**
 * Zod Validation Schemas
 * Type-safe validation schemas for form validation
 */

import { z } from "zod";
import { removeNumberComma } from "../utils";

// Login Schema
export const loginSchema = z.object({
  email: z.string().min(1, "Email is required").email("Invalid email address"),
  password: z
    .string()
    .min(1, "Password is required")
    .min(6, "Password must be at least 6 characters"),
});

export type LoginFormData = z.infer<typeof loginSchema>;

// Register Schema
export const registerSchema = z
  .object({
    name: z
      .string()
      .min(1, "Name is required")
      .min(2, "Name must be at least 2 characters")
      .max(100, "Name must be at most 100 characters"),
    email: z
      .string()
      .min(1, "Email is required")
      .email("Invalid email address"),
    password: z
      .string()
      .min(1, "Password is required")
      .min(6, "Password must be at least 6 characters"),
    confirmPassword: z.string().min(1, "Please confirm your password"),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  });

export type RegisterFormData = z.infer<typeof registerSchema>;

// Record Schema - Base schema without conditional validation
const baseRecordSchema = z.object({
  description: z.string().optional(),
  phoneNo: z
    .string("အချက်အလက်ဖြည့်ရန် *")
    .min(7, "ဖုန်းနံပါတ် သည် ၇ လုံးမှ ၁၁ လုံးကြားရှိရမည်")
    .max(11, "ဖုန်းနံပါတ် သည် ၇ လုံးမှ ၁၁ လုံးကြားရှိရမည်"),
  date: z
    .string("အချက်အလက်ဖြည့်ရန် *")
    .refine((val) => !isNaN(Date.parse(val)), {
      message: "Invalid date",
    }),
  amount: z
    .string("အချက်အလက်ဖြည့်ရန် *")
    .refine(
      (val) => !isNaN(Number(removeNumberComma(val))),
      "ဂဏန်းသီးသန့်ဖြစ်ရမည်",
    )
    .refine((val) => Number(removeNumberComma(val)) > 0, "အချက်အလက်ဖြည့်ရန် *"),
  fee: z
    .string("အချက်အလက်ဖြည့်ရန် *")
    .refine(
      (val) => !isNaN(Number(removeNumberComma(val))),
      "ဂဏန်းသီးသန့်ဖြစ်ရမည်",
    )
    .refine((val) => Number(removeNumberComma(val)) > 0, "အချက်အလက်ဖြည့်ရန် *"),
  branchId: z.string("အချက်အလက်ဖြည့်ရန် *").optional(),
});

const requiredRecordSchema = baseRecordSchema.extend({
  description: z
    .string("အချက်အလက်ဖြည့်ရန် *")
    .min(1, "အချက်အလက်ဖြည့်ရန် *")
    .max(1000, "အချက်အလက်သည် အများဆုံး ၁၀၀၀ အက္ခရာရှိနိုင်သည်")
    .refine((val) => val.trim().length > 0, "အချက်အလက်ဖြည့်ရန် *"),
});

// Default record schema (for backward compatibility)
export const recordSchema = baseRecordSchema;

// Factory function to create record schema with conditional description validation
export const createRecordSchema = ({
  selectedPay,
  selectedTab,
  hasBranches = false,
}: {
  selectedPay?: string;
  selectedTab?: string;
  hasBranches?: boolean;
}) => {
  let schema =
    selectedPay === "other" || selectedTab === "bank"
      ? requiredRecordSchema
      : baseRecordSchema;

  if (hasBranches) {
    return schema.extend({
      branchId: z.string("အချက်အလက်ဖြည့်ရန် *").min(1, "အချက်အလက်ဖြည့်ရန် *"),
    });
  }

  return schema;
};

export type RecordFormData = z.infer<typeof recordSchema>;

// Fee Schema
export const feeSchema = z.object({
  fees: z.array(
    z
      .object({
        from: z
          .string("အချက်အလက်ဖြည့်ရန် *")
          .refine(
            (val) => !isNaN(Number(removeNumberComma(val))),
            "ဂဏန်းသီးသန့်ဖြစ်ရမည်",
          )
          .refine(
            (val) => Number(removeNumberComma(val)) > 0,
            "အချက်အလက်ဖြည့်ရန် *",
          ),
        to: z
          .string("အချက်အလက်ဖြည့်ရန် *")
          .refine(
            (val) => !isNaN(Number(removeNumberComma(val))),
            "ဂဏန်းသီးသန့်ဖြစ်ရမည်",
          )
          .refine(
            (val) => Number(removeNumberComma(val)) > 0,
            "အချက်အလက်ဖြည့်ရန် *",
          ),
        fee: z
          .string("အချက်အလက်ဖြည့်ရန် *")
          .refine(
            (val) => !isNaN(Number(removeNumberComma(val))),
            "ဂဏန်းသီးသန့်ဖြစ်ရမည်",
          )
          .refine(
            (val) => Number(removeNumberComma(val)) > 0,
            "အချက်အလက်ဖြည့်ရန် *",
          ),
      })
      .refine(
        (data) => {
          const fromVal = Number(removeNumberComma(data.from));
          const toVal = Number(removeNumberComma(data.to));
          return fromVal < toVal;
        },
        {
          message: "ပမာဏများနေပါသည် *",
          path: ["from"],
        },
      ),
  ),
});

export type FeeFormData = z.infer<typeof feeSchema>;

// Export all schemas
export const schemas = {
  login: loginSchema,
  register: registerSchema,
  record: recordSchema,
  fee: feeSchema,
};
