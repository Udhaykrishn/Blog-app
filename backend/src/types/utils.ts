export interface ClerkWebhookEvent<T = any> {
  data: T;
  type: string;
  object: "event";
}

export interface ClerkUserCreatedEvent {
  id: string;
  email_addresses: Array<{
    email_address: string;
    id: string;
  }>;
  first_name?: string;
  last_name?: string;
  image_url?: string;
  public_metadata?: any;
  private_metadata?: any;
  object: "user";
}
