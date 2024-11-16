declare namespace Express {
  interface Request {
    user: {
      userId: string;
      public_address: string;
      login_type: string;
    }
  }
}
