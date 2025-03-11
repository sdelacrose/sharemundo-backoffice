import { PromoCode } from "./PromoCodeProps";

export interface Coupon {
  id: number;
  stripe_coupon_id?: string;
  name: string;
  discount_type: "percentage" | "fixed";
  percent_off?: number;
  amount_off?: number;
  currency?: string;
  duration: "forever" | "once" | "repeating";
  duration_in_months?: number;
  max_redemptions?: number;
  times_redeemed: number;
  is_active: boolean;
  created_at: string;
  updated_at: string;
  promo_codes: PromoCode[];
}
