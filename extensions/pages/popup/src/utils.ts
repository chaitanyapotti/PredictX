export const generateJWTToken = async ({ login_type, login_email, public_address }: { login_type: string, login_email: string, public_address: string }) => {
  try {
    const response = await fetch('/api/user', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        login_type,
        login_email,
        public_address,
      }),
    });

    if (!response.ok) {
      throw new Error(`API request failed: ${response.status}`);
    }

    return await response.json();
  } catch (error) {
    console.error('Failed to submit user data:', error);
    throw error;
  }
};