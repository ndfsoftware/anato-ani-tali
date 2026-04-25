export const DISCOUNT_TYPE = {
  PAYMENT: 'payment',
  GENERAL: 'general',
  INTENSIVO: 'intensivo',
};
export type DiscountType = (typeof DISCOUNT_TYPE)[keyof typeof DISCOUNT_TYPE];

export interface Discount {
  id: number;
  type: DiscountType;
  paymentMethodId?: number;
  percentage: number;
  label: string;
}
