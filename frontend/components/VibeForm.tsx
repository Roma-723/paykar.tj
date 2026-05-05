'use client';

import { useState } from 'react';
import { Send } from 'lucide-react';
import { motion } from 'framer-motion';

interface VibeFormProps {
  onSuccess: () => void;
}

export default function VibeForm({ onSuccess }: VibeFormProps) {
  const [content, setContent] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [isFocused, setIsFocused] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!content.trim()) return;

    setLoading(true);
    setError('');

    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/vibes`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ content }),
        credentials: 'include',
      });

      if (!response.ok) {
        throw new Error('Failed to post vibe');
      }
      setContent('');
      onSuccess();
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Something went wrong');
    } finally {
      setLoading(false);
    }
  };

  return (
    <motion.form
      onSubmit={handleSubmit}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className="relative mb-16"
    >
      <motion.div
        animate={isFocused ? { y: -8 } : { y: 0 }}
        transition={{ duration: 0.3, ease: 'easeOut' }}
        className={`relative rounded-3xl p-8 transition-all duration-500 ${
          isFocused
            ? 'laser-glow-border bg-gradient-to-b from-[#0f0f0f] to-[#000000]'
            : 'border border-[#1a1a1a] bg-[#0a0a0a]'
        } ${isFocused ? 'shadow-2xl' : 'shadow-lg'}`}
        style={
          isFocused
            ? {
                perspective: '1000px',
                transform: 'perspective(1200px) rotateX(3deg)',
              }
            : {}
        }
      >
        <textarea
          value={content}
          onChange={(e) => setContent(e.target.value.slice(0, 280))}
          maxLength={280}
          placeholder="Share your vibe..."
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          className={`w-full bg-gradient-to-b rounded-2xl px-6 py-4 focus:outline-none resize-none text-lg text-white placeholder-gray-600 transition-all duration-300 ${
            isFocused
              ? 'from-[#1a1a1a] to-[#0f0f0f] ring-2 ring-violet-500/30'
              : 'from-[#0f0f0f] to-[#000000] border border-[#1a1a1a]'
          }`}
          rows={5}
        />

        <div className="flex justify-between items-center mt-6 gap-4">
          <span
            className={`text-sm transition-colors duration-300 ${
              isFocused ? 'text-violet-400' : 'text-gray-500'
            }`}
          >
            {content.length}/280
          </span>

          <motion.button
            type="submit"
            disabled={!content.trim() || loading}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className={`text-white rounded-xl px-8 py-3 disabled:opacity-50 disabled:cursor-not-allowed transition-all flex items-center gap-2 text-sm font-semibold ${
              isFocused
                ? 'gradient-button-pulse'
                : 'bg-gradient-to-r from-violet-600 to-purple-600 hover:from-violet-500 hover:to-purple-500 shadow-lg'
            }`}
          >
            <Send size={18} />
            {loading ? 'Posting...' : 'Post'}
          </motion.button>
        </div>

        {error && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-red-400 text-sm mt-4 bg-red-950/20 border border-red-900/40 rounded-xl px-4 py-3"
          >
            {error}
          </motion.div>
        )}
      </motion.div>
    </motion.form>
  );
}
