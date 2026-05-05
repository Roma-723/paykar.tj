'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Toaster } from 'react-hot-toast';
import VibeForm from '@/components/VibeForm';
import VibeCard from '@/components/VibeCard';

interface Vibe {
  id: number;
  content: string;
  created_at: string;
  likes: number;
}

export default function Home() {
  const [vibes, setVibes] = useState<Vibe[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  const fetchVibes = async () => {
    setLoading(true);
    setError('');
    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/vibes`, {
        credentials: 'include',
      });

      if (!response.ok) {
        throw new Error('Failed to fetch vibes');
      }

      const data = await response.json();
      setVibes(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Something went wrong');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchVibes();
  }, []);

  const handleSuccess = () => {
    fetchVibes();
  };

  const handleLike = () => {
    fetchVibes();
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2,
      },
    },
  };

  return (
    <>
      <Toaster
        position="top-center"
        reverseOrder={false}
        toastOptions={{
          style: {
            background: '#0f0f0f',
            color: '#fff',
            border: '1px solid #1a1a1a',
            borderRadius: '12px',
          },
        }}
      />
      <main className="min-h-screen bg-black">
        <div className="max-w-[800px] mx-auto px-4 py-8 md:px-8 md:py-20">
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="mb-20"
          >
            <h1 className="text-7xl md:text-8xl font-black mb-4 tracking-tighter">
              <motion.span
                className="gradient-text-premium"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.2, duration: 0.8 }}
              >
                VibeCheck
              </motion.span>
            </h1>
            <p className="text-xl text-gray-400 font-light tracking-wide">
              Share your vibes with the world
            </p>
          </motion.div>

          <VibeForm onSuccess={handleSuccess} />

          {error && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-red-950/20 border border-red-900/40 text-red-400 rounded-2xl p-5 mb-8 text-sm"
            >
              {error}
            </motion.div>
          )}

          {loading ? (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-center py-20"
            >
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 2, repeat: Infinity, ease: 'linear' }}
                className="w-8 h-8 border-2 border-gray-700 border-t-violet-500 rounded-full mx-auto mb-4"
              />
              <p className="text-gray-500">Loading vibes...</p>
            </motion.div>
          ) : vibes.length === 0 ? (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3 }}
              className="text-center py-20"
            >
              <p className="text-gray-500 text-lg">No vibes yet. Be the first to share!</p>
            </motion.div>
          ) : (
            <motion.div
              variants={containerVariants}
              initial="hidden"
              animate="visible"
              className="space-y-6"
            >
              {vibes.map((vibe) => (
                <VibeCard
                  key={vibe.id}
                  id={vibe.id}
                  content={vibe.content}
                  created_at={vibe.created_at}
                  likes={vibe.likes}
                  onLike={handleLike}
                />
              ))}
            </motion.div>
          )}
        </div>
      </main>
    </>
  );
}
