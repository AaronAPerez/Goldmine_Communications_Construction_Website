import { useImagePerformance } from "../../hooks/useImagePerformance";


export default function PerformanceMetrics() {
  const { getPerformanceStats } = useImagePerformance();
  const stats = getPerformanceStats();

  if (!stats) return <p>No image metrics collected yet</p>;

  return (
    <div className="p-4 bg-white shadow rounded-lg">
      <h2 className="text-xl font-bold mb-4">Image Performance</h2>
      
      <div className="grid grid-cols-2 gap-4">
        <div className="border p-3 rounded">
          <div className="text-gray-500">Total Images</div>
          <div className="text-2xl font-bold">{stats.totalImages}</div>
        </div>
        
        <div className="border p-3 rounded">
          <div className="text-gray-500">Average Load Time</div>
          <div className="text-2xl font-bold">{stats.averageLoadTime.toFixed(2)}ms</div>
        </div>
      </div>
      
      <div className="mt-4">
        <h3 className="font-semibold">Slowest Image:</h3>
        <div className="bg-red-50 p-3 rounded mt-2">
          <p>{stats.slowestImage.url}</p>
          <p className="text-red-500">{stats.slowestImage.loadTime.toFixed(2)}ms</p>
        </div>
      </div>
    </div>
  );
}