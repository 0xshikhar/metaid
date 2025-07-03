import React, { ReactNode } from 'react';

interface ModalComponentProps {
    isOpen: boolean;
    onClose: () => void;
    title: string;
    currentStep?: number;
    totalSteps?: number;
    showNavigation?: boolean;
    children: ReactNode;
}

const ModalComponent: React.FC<ModalComponentProps> = ({
    isOpen,
    onClose,
    title,
    currentStep,
    totalSteps,
    showNavigation = true,
    children
}) => {
    if (!isOpen) return null;

    return (
        <div className="modal-overlay" onClick={onClose}>
            <div className="modal-container" onClick={(e) => e.stopPropagation()}>
                <div className="modal-header">
                    <h2>{title}</h2>
                    <button className="close-button" onClick={onClose}>×</button>
                </div>

                {(currentStep && totalSteps) && (
                    <div className="modal-progress">
                        <div className="step-indicator">
                            <span>Step {currentStep} of {totalSteps}</span>
                        </div>
                        <div className="progress-bar">
                            <div
                                className="progress"
                                style={{ width: `${(currentStep / totalSteps) * 100}%` }}
                            ></div>
                        </div>
                    </div>
                )}

                <div className="modal-content">
                    {children}
                </div>

                {showNavigation && (
                    <div className="modal-footer">
                        <button
                            className="modal-button secondary"
                            onClick={onClose}
                        >
                            Cancel
                        </button>
                        <button className="modal-button primary">
                            Continue
                        </button>
                    </div>
                )}
            </div>

            <style jsx>{`
        .modal-overlay {
          position: fixed;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background-color: rgba(0, 0, 0, 0.5);
          display: flex;
          justify-content: center;
          align-items: center;
          z-index: 1000;
          padding: 20px;
        }
        
        .modal-container {
          background-color: white;
          border-radius: 8px;
          box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
          width: 100%;
          max-width: 600px;
          max-height: 90vh;
          overflow-y: auto;
          display: flex;
          flex-direction: column;
        }
        
        .modal-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: 16px 20px;
          border-bottom: 1px solid #f0f0f0;
        }
        
        .modal-header h2 {
          margin: 0;
          font-size: 18px;
          font-weight: 600;
        }
        
        .close-button {
          background: none;
          border: none;
          font-size: 24px;
          cursor: pointer;
          color: #666;
        }
        
        .modal-progress {
          padding: 10px 20px;
          border-bottom: 1px solid #f0f0f0;
        }
        
        .step-indicator {
          font-size: 14px;
          margin-bottom: 8px;
          color: #666;
        }
        
        .progress-bar {
          height: 6px;
          background-color: #f0f0f0;
          border-radius: 3px;
          overflow: hidden;
        }
        
        .progress {
          height: 100%;
          background-color: #1976d2;
          transition: width 0.3s ease;
        }
        
        .modal-content {
          padding: 20px;
          flex-grow: 1;
          overflow-y: auto;
        }
        
        .modal-footer {
          padding: 16px 20px;
          border-top: 1px solid #f0f0f0;
          display: flex;
          justify-content: flex-end;
          gap: 12px;
        }
        
        .modal-button {
          padding: 8px 16px;
          border-radius: 4px;
          font-weight: 500;
          cursor: pointer;
          border: none;
        }
        
        .primary {
          background-color: #1976d2;
          color: white;
        }
        
        .secondary {
          background-color: #f5f5f5;
          color: #333;
        }
      `}</style>
        </div>
    );
};

export default ModalComponent;
