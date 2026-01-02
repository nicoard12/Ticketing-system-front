function Spinner({ size = 8 }: { size?: number }) {
  return (
    <div className="w-full flex items-center justify-center">
      <div
        className={`w-${size} h-${size} border-4 border-blue-200 border-t-blue-600 rounded-full animate-spin`}
      />
    </div>
  );
}

export default Spinner;
