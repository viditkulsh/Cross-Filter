import React from 'react';

interface NotificationProps {
  type: 'success' | 'error' | 'warning' | 'info';
  title: string;
  message: string;
  onClose?: () => void;
  duration?: number; // Auto-close duration in milliseconds
}

export const Notification: React.FC<NotificationProps> = ({ 
  type, 
  title, 
  message, 
  onClose,
  duration = 5000 
}) => {
  const [isVisible, setIsVisible] = React.useState(true);

  React.useEffect(() => {
    if (duration > 0) {
      const timer = setTimeout(() => {
        setIsVisible(false);
        if (onClose) {
          setTimeout(onClose, 300); // Wait for fade out animation
        }
      }, duration);

      return () => clearTimeout(timer);
    }
  }, [duration, onClose]);

  const typeStyles = {
    success: {
      bg: 'from-green-500 to-emerald-600',
      icon: '✓',
      border: 'border-green-200'
    },
    error: {
      bg: 'from-red-500 to-red-600',
      icon: '✕',
      border: 'border-red-200'
    },
    warning: {
      bg: 'from-yellow-500 to-orange-500',
      icon: '⚠',
      border: 'border-yellow-200'
    },
    info: {
      bg: 'from-blue-500 to-blue-600',
      icon: 'ℹ',
      border: 'border-blue-200'
    }
  };

  const style = typeStyles[type];

  if (!isVisible) return null;

  return (
    <div className={`fixed top-4 right-4 z-50 max-w-sm animate-fade-in ${isVisible ? 'opacity-100' : 'opacity-0'} transition-opacity duration-300`}>
      <div className={`bg-gradient-to-r ${style.bg} rounded-xl shadow-2xl ${style.border} border overflow-hidden`}>
        <div className="p-4">
          <div className="flex items-start">
            <div className="flex-shrink-0">
              <div className="w-8 h-8 bg-white/20 rounded-full flex items-center justify-center text-white font-bold">
                {style.icon}
              </div>
            </div>
            <div className="ml-3 flex-1">
              <h3 className="text-sm font-bold text-white">
                {title}
              </h3>
              <p className="text-sm text-white/90 mt-1 leading-relaxed">
                {message}
              </p>
            </div>
            {onClose && (
              <button
                onClick={() => {
                  setIsVisible(false);
                  setTimeout(onClose, 300);
                }}
                className="ml-2 text-white/80 hover:text-white transition-colors duration-200"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            )}
          </div>
        </div>
        {/* Progress bar for auto-close */}
        {duration > 0 && (
          <div className="h-1 bg-white/20">
            <div 
              className="h-full bg-white/40 transition-all ease-linear"
              style={{ 
                width: '100%',
                animation: `shrink ${duration}ms linear forwards`
              }}
            />
          </div>
        )}
      </div>
    </div>
  );
};

// Add the shrink animation to your CSS
const style = document.createElement('style');
style.textContent = `
  @keyframes shrink {
    from { width: 100%; }
    to { width: 0%; }
  }
`;
document.head.appendChild(style);
