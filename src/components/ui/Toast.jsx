import { useApp } from '../../context/AppContext';
import { X, CheckCircle, AlertCircle, AlertTriangle, Info } from 'lucide-react';

const iconMap = {
  success: CheckCircle,
  error: AlertCircle,
  warning: AlertTriangle,
  info: Info,
};

const colorMap = {
  success: 'var(--success)',
  error: 'var(--danger)',
  warning: 'var(--warning)',
  info: 'var(--info)',
};

export default function Toast() {
  const { toasts } = useApp();

  if (toasts.length === 0) return null;

  return (
    <div className="toast-container">
      {toasts.map(toast => {
        const Icon = iconMap[toast.type] || CheckCircle;
        return (
          <div key={toast.id} className={`toast toast-${toast.type}`}>
            <Icon size={18} style={{ color: colorMap[toast.type], flexShrink: 0 }} />
            <span>{toast.message}</span>
          </div>
        );
      })}
    </div>
  );
}
