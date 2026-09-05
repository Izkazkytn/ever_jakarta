import { useState, useRef, useCallback, useEffect } from 'react';
import { Camera, Download, RefreshCw, Sparkles, Image as ImageIcon, Trash2, Video, X, QrCode, History } from 'lucide-react';
import { toPng } from 'html-to-image';
import Webcam from 'react-webcam';
import { QRCodeSVG } from 'qrcode.react';

const CLOUDINARY_CLOUD_NAME = 'fmtaiwpp';
const CLOUDINARY_UPLOAD_PRESET = 'ever-jakarta';

const FRAME_OPTIONS = [
  { id: 1, name: 'Evan Frame', tag: 'Dark Red & Black', image: '/frames/evanframe.png' },
];

export default function EVERFrame() {
  const [photos, setPhotos] = useState([null, null, null, null]);
  const [selectedFrame, setSelectedFrame] = useState(FRAME_OPTIONS[0]);
  const [isDownloading, setIsDownloading] = useState(false);
  const photoStripRef = useRef(null);

  // State Kamera
  const [activeSlotForCamera, setActiveSlotForCamera] = useState(null);
  const [countdown, setCountdown] = useState(null);
  const webcamRef = useRef(null);

  // State QR Code & Upload
  const [qrModalOpen, setQrModalOpen] = useState(false);
  const [uploadedImageUrl, setUploadedImageUrl] = useState('');
  const [isUploading, setIsUploading] = useState(false);

  // State Riwayat Foto (Auto-Save)
  const [historyList, setHistoryList] = useState([]);
  const [historyModalOpen, setHistoryModalOpen] = useState(false);

  const videoConstraints = {
    width: 720,
    height: 960,
    facingMode: 'user',
  };

  // Load Riwayat dari LocalStorage saat pertama kali buka
  useEffect(() => {
    const savedHistory = localStorage.getItem('ever_everframe_history');
    if (savedHistory) {
      try {
        setHistoryList(JSON.parse(savedHistory));
      } catch (e) {
        console.error('Failed to parse history:', e);
      }
    }
  }, []);

  const mirrorImage = (base64Image) => {
    return new Promise((resolve) => {
      const img = new Image();
      img.src = base64Image;
      img.onload = () => {
        const canvas = document.createElement('canvas');
        canvas.width = img.width;
        canvas.height = img.height;
        const ctx = canvas.getContext('2d');
        ctx.translate(canvas.width, 0);
        ctx.scale(-1, 1);
        ctx.drawImage(img, 0, 0);
        resolve(canvas.toDataURL('image/jpeg'));
      };
    });
  };

  const capturePhoto = useCallback(async () => {
    if (webcamRef.current && activeSlotForCamera !== null) {
      const imageSrc = webcamRef.current.getScreenshot();
      if (imageSrc) {
        const mirroredSrc = await mirrorImage(imageSrc);
        setPhotos((prev) => {
          const updated = [...prev];
          updated[activeSlotForCamera] = mirroredSrc;
          return updated;
        });
      }
      setActiveSlotForCamera(null);
      setCountdown(null);
    }
  }, [activeSlotForCamera]);

  const startCameraCapture = () => {
    setCountdown(3);
    const timer = setInterval(() => {
      setCountdown((prev) => {
        if (prev === 1) {
          clearInterval(timer);
          capturePhoto();
          return null;
        }
        return prev - 1;
      });
    }, 1000);
  };

  const handleRemovePhoto = (index) => {
    const newPhotos = [...photos];
    newPhotos[index] = null;
    setPhotos(newPhotos);
    setUploadedImageUrl('');
  };

  const handleResetAll = () => {
    setPhotos([null, null, null, null]);
    setUploadedImageUrl('');
  };

  // Fungsi simpan ke Riwayat LocalStorage
  const saveToHistory = (url) => {
    const newItem = {
      id: Date.now(),
      url: url,
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    };
    const updatedHistory = [newItem, ...historyList];
    setHistoryList(updatedHistory);
    localStorage.setItem('ever_everframe_history', JSON.stringify(updatedHistory));
  };

  // Download Lokal PNG
  const handleDownload = async () => {
    if (!photoStripRef.current) return;
    setIsDownloading(true);

    try {
      const dataUrl = await toPng(photoStripRef.current, { cacheBust: true, quality: 0.98 });
      const link = document.createElement('a');
      link.download = `EVER-EVERFrame-Strip-${Date.now()}.png`;
      link.href = dataUrl;
      link.click();
    } catch (err) {
      console.error('Gagal mengunduh foto strip:', err);
      alert('Gagal mengunduh foto strip. Silakan coba lagi.');
    } finally {
      setIsDownloading(false);
    }
  };

  // Upload ke Cloudinary + Auto Save ke Riwayat
  const uploadAndGetURL = async () => {
    if (!photoStripRef.current) return null;
    setIsUploading(true);

    try {
      const dataUrl = await toPng(photoStripRef.current, { cacheBust: true, quality: 0.95 });
      const formData = new FormData();
      formData.append('file', dataUrl);
      formData.append('upload_preset', CLOUDINARY_UPLOAD_PRESET);

      const response = await fetch(
        `https://api.cloudinary.com/v1_1/${CLOUDINARY_CLOUD_NAME}/image/upload`,
        {
          method: 'POST',
          body: formData,
        }
      );

      const result = await response.json();

      if (result.secure_url) {
        setUploadedImageUrl(result.secure_url);
        saveToHistory(result.secure_url);
        return result.secure_url;
      } else {
        alert('Gagal mengunggah ke Cloudinary.');
        return null;
      }
    } catch (err) {
      console.error('Upload error:', err);
      alert('Terjadi kesalahan saat mengunggah.');
      return null;
    } finally {
      setIsUploading(false);
    }
  };

  // Generate QR Code
  const handleGenerateQR = async () => {
    if (uploadedImageUrl) {
      setQrModalOpen(true);
      return;
    }

    const url = await uploadAndGetURL();
    if (url) {
      setQrModalOpen(true);
    }
  };

  const isAllUploaded = photos.every((photo) => photo !== null);
  const uploadedCount = photos.filter((photo) => photo !== null).length;

  // Auto Upload di Background saat ke-4 foto selesai diambil
  useEffect(() => {
    if (isAllUploaded && !uploadedImageUrl) {
      uploadAndGetURL();
    }
  }, [isAllUploaded]);

  return (
    <div className="space-y-8 max-w-5xl mx-auto pb-12 relative">
      
      {/* HEADER SECTION */}
      <div className="text-center space-y-2 relative">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-brand-primary-soft text-brand-primary text-xs font-semibold">
          <Sparkles size={14} />
          <span>Live Camera Photobooth</span>
        </div>
        <h1 className="text-2xl sm:text-4xl font-bold text-brand-text-main">
          EVER <span className="text-brand-primary">EVERFrame Strip</span>
        </h1>
        <p className="text-brand-text-muted text-xs sm:text-sm max-w-md mx-auto">
          Ambil 4 foto selfie, unduh strip hasil fotomu atau scan via QR Code!
        </p>

        {/* Tombol Riwayat Foto di Pojok Kanan Atas Header */}
        {historyList.length > 0 && (
          <button
            onClick={() => setHistoryModalOpen(true)}
            className="sm:absolute sm:right-0 sm:top-0 mt-3 sm:mt-0 inline-flex items-center gap-1.5 px-3 py-2 rounded-2xl bg-brand-surface border border-brand-border text-xs font-bold text-brand-text-main hover:bg-brand-bg transition-colors shadow-xs"
          >
            <History size={15} className="text-brand-primary" />
            <span>Riwayat Foto ({historyList.length})</span>
          </button>
        )}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        
        {/* KIRI: PREVIEW FRAME STRIP */}
        <div className="lg:col-span-6 flex flex-col items-center justify-center">
          <div className="text-xs font-semibold text-brand-text-muted mb-3 flex items-center gap-1">
            <Camera size={14} />
            <span>Live Photo Strip Preview</span>
          </div>

          <div
            ref={photoStripRef}
            className="w-[220px] sm:w-[250px] relative overflow-hidden rounded-2xl shadow-2xl bg-white"
          >
            <div className="w-full flex flex-col gap-2 p-3 sm:p-4">
              {photos.map((photo, idx) => (
                <div
                  key={idx}
                  className="w-full h-32 sm:h-36 bg-zinc-100 rounded-lg overflow-hidden relative flex items-center justify-center"
                >
                  {photo ? (
                    <img
                      src={photo}
                      alt={`Slot ${idx + 1}`}
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <div className="text-center p-2 text-zinc-400 space-y-1">
                      <ImageIcon size={18} className="mx-auto opacity-40" />
                      <p className="text-[10px] font-medium">Slot #{idx + 1}</p>
                    </div>
                  )}
                </div>
              ))}
            </div>

            <img
              src="/frames/evanframe.png"
              alt="Custom Photoframe Overlay"
              className="absolute inset-0 w-full h-full object-fill pointer-events-none z-10"
            />
          </div>
        </div>

        {/* KANAN: PANEL KONTROL */}
        <div className="lg:col-span-6 space-y-6 bg-brand-surface p-6 rounded-3xl border border-brand-border shadow-xs">
          
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <label className="text-sm font-bold text-brand-text-main">
                Foto Kamera ({uploadedCount}/4)
              </label>
              {uploadedCount > 0 && (
                <button
                  onClick={handleResetAll}
                  className="text-xs text-red-500 hover:underline flex items-center gap-1 font-medium"
                >
                  <Trash2 size={12} />
                  <span>Reset Semua</span>
                </button>
              )}
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1">
              {photos.map((photo, idx) => (
                <div key={idx} className="p-3 rounded-2xl border border-brand-border bg-brand-bg flex items-center justify-between">
                  <span className="text-xs font-semibold text-brand-text-main">Slot #{idx + 1}</span>
                  
                  {photo ? (
                    <button
                      onClick={() => handleRemovePhoto(idx)}
                      className="text-xs text-red-500 hover:bg-red-100 p-1.5 rounded-lg transition-colors flex items-center gap-1"
                      title="Hapus foto"
                    >
                      <Trash2 size={14} />
                      <span>Ulang</span>
                    </button>
                  ) : (
                    <button
                      onClick={() => setActiveSlotForCamera(idx)}
                      className="py-1.5 px-3 bg-brand-primary text-white rounded-xl text-xs font-semibold flex items-center gap-1.5 hover:bg-brand-primary-hover transition-colors shadow-xs active:scale-95"
                    >
                      <Video size={14} />
                      <span>Ambil Foto</span>
                    </button>
                  )}
                </div>
              ))}
            </div>
          </div>

          <div className="space-y-3">
            <label className="text-sm font-bold text-brand-text-main">
              Pilih Warna Strip Frame
            </label>
            
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
              {FRAME_OPTIONS.map((frame) => {
                const isSelected = selectedFrame.id === frame.id;
                return (
                  <button
                    key={frame.id}
                    onClick={() => setSelectedFrame(frame)}
                    className={`p-3 rounded-2xl border text-left flex flex-col justify-between transition-all ${
                      isSelected
                        ? 'border-brand-primary bg-brand-primary-soft/40 shadow-xs'
                        : 'border-brand-border hover:border-brand-primary/50'
                    }`}
                  >
                    <span className="text-xs font-semibold text-brand-text-main">{frame.name}</span>
                    <span className="text-[9px] text-brand-text-muted mt-1">{frame.tag}</span>
                  </button>
                );
              })}
            </div>
          </div>

          <div className="pt-4 border-t border-brand-border space-y-3">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <button
                onClick={handleDownload}
                disabled={!isAllUploaded || isDownloading}
                className={`py-3.5 px-4 rounded-2xl font-bold text-xs sm:text-sm flex items-center justify-center gap-2 shadow-md transition-all ${
                  isAllUploaded && !isDownloading
                    ? 'bg-brand-primary hover:bg-brand-primary-hover text-white shadow-brand-primary/20 active:scale-98 cursor-pointer'
                    : 'bg-zinc-200 text-zinc-400 cursor-not-allowed shadow-none'
                }`}
              >
                {isDownloading ? (
                  <RefreshCw size={16} className="animate-spin" />
                ) : (
                  <Download size={16} />
                )}
                <span>Unduh PNG</span>
              </button>

              <button
                onClick={handleGenerateQR}
                disabled={!isAllUploaded || isUploading}
                className={`py-3.5 px-4 rounded-2xl font-bold text-xs sm:text-sm flex items-center justify-center gap-2 shadow-md transition-all ${
                  isAllUploaded && !isUploading
                    ? 'bg-brand-surface border-2 border-brand-primary text-brand-primary hover:bg-brand-primary-soft/40 active:scale-98 cursor-pointer'
                    : 'bg-zinc-100 border border-zinc-300 text-zinc-400 cursor-not-allowed shadow-none'
                }`}
              >
                {isUploading ? (
                  <>
                    <RefreshCw size={16} className="animate-spin" />
                    <span>Auto Saving...</span>
                  </>
                ) : (
                  <>
                    <QrCode size={16} />
                    <span>Get QR Code</span>
                  </>
                )}
              </button>
            </div>

            {!isAllUploaded && (
              <p className="text-[11px] text-center text-brand-text-muted">
                *Ambil ke-4 foto untuk mengunduh atau membuat QR Code.
              </p>
            )}
          </div>

        </div>

      </div>

      {/* MODAL KAMERA MIRROR */}
      {activeSlotForCamera !== null && (
        <div className="fixed inset-0 z-50 bg-black/70 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-brand-surface p-5 rounded-3xl max-w-sm w-full space-y-4 border border-brand-border relative shadow-2xl">
            <div className="flex items-center justify-between">
              <h3 className="font-bold text-sm text-brand-text-main flex items-center gap-2">
                <Camera size={16} className="text-brand-primary" />
                <span>Kamera Slot #{activeSlotForCamera + 1}</span>
              </h3>
              <button
                onClick={() => {
                  setActiveSlotForCamera(null);
                  setCountdown(null);
                }}
                className="p-1 rounded-full text-brand-text-muted hover:bg-brand-bg"
              >
                <X size={18} />
              </button>
            </div>

            <div className="w-full h-72 bg-black rounded-2xl overflow-hidden relative flex items-center justify-center">
              <Webcam
                audio={false}
                ref={webcamRef}
                screenshotFormat="image/jpeg"
                videoConstraints={videoConstraints}
                className="w-full h-full object-cover scale-x-[-1]"
              />

              {countdown !== null && (
                <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
                  <span className="text-6xl font-black text-white animate-bounce">
                    {countdown}
                  </span>
                </div>
              )}
            </div>

            <button
              onClick={startCameraCapture}
              disabled={countdown !== null}
              className="w-full py-3 bg-brand-primary hover:bg-brand-primary-hover text-white rounded-2xl font-bold text-sm flex items-center justify-center gap-2 shadow-md transition-all active:scale-95"
            >
              <Camera size={18} />
              <span>{countdown !== null ? 'Siap-siap...' : 'Ambil Foto (Hitung 3s)'}</span>
            </button>
          </div>
        </div>
      )}

      {/* MODAL POP-UP QR CODE */}
      {qrModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/70 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-brand-surface p-6 rounded-3xl max-w-xs w-full text-center space-y-5 border border-brand-border relative shadow-2xl">
            
            <button
              onClick={() => setQrModalOpen(false)}
              className="absolute top-4 right-4 p-1 rounded-full text-brand-text-muted hover:bg-brand-bg"
            >
              <X size={18} />
            </button>

            <div className="space-y-1 pt-2">
              <div className="w-10 h-10 bg-brand-primary-soft text-brand-primary rounded-2xl flex items-center justify-center mx-auto">
                <QrCode size={20} />
              </div>
              <h3 className="font-bold text-base text-brand-text-main">Scan QR Code</h3>
              <p className="text-xs text-brand-text-muted">
                Foto kamu sudah tersimpan! Scan QR Code untuk mengunduh ke HP.
              </p>
            </div>

            <div className="bg-white p-4 rounded-2xl border border-brand-border shadow-inner inline-block">
              <QRCodeSVG
                value={uploadedImageUrl}
                size={180}
                bgColor={"#ffffff"}
                fgColor={"#1E1E24"}
                level={"M"}
              />
            </div>

            <div className="pt-2">
              <a
                href={uploadedImageUrl}
                target="_blank"
                rel="noreferrer"
                className="text-xs font-semibold text-brand-primary hover:underline break-all"
              >
                Atau buka link gambar langsung
              </a>
            </div>

          </div>
        </div>
      )}

      {/* MODAL RIWAYAT FOTO (HISTORY) */}
      {historyModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/70 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-brand-surface p-6 rounded-3xl max-w-md w-full space-y-4 border border-brand-border relative shadow-2xl max-h-[80vh] flex flex-col">
            
            <div className="flex items-center justify-between pb-2 border-b border-brand-border">
              <h3 className="font-bold text-sm text-brand-text-main flex items-center gap-2">
                <History size={18} className="text-brand-primary" />
                <span>Riwayat Photo Strip Terbuat</span>
              </h3>
              <button
                onClick={() => setHistoryModalOpen(false)}
                className="p-1 rounded-full text-brand-text-muted hover:bg-brand-bg"
              >
                <X size={18} />
              </button>
            </div>

            <div className="flex-1 overflow-y-auto space-y-3 pr-1">
              {historyList.map((item, idx) => (
                <div key={item.id} className="p-3 bg-brand-bg rounded-2xl border border-brand-border flex items-center justify-between gap-3">
                  <div className="flex items-center gap-3">
                    <img src={item.url} alt="Strip Thumbnail" className="w-10 h-16 object-cover rounded-lg shadow-xs" />
                    <div>
                      <p className="text-xs font-bold text-brand-text-main">Photo Strip #{historyList.length - idx}</p>
                      <p className="text-[10px] text-brand-text-muted">Pukul {item.time}</p>
                    </div>
                  </div>

                  <button
                    onClick={() => {
                      setUploadedImageUrl(item.url);
                      setHistoryModalOpen(false);
                      setQrModalOpen(true);
                    }}
                    className="py-1.5 px-3 bg-brand-primary text-white rounded-xl text-xs font-semibold flex items-center gap-1 hover:bg-brand-primary-hover transition-colors"
                  >
                    <QrCode size={14} />
                    <span>Lihat QR</span>
                  </button>
                </div>
              ))}
            </div>

          </div>
        </div>
      )}

    </div>
  );
}