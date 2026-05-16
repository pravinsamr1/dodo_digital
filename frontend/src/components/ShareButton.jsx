import React, { useState } from 'react';
import { Share2, Check } from 'lucide-react';

const ShareButton = ({ title, text, url, className, iconSize = 16 }) => {
  const [copied, setCopied] = useState(false);

  const handleShare = async (e) => {
    e.preventDefault();
    e.stopPropagation();
    
    const shareUrl = url || window.location.href;
    const shareTitle = title || document.title;
    const shareText = text || `Check out ${shareTitle} on Dodo Digital Academy!`;

    const shareData = {
      title: shareTitle,
      text: shareText,
      url: shareUrl,
    };

    try {
      if (navigator.share) {
        await navigator.share(shareData);
      } else {
        throw new Error('Web Share API not supported');
      }
    } catch (err) {
      if (err.name !== 'AbortError') {
        try {
          await navigator.clipboard.writeText(shareUrl);
          setCopied(true);
          setTimeout(() => setCopied(false), 2000);
        } catch (clipboardErr) {
          console.error('Failed to copy', clipboardErr);
        }
      }
    }
  };

  return (
    <button
      type="button"
      onClick={handleShare}
      aria-label={`Share ${title || 'item'}`}
      title="Share or Copy Link"
      className={className || "flex h-9 w-9 items-center justify-center rounded-full bg-white/90 text-slate-700 shadow-sm backdrop-blur-sm transition-all hover:bg-[#125fb9] hover:text-white"}
    >
      {copied ? <Check size={iconSize} className="text-green-500" /> : <Share2 size={iconSize} />}
    </button>
  );
};

export default ShareButton;
