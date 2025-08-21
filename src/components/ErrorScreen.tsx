import React from 'react';

interface ErrorScreenProps {
  message: string;
  onRetry?: () => void;
}

export const ErrorScreen: React.FC<ErrorScreenProps> = ({ message, onRetry }) => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-red-800 via-red-700 to-red-900 flex items-center justify-center p-4">
      <div className="text-center max-w-md">
        {/* Error Icon */}
        <div className="mb-8">
          <div className="w-20 h-20 bg-white/20 rounded-full flex items-center justify-center mx-auto backdrop-blur-sm">
            <span className="text-4xl text-white">⚠️</span>
          </div>
        </div>

        {/* Error Message */}
        <h2 className="text-2xl font-bold text-white mb-4">
          Oops! Something went wrong
        </h2>
        
        <p className="text-white/80 mb-8 leading-relaxed">
          {message}
        </p>

        {/* Retry Button */}
        {onRetry && (
          <button
            onClick={onRetry}
            className="bg-white/20 hover:bg-white/30 backdrop-blur-sm text-white px-6 py-3 rounded-xl font-medium transition-all duration-200 border border-white/20 hover:border-white/40 shadow-lg"
          >
            Try Again
          </button>
        )}

        {/* Additional Help */}
        <div className="mt-8 p-4 bg-white/10 rounded-xl border border-white/20 backdrop-blur-sm">
          <p className="text-white/70 text-sm">
            Make sure the dataset file is available and properly formatted.
          </p>
        </div>
      </div>
    </div>
  );
};
