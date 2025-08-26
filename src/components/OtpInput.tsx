import React, { useState, useRef, useEffect } from "react";

interface OtpInputProps {
  length?: number;
  onComplete?: (otp: string) => void;
  onVerify?: (success: boolean) => void;
}

const OtpInput: React.FC<OtpInputProps> = ({
  length = 6,
  onComplete = () => {},
  onVerify = () => {},
}) => {
  const [otp, setOtp] = useState<string[]>(new Array(length).fill(""));
  const [activeIndex, setActiveIndex] = useState<number>(0);
  const [isVerifying, setIsVerifying] = useState<boolean>(false);
  const [isSuccess, setIsSuccess] = useState<boolean>(false);
  const [isError, setIsError] = useState<boolean>(false);
  const inputRefs = useRef<(HTMLInputElement | null)[]>([]);

  // Sound effects
  const playSound = (frequency: number, duration = 100, type: OscillatorType = "sine") => {
    try {
      const audioContext = new (window.AudioContext || (window as any).webkitAudioContext)();
      const oscillator = audioContext.createOscillator();
      const gainNode = audioContext.createGain();

      oscillator.connect(gainNode);
      gainNode.connect(audioContext.destination);

      oscillator.frequency.value = frequency;
      oscillator.type = type;

      gainNode.gain.setValueAtTime(0.1, audioContext.currentTime);
      gainNode.gain.exponentialRampToValueAtTime(
        0.01,
        audioContext.currentTime + duration / 1000
      );

      oscillator.start(audioContext.currentTime);
      oscillator.stop(audioContext.currentTime + duration / 1000);
    } catch {
      console.log("Audio not supported");
    }
  };
  

  const handleChange = (element: HTMLInputElement, index: number) => {
    if (isNaN(Number(element.value))) return;

    const newOtp = [...otp];
    newOtp[index] = element.value;
    setOtp(newOtp);

    playSound(800 + index * 50, 80);

    if (element.value && index < length - 1) {
      setActiveIndex(index + 1);
      inputRefs.current[index + 1]?.focus();
    }

    if (newOtp.every((digit) => digit !== "")) {
      onComplete(newOtp.join(""));
      setTimeout(() => playSound(1000, 200), 100);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>, index: number) => {
    if (e.key === "Backspace") {
      const newOtp = [...otp];
      if (otp[index]) {
        newOtp[index] = "";
        setOtp(newOtp);
        playSound(600, 60);
      } else if (index > 0) {
        newOtp[index - 1] = "";
        setOtp(newOtp);
        setActiveIndex(index - 1);
        inputRefs.current[index - 1]?.focus();
        playSound(600, 60);
      }
    } else if (e.key === "ArrowLeft" && index > 0) {
      setActiveIndex(index - 1);
      inputRefs.current[index - 1]?.focus();
    } else if (e.key === "ArrowRight" && index < length - 1) {
      setActiveIndex(index + 1);
      inputRefs.current[index + 1]?.focus();
    }
  };

  const handleFocus = (index: number) => setActiveIndex(index);

  const handlePaste = (e: React.ClipboardEvent<HTMLInputElement>) => {
    e.preventDefault();
    const pasteData = e.clipboardData.getData("text").slice(0, length);

    if (pasteData && /^\d+$/.test(pasteData)) {
      const newOtp = pasteData
        .split("")
        .concat(new Array(length).fill(""))
        .slice(0, length);
      setOtp(newOtp);

      const nextEmptyIndex = newOtp.findIndex((digit) => digit === "");
      const focusIndex = nextEmptyIndex !== -1 ? nextEmptyIndex : length - 1;
      setActiveIndex(focusIndex);
      inputRefs.current[focusIndex]?.focus();

      playSound(1200, 150);

      if (newOtp.every((digit) => digit !== "")) {
        onComplete(newOtp.join(""));
        setTimeout(() => playSound(1000, 200), 100);
      }
    }
  };

  const handleVerify = async () => {
    if (otp.every((digit) => digit !== "")) {
      setIsVerifying(true);
      setIsError(false);

      try {
        await new Promise((resolve) => setTimeout(resolve, 2000));
        const success = Math.random() > 0.3;

        if (success) {
          setIsSuccess(true);
          playSound(523, 100);
          setTimeout(() => playSound(659, 100), 100);
          setTimeout(() => playSound(784, 200), 200);
          onVerify(true);
        } else {
          setIsError(true);
          playSound(200, 300, "sawtooth");
          setTimeout(() => {
            setIsError(false);
            setOtp(new Array(length).fill(""));
            setActiveIndex(0);
            inputRefs.current[0]?.focus();
          }, 1000);
          onVerify(false);
        }
      } finally {
        setIsVerifying(false);
      }
    }
  };

  const reset = () => {
    setOtp(new Array(length).fill(""));
    setActiveIndex(0);
    setIsSuccess(false);
    setIsError(false);
    setIsVerifying(false);
    inputRefs.current[0]?.focus();
  };

  useEffect(() => {
    inputRefs.current[0]?.focus();
  }, []);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-black relative overflow-hidden">
      {/* background dots */}
      <div className="absolute inset-0 bg-[radial-gradient(circle,_rgba(59,130,246,0.15)_2px,_transparent_1px)] [background-size:20px_20px]"></div>

      <div className="relative z-10 w-full max-w-md">
        <div className="text-center mb-8">
          <h2 className="text-3xl font-bold text-white mb-2">Enter Verification Code</h2>
          <p className="text-slate-400">We’ve sent a {length}-digit code to your device</p>
        </div>

        <div className="flex justify-center gap-3 mb-8">
          {otp.map((digit, index) => (
            <input
              key={index}
              //@ts-ignore
              ref={(el) => (inputRefs.current[index] = el)}
              type="text"
              inputMode="numeric"
              maxLength={1}
              value={digit}
              onChange={(e) => handleChange(e.target, index)}
              onKeyDown={(e) => handleKeyDown(e, index)}
              onFocus={() => handleFocus(index)}
              onPaste={handlePaste}
              disabled={isVerifying || isSuccess}
              className={`
                w-14 h-14 text-center text-2xl font-bold rounded-lg border-2
                bg-black text-white placeholder-slate-400
                transition-all duration-300 outline-none
                ${isError ? "border-red-500 animate-pulse" : ""}
                ${isSuccess ? "border-green-500" : ""}
                ${
                  activeIndex === index && !isError && !isSuccess
                    ? "border-blue-400 shadow-[0_0_15px_rgba(59,130,246,0.7)]"
                    : digit
                    ? "border-white/40"
                    : "border-slate-600"
                }
              `}
            />
          ))}
        </div>

        <div className="text-center mb-6 h-6">
          {isError && <p className="text-red-400 text-sm">❌ Invalid code</p>}
          {isSuccess && <p className="text-green-400 text-sm">✅ Verification successful!</p>}
          {isVerifying && <p className="text-blue-400 text-sm">🔄 Verifying...</p>}
        </div>

        <div className="flex gap-4 justify-center">
          <button
            onClick={handleVerify}
            disabled={!otp.every((d) => d !== "") || isVerifying || isSuccess}
            className={`
              px-8 py-3 rounded-lg font-semibold transition-all duration-300
              ${
                otp.every((d) => d !== "") && !isVerifying && !isSuccess
                  ? "bg-blue-600 hover:bg-blue-700 text-white shadow-lg hover:shadow-blue-500/25 transform hover:scale-105"
                  : "bg-slate-800 text-slate-500 cursor-not-allowed"
              }
            `}
          >
            {isVerifying ? "Verifying..." : "Verify Code"}
          </button>

          <button
            onClick={reset}
            disabled={isVerifying}
            className="px-6 py-3 rounded-lg font-semibold border-2 border-slate-700 text-slate-300 hover:border-white hover:text-white transition-all duration-300 disabled:opacity-50"
          >
            Reset
          </button>
        </div>
      </div>
    </div>
  );
};

export default OtpInput;
