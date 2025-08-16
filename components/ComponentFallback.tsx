import React from 'react';

interface ComponentFallbackProps {
  componentName: string;
  error?: string;
  onRetry?: () => void;
}

export const ComponentFallback: React.FC<ComponentFallbackProps> = ({ 
  componentName, 
  error, 
  onRetry 
}) => {
  return (
    <div className="p-8 text-center bg-white rounded-lg border border-blue1/20 shadow-md">
      <div className="w-16 h-16 mx-auto mb-4 bg-gradient-to-br from-primary to-blue2 rounded-full flex items-center justify-center">
        <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      </div>
      
      <h3 className="text-lg font-semibold text-gray-900 mb-2">
        Component Loading Issue
      </h3>
      
      <p className="text-gray-600 mb-4">
        The <code className="bg-gray-100 px-2 py-1 rounded text-sm">{componentName}</code> component 
        could not be loaded properly.
      </p>
      
      {error && (
        <details className="text-left mb-4">
          <summary className="text-sm text-gray-500 cursor-pointer">Error Details</summary>
          <pre className="text-xs text-red-600 mt-2 p-2 bg-red-50 rounded overflow-auto">
            {error}
          </pre>
        </details>
      )}
      
      <div className="flex gap-3 justify-center">
        {onRetry && (
          <button
            onClick={onRetry}
            className="px-4 py-2 bg-primary text-white rounded-lg hover:bg-blue2 transition-colors"
          >
            Retry
          </button>
        )}
        
        <button
          onClick={() => window.location.reload()}
          className="px-4 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition-colors"
        >
          Reload Page
        </button>
      </div>
      
      <div className="mt-6 pt-4 border-t border-gray-200">
        <div className="text-lg font-bold bg-gradient-to-r from-primary to-blue2 bg-clip-text text-transparent">
          EduMall
        </div>
        <div className="text-sm text-primary">India Ka Edu Bazaar</div>
      </div>
    </div>
  );
};

export default ComponentFallback;