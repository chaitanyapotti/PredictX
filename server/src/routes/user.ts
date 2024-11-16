import { Router } from 'express';
import { supabaseDBClient } from '../config/supabase';
import * as jwt from 'jsonwebtoken';

// JWT secret key should be in environment variables
const JWT_SECRET = process.env.JWT_SECRET || 'your-secret-key';

const router = Router();

// Create a new todo
router.post('/', async (req, res) => {
  try {
    const { login_email, login_type, public_address } = req.body;
    if (!public_address) {
      res.status(400).json({ error: 'Public address is required' });
      return;
    }

    let { data: newUser } = await supabaseDBClient
      .from('todos')
      .select('*')
      .eq('public_address', public_address)
      .single();

    if (!newUser) {
      const { data, error } = await supabaseDBClient
        .from('user')
        .insert([{ login_email, login_type, public_address }])
        .select();

      if (error) throw error;
      if (data) newUser = data;
    }

    if (newUser) {
      const token = jwt.sign(
        { 
          userId: newUser.id,
          public_address: public_address,
          login_type: login_type,
        },
        JWT_SECRET,
        { expiresIn: '24h' }
      );

      res.status(201).json({ token });
      return;
    }

  } catch (error) {
    console.log("Error creating user", error);
    res.status(500).json({ error: 'Error creating new user' });
  }
});

export default router; 