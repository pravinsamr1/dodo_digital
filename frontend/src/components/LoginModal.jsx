import React, { useEffect, useState } from 'react';
import { X } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useAuthModal } from '../context/AuthModalContext';
import { createAuthToken, setAuthToken } from '../utils/auth';
import './loginModal.css';

const REASONS = [
  'Direct admissions support',
  'Personalized counselling',
  'Admission updates & alerts',
];

const LoginModal = () => {
  const { isOpen, pendingSchoolId, closeLoginModal } = useAuthModal();
  const navigate = useNavigate();

  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [otp, setOtp] = useState('');
  const [otpSent, setOtpSent] = useState(false);
  const [error, setError] = useState('');

  const resetForm = () => {
    setName('');
    setPhone('');
    setOtp('');
    setOtpSent(false);
    setError('');
  };

  const handleClose = () => {
    resetForm();
    closeLoginModal();
  };

  useEffect(() => {
    if (!isOpen) return;

    const handleEscape = (event) => {
      if (event.key === 'Escape') handleClose();
    };

    document.body.style.overflow = 'hidden';
    document.addEventListener('keydown', handleEscape);

    return () => {
      document.body.style.overflow = '';
      document.removeEventListener('keydown', handleEscape);
    };
  }, [isOpen]);

  const validatePhone = () => {
    const digits = phone.replace(/\D/g, '');
    if (digits.length !== 10) {
      setError('Enter a valid 10-digit mobile number.');
      return false;
    }
    return true;
  };

  const handleGetOtp = (event) => {
    event.preventDefault();
    setError('');

    if (!name.trim()) {
      setError('Please enter your name.');
      return;
    }

    if (!validatePhone()) return;

    setOtpSent(true);
    setOtp('');
  };

  const handleVerifyOtp = (event) => {
    event.preventDefault();
    setError('');

    if (!/^\d{4}$/.test(otp)) {
      setError('Enter the 4-digit OTP.');
      return;
    }

    const token = createAuthToken({ name, phone });
    setAuthToken(token);

    const targetPath = pendingSchoolId
      ? `/schools/${pendingSchoolId}`
      : '/allschools';

    resetForm();
    closeLoginModal();
    navigate(targetPath);
  };

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-[100] flex items-center justify-center overflow-y-auto p-4"
      role="dialog"
      aria-modal="true"
      aria-labelledby="login-modal-title"
    >
      <button
        type="button"
        className="absolute inset-0 bg-slate-900/60 backdrop-blur-sm"
        aria-label="Close login popup animate-modalClose"
        onClick={handleClose}
      />

      <div className="relative z-10 flex w-full max-w-6xl flex-col animate-modalSlide overflow-hidden rounded-2xl bg-white shadow-2xl md:min-h-[650px] md:rounded-3xl lg:flex-row">
        <div className="flex w-full flex-col bg-slate-50 lg:w-1/2 lg:border-r lg:border-slate-100">
          <div className="relative h-[220px] shrink-0 overflow-hidden sm:h-[280px] md:h-[340px] lg:h-[480px]">
            <button
              type="button"
              onClick={handleClose}
              className="absolute right-4 top-4 z-30 flex h-11 w-11 items-center justify-center rounded-full bg-white/95 text-slate-800 shadow-xl backdrop-blur-md transition hover:bg-white"
              aria-label="Close"
            >
              <X size={22} strokeWidth={2.5} />
            </button>
            <img
              src="https://images.unsplash.com/photo-1511895426328-dc8714191300?auto=format&fit=crop&q=80&w=800"
              alt="Family exploring schools"
              className="h-full w-full object-cover"
            />
          </div>
        </div>

        <div className="relative flex w-full flex-col justify-center bg-[#f8f9fb] px-5 py-8 sm:px-8 md:px-12 lg:w-1/2 lg:px-14">
          <h2
            id="login-modal-title"
            className="mb-6 mt-2 text-center text-lg font-[500] leading-snug text-slate-800 sm:text-2xl md:text-3xl"
          >
            You are just one step away from finding the best school
          </h2>

          <form
            onSubmit={otpSent ? handleVerifyOtp : handleGetOtp}
            className="mx-auto w-full max-w-md space-y-4 sm:space-y-5"
          >
            <div>
              <label htmlFor="login-name" className="mb-1.5 block text-sm font-medium text-slate-700">
                Name
              </label>
              <input
                id="login-name"
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Enter your name"
                disabled={otpSent}
                className="w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-800 outline-none transition focus:border-[#125fb9] focus:ring-2 focus:ring-[#125fb9]/20 disabled:bg-slate-100"
              />
            </div>

            <div>
              <label htmlFor="login-phone" className="mb-1.5 block text-sm font-medium text-slate-700">
                Mobile Number
              </label>
              <div className="flex overflow-hidden rounded-xl border border-slate-200 bg-white focus-within:border-[#125fb9] focus-within:ring-2 focus-within:ring-[#125fb9]/20">
                <span className="flex items-center gap-1 border-r border-slate-200 bg-slate-50 px-3 text-sm font-medium text-slate-600">
                  <span>🇮🇳</span> +91
                </span>
                <input
                  id="login-phone"
                  type="tel"
                  inputMode="numeric"
                  maxLength={10}
                  value={phone}
                  onChange={(e) => setPhone(e.target.value.replace(/\D/g, '').slice(0, 10))}
                  placeholder="XXXXXXXXXX"
                  disabled={otpSent}
                  className="w-full px-4 py-3 text-sm text-slate-800 outline-none disabled:bg-slate-100"
                />
              </div>
            </div>

            {otpSent && (
              <div>
                <label htmlFor="login-otp" className="mb-1.5 block text-sm font-medium text-slate-700">
                  Enter 4-digit OTP
                </label>
                <input
                  id="login-otp"
                  type="text"
                  inputMode="numeric"
                  maxLength={4}
                  value={otp}
                  onChange={(e) => setOtp(e.target.value.replace(/\D/g, '').slice(0, 4))}
                  placeholder="0000"
                  autoFocus
                  className="w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-center text-lg tracking-[0.5em] text-slate-800 outline-none transition focus:border-[#125fb9] focus:ring-2 focus:ring-[#125fb9]/20"
                />
                <p className="mt-2 text-center text-xs text-slate-500">
                  OTP sent to +91 {phone}
                </p>
                <div className="mt-4 flex items-center justify-center gap-2 text-sm">
                  <span className="text-slate-500">Didn&apos;t receive the OTP?</span>
                  <button
                    type="button"
                    onClick={() => {
                      setOtp('');
                      setError('');
                    }}
                    className="font-semibold text-[#125fb9] transition hover:text-[#0d4a91] hover:underline"
                  >
                    Resend OTP
                  </button>
                </div>
              </div>
            )}

            {error && (
              <p className="rounded-lg bg-red-50 px-3 py-2 text-center text-sm text-red-600">{error}</p>
            )}

            <button
              type="submit"
              className="w-full rounded-xl bg-[#125fb9] py-3 text-sm font-semibold text-white transition hover:bg-[#0d4a91] active:scale-[0.98] sm:py-3.5"
            >
              {otpSent ? 'Verify & Continue' : 'Get OTP'}
            </button>

            {otpSent && (
              <button
                type="button"
                onClick={() => {
                  setOtpSent(false);
                  setOtp('');
                  setError('');
                }}
                className="w-full text-sm font-medium text-[#125fb9] hover:underline"
              >
                Change mobile number
              </button>
            )}
          </form>

          <p className="mx-auto mt-4 max-w-md text-center text-[10px] leading-relaxed text-slate-500 sm:text-[11px]">
            By logging in, you consent to our website&apos;s{' '}
            <span className="font-semibold text-[#a0083d]">Terms &amp; Conditions</span>, and authorize
            us to reach out via phone, SMS, WhatsApp, or email.
          </p>
        </div>
      </div>
    </div>
  );
};

export default LoginModal;
