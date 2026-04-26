export const DISCOUNT_TYPE = {
  PAYMENT: 'payment',
  GENERAL: 'general',
  INTENSIVO: 'intensivo',
  FACUAMIGO: 'facuamigo',
};
export type DiscountType = (typeof DISCOUNT_TYPE)[keyof typeof DISCOUNT_TYPE];

export interface Discount {
  id: number;
  type: DiscountType;
  paymentMethodId?: number;
  percentage: number;
  label: string;
}

export interface DiscountPriceOption {
  label: string;
  originalPrice: number;
  finalPrice: number;
}

export interface DiscountViewModel {
  id: number;
  type: DiscountType;
  label: string;
  percentage: number;
  hasDiscount: boolean;
  hasPrice: boolean;
  priceOptions: DiscountPriceOption[];
}
