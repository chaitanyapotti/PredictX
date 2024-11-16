import { Router } from 'express';
import { supabaseDBClient } from '../config/supabase';
import { verifyToken } from '../middleware/auth';

const router = Router();

// Get all questions for the authenticated user
router.get('/', verifyToken, async (req, res) => {
  try {
    const { data: questions, error } = await supabaseDBClient
      .from('questions')
      .select('*')
      .eq('user_id', req.user.userId)
      .order('created_at', { ascending: false });

    if (error) throw error;
    res.json(questions);
  } catch (error) {
    console.error('Error fetching questions:', error);
    res.status(500).json({ error: 'Failed to fetch questions' });
  }
});

// Create a new question
router.post('/', verifyToken, async (req, res) => {
  try {
    const { question_text, post_url, user_answer, result, chain_id } = req.body;
    
    if (!question_text || !post_url || !user_answer || !result || !chain_id) {
      return res.status(400).json({ error: 'All fields are required' });
    }

    const { data, error } = await supabaseDBClient
      .from('questions')
      .insert([
        {
          question_text,
          post_url,
          user_answer,
          result,
          chain_id,
          user_id: req.user.userId,
        }
      ])
      .select()
      .single();

    if (error) throw error;
    res.status(201).json(data);
  } catch (error) {
    console.error('Error creating question:', error);
    res.status(500).json({ error: 'Failed to create question' });
  }
});

export default router;
