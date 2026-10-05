import { useLanguage } from '../context/LanguageContext.tsx'
import ErrorBoundary from './ErrorBoundary.tsx'

interface Certificate {
  file: string
  name?: string
  title?: string
  issuer: string
  year?: string | number
}

interface PdfViewerModalContentProps {
  cert: Certificate | null
  onClose: () => void
}

interface PdfViewerModalProps {
  cert: Certificate | null
  onClose: () => void
}

/**
 * Shared PDF Viewer Modal Component
 * Used by Experience.jsx and PersonalDev.jsx to display PDF certificates
 * 
 * @param {Object} cert - Certificate object with file, name/title, issuer, and optional year
 * @param {Function} onClose - Callback function to close the modal
 */
function PdfViewerModalContent({ cert, onClose }: PdfViewerModalContentProps) {
  const { t } = useLanguage()
  if (!cert) return null;

  // Support both 'name' (PersonalDev) and 'title' (Experience) properties
  const certName = cert.name || cert.title
  const certYear = cert.year ? ` (${cert.year})` : ''

  const pdfUrl = `${cert.file}#toolbar=0&navpanes=0&scrollbar=1`;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-md animate-fade-in"
      onClick={onClose}
    >
      <div
        className="relative w-full max-w-4xl h-[85vh] bg-white border border-slate-200 rounded-2xl flex flex-col overflow-hidden shadow-2xl"
        onClick={(e) => e.stopPropagation()}
        onContextMenu={(e) => e.preventDefault()}
      >
        {/* Header Modal */}
        <div className="flex items-center justify-between p-4 border-b border-slate-200 bg-slate-50">
          <div className="flex flex-col">
            <h3 className="text-sm font-bold text-[#1F3A5F]">{certName}</h3>
            <p className="text-xs text-slate-500">{t('Issued by ')}{cert.issuer}{certYear}</p>
          </div>

          <button
            onClick={onClose}
            className="p-2 text-slate-600 hover:text-[#1F3A5F] bg-white hover:bg-slate-100 border border-slate-200 rounded-xl transition-all duration-200 flex items-center gap-1.5 text-xs font-semibold shadow-xs cursor-pointer"
          >
            <span>{t('Close')}</span>
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        {/* PDF Viewer Container */}
        <div className="relative flex-1 w-full h-full bg-slate-100">
          <iframe
            src={pdfUrl}
            className="w-full h-full border-none"
            title={certName}
          />
        </div>
      </div>
    </div>
  )
}

/**
 * PDF Viewer Modal with Error Boundary
 * Wraps the PDF viewer content with error handling
 */
function PdfViewerModal({ cert, onClose }: PdfViewerModalProps) {
  return (
    <ErrorBoundary
      title="PDF Preview Error"
      message="Unable to load the PDF certificate. The file may be missing or corrupted."
      fallback={(error, errorInfo) => (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-md animate-fade-in"
          onClick={onClose}
        >
          <div className="relative w-full max-w-md bg-white border border-slate-200 rounded-2xl p-6 shadow-2xl text-center">
            <div className="w-16 h-16 mx-auto mb-4 bg-red-100 rounded-full flex items-center justify-center">
              <svg className="w-8 h-8 text-red-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
              </svg>
            </div>
            <h3 className="text-lg font-bold text-[#1F3A5F] mb-2">PDF Preview Error</h3>
            <p className="text-sm text-slate-600 mb-4">Unable to load the PDF certificate. The file may be missing or corrupted.</p>
            <button
              onClick={onClose}
              className="px-4 py-2 bg-[#1F3A5F] text-white text-sm font-semibold rounded-xl hover:bg-[#3D5A80] transition-colors cursor-pointer"
            >
              Close
            </button>
          </div>
        </div>
      )}
    >
      <PdfViewerModalContent cert={cert} onClose={onClose} />
    </ErrorBoundary>
  )
}

export default PdfViewerModal