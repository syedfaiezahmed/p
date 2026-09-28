export type OrderItem = {
  id?: number | string;
  name: string;
  price: number;
  qty: number;
  image?: string;
  category?: string;
};

export type TrackingStep = {
  title: string;
  description: string;
  time?: string;
  completed: boolean;
  current: boolean;
};

export type PaymentDetails = {
  senderName?: string;
  senderPhone?: string;
  accountPaidTo?: string;
  accountTitle?: string;
  amount?: number;
  screenshotUrl?: string;
  extractedTransactionId?: string | null;
  extractedAmount?: number | null;
  amountMatch?: "yes" | "no" | "not_detected";
  extractedProvider?: string | null;
  rejectionReason?: string | null;
  verifiedBy?: string | null;
  verifiedAt?: string | null;
};

export type AccountSetting = {
  accountNumber: string;
  accountTitle: string;
  active: boolean;
  instructions?: string;
};

export type PaymentSettings = {
  bankTransfer: AccountSetting;
  stcPay: AccountSetting;
  easypaisa?: AccountSetting;
  jazzcash?: AccountSetting;
};

export type Order = {
  id: string;
  orderNumber: string;
  customerName: string;
  phone: string;
  customerEmail?: string;
  address: string;
  city: string;
  notes?: string;
  serviceType?: string;
  paymentMethod: string;
  paymentStatus?: "pending_verification" | "paid" | "rejected" | "cod_pending" | string;
  paymentDetails?: PaymentDetails | null;
  courierName?: string;
  courierTrackingId?: string;
  courierTrackingUrl?: string;
  items: OrderItem[];
  subtotal: number;
  shipping: number;
  total: number;
  status: "Pending Processing" | "Confirmed" | "Dispatched" | "Out for Delivery" | "Delivered" | "Cancelled" | string;
  trackingSteps?: TrackingStep[];
  adminSeen?: boolean;
  adminSeenAt?: string | null;
  createdAt: string;
  ip?: string;
};
