import { useState } from "react";
import {
  TwitterShareButton,
  TwitterIcon,
  LinkedinShareButton,
  LinkedinIcon,
  FacebookShareButton,
  FacebookIcon,
  WhatsappShareButton,
  WhatsappIcon,
} from "react-share";

interface ShareModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const ShareModal = ({ isOpen, onClose }: ShareModalProps) => {
  const [copied, setCopied] = useState(false);
  const shareUrl = window.location.href;
  const title =
    "Check out my collaborative document on SyncScribe! Made with ❤️ by Akshil Thumar";

  const handleCopyLink = () => {
    navigator.clipboard.writeText(shareUrl);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/20 backdrop-blur-md flex items-center justify-center z-50">
      <div
        className="relative w-full max-w-md p-6 rounded-3xl border border-white/60 shadow-2xl"
        style={{
          background:
            "linear-gradient(135deg, rgba(255,255,255,0.75) 60%, rgba(255,255,255,0.45) 100%)",
          boxShadow:
            "0 8px 32px 0 rgba(31, 38, 135, 0.18), 0 1.5px 8px 0 rgba(255,255,255,0.25) inset",
          backdropFilter: "blur(18px)",
          WebkitBackdropFilter: "blur(18px)",
        }}
      >
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-xl font-semibold text-gray-900">
            Share Document
          </h2>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700 transition-colors"
          >
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
        </div>

        {/* Copy Link Section */}
        <div className="mb-6">
          <div className="flex items-center gap-2 bg-white/60 backdrop-blur-sm rounded-xl p-3 border border-white/50 shadow-sm">
            <input
              type="text"
              value={shareUrl}
              readOnly
              className="flex-1 bg-transparent text-sm text-gray-700 outline-none"
            />
            <button
              onClick={handleCopyLink}
              className="px-4 py-2 glass-btn-bg text-blue-700 rounded-lg text-sm font-medium border border-blue-200 transition-all
                hover:bg-white/80 active:bg-white/90 focus:ring-2 focus:ring-blue-200 focus:outline-none"
            >
              {copied ? "Copied!" : "Copy"}
            </button>
          </div>
        </div>

        {/* Social Share Buttons */}
        <div className="space-y-4">
          <h3 className="text-sm font-medium text-gray-700">Share via</h3>
          <div className="flex gap-4">
            <TwitterShareButton url={shareUrl} title={title}>
              <div className="glass-btn-bg p-2 rounded-full border border-white/50 hover:bg-white/80 transition-all shadow-sm">
                <TwitterIcon size={32} round />
              </div>
            </TwitterShareButton>
            <LinkedinShareButton url={shareUrl} title={title}>
              <div className="glass-btn-bg p-2 rounded-full border border-white/50 hover:bg-white/80 transition-all shadow-sm">
                <LinkedinIcon size={32} round />
              </div>
            </LinkedinShareButton>
            <FacebookShareButton url={shareUrl} title={title}>
              <div className="glass-btn-bg p-2 rounded-full border border-white/50 hover:bg-white/80 transition-all shadow-sm">
                <FacebookIcon size={32} round />
              </div>
            </FacebookShareButton>
            <WhatsappShareButton url={shareUrl} title={title}>
              <div className="glass-btn-bg p-2 rounded-full border border-white/50 hover:bg-white/80 transition-all shadow-sm">
                <WhatsappIcon size={32} round />
              </div>
            </WhatsappShareButton>
          </div>
        </div>
      </div>
    </div>
  );
};
