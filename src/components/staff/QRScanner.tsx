import { useRef, useEffect, useState } from "react";
import jsQR from "jsqr";
import { toast } from "sonner";

export default function QRScanner({validate}: {validate: (qrCode: string) => void}) {
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const [qrCode, setQrCode] = useState<string | null>(null);

  useEffect(() => {
    let animationFrameId: number;

    const startCamera = async () => {
      try {
        const stream = await navigator.mediaDevices.getUserMedia({
          video: { facingMode: "environment" },
        });
        if (videoRef.current) videoRef.current.srcObject = stream;

        // Crear canvas solo una vez
        if (!canvasRef.current && videoRef.current) {
          const canvas = document.createElement("canvas");
          canvas.width = videoRef.current.videoWidth || 640;
          canvas.height = videoRef.current.videoHeight || 480;
          canvasRef.current = canvas;
        }

        requestAnimationFrame(scanFrame);
      } catch (err) {
        console.error("Error accediendo a la cámara:", err);
      }
    };

    const scanFrame = () => {
      const video = videoRef.current;
      const canvas = canvasRef.current;
      if (video && canvas && video.readyState === video.HAVE_ENOUGH_DATA) {
        const ctx = canvas.getContext("2d");
        if (ctx) {
          canvas.width = video.videoWidth;
          canvas.height = video.videoHeight;
          ctx.drawImage(video, 0, 0, canvas.width, canvas.height);
          const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
          const code = jsQR(imageData.data, canvas.width, canvas.height);
          if (code) {
            setQrCode(code.data);
            console.log("QR detectado:", code.data);
            return; // parar escaneo hasta que el componente se remonte
          }
        }
      }
      animationFrameId = requestAnimationFrame(scanFrame);
    };

    toast.warning(qrCode ?? "No hay qrcode")

    if (!qrCode) startCamera();
    else validate(qrCode)    

    return () => {
      cancelAnimationFrame(animationFrameId);
      const video = videoRef.current;
      if (video?.srcObject) {
        (video.srcObject as MediaStream)
          .getTracks()
          .forEach((track) => track.stop());
      }
    };
  }, [qrCode]); 

  return (
    <div>
      <video ref={videoRef} autoPlay className="w-full" />
    </div>
  );
}
