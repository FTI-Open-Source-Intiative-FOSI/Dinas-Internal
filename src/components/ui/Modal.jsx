import { X } from 'lucide-react';

export default function Modal({ isOpen = true, onClose, title, children, size, footer }) {
  if (isOpen === false) return null;

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className={`modal ${size === 'lg' ? 'modal-lg' : ''}`} onClick={e => e.stopPropagation()}>
        <div className="modal-header">
          <h3>{title}</h3>
          <button className="btn-icon btn-ghost" onClick={onClose}>
            <X size={18} />
          </button>
        </div>
        <div className="modal-body">
          {children}
        </div>
        {footer && (
          <div className="modal-footer">
            {footer}
          </div>
        )}
      </div>
    </div>
  );
}
