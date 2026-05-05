'use client';

import { useState } from 'react';
import { Heart } from 'lucide-react';
import { motion } from 'framer-motion';
import toast from 'react-hot-toast';
import { formatDistanceToNow } from 'date-fns';

interface VibeCardProps {
  id: number;
  content: string;
  created_at: string;
  likes: number;
  onLike: () => void;
}

export default function VibeCard({
  id,
  content,
  created_at,
  likes,
  onLike,
}: VibeCardProps) {
  const [likeCount, setLikeCount] = useState(likes);
  const [isLiked, setIsLiked] = useState(false);

  const handleLike = async () => {
    const previousLikeCount = likeCount;
    const previousIsLiked = isLiked;

    setIsLiked(!isLiked);
    setLikeCount((prev) => prev + 1);
    toast.success('Liked!');

    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/api/vibes/${id}/like`,
        {
          method: 'PATCH',
          headers: {
            'Content-Type': 'application/json',
          },
          credentials: 'include',
        }
      );

      if (!response.ok) {
        throw new Error('Failed to like vibe');
      }

      onLike();
    } catch (err) {
      setIsLiked(previousIsLiked);
      setLikeCount(previousLikeCount);
      toast.error('Something went wrong');
    }
  };

  const formatDate = (dateString: string) => {
    try {
      return formatDistanceToNow(new Date(dateString), {
        addSuffix: true,
      });
    } catch {
      return 'unknown time';
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className="ultra-dark-card p-6 mb-5 hover:border-[#262626] shadow-lg transition-all duration-300"
    >
      <p className="text-white text-base leading-relaxed mb-6 text-wrap-safe">{content}</p>

      <div className="flex items-center justify-between">
        <span className="text-sm text-gray-500">{formatDate(created_at)}</span>

        <motion.button
          onClick={handleLike}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.95 }}
          className={`flex items-center gap-2 px-4 py-2 rounded-xl transition-all duration-200 ${
            isLiked
              ? 'bg-red-950/40 text-red-400 border border-red-900/50'
              : 'text-gray-400 hover:bg-red-950/20 hover:text-red-400 hover:border-red-900/30 border border-transparent'
          }`}
        >
          <motion.div
            animate={isLiked ? { scale: [1, 1.3, 1] } : {}}
            transition={{ duration: 0.3 }}
          >
            <Heart
              size={18}
              className={isLiked ? 'fill-current' : ''}
            />
          </motion.div>
          <span className="text-sm font-medium">{likeCount}</span>
        </motion.button>
      </div>
    </motion.div>
  );
}
