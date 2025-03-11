export interface PromoCode {
  id: number;
  coupon: number;
  code: string;
  is_active: boolean;
  max_redemptions?: number;
  times_redeemed: number;
  expires_at?: string | undefined;
  first_time_transaction: boolean;
  minimum_amount?: number;
  minimum_amount_currency?: string;
  is_valid: boolean;
}
