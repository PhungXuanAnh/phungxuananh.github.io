import React, { useState } from 'react';
import { Circle, Triangle, Square } from 'lucide-react';

function PyramidCalculator() {
  const [diameter, setDiameter] = useState(41);
  const radius = diameter / 2;
  const angleInDegrees = 52 + 51/60; // 52°51'
  const angleInRadians = angleInDegrees * Math.PI / 180;
  
  // Tính toán các kích thước
  const sideEdge = radius; // Cạnh bên = bán kính
  const baseHalf = sideEdge * Math.cos(angleInRadians); // Nửa cạnh đáy
  const baseLength = baseHalf * 2; // Cạnh đáy hình vuông
  const slantHeight = sideEdge * Math.sin(angleInRadians); // Chiều cao mặt bên (apothem)
  
  // Chiều cao kim tự tháp
  // h = sqrt(cạnh_bên² - khoảng_cách_từ_tâm_đến_cạnh²)
  const distanceFromCenter = baseLength / 2; // Khoảng cách từ tâm đến cạnh = nửa đường chéo / sqrt(2) = (base*sqrt(2)/2)/sqrt(2) = base/2
  const pyramidHeight = Math.sqrt(sideEdge * sideEdge - (distanceFromCenter / Math.sqrt(2)) * (distanceFromCenter / Math.sqrt(2)));
  
  // Tính lại chính xác hơn
  const apothem = baseLength / 2; // Khoảng cách từ tâm đến trung điểm cạnh
  const actualHeight = Math.sqrt(sideEdge * sideEdge - apothem * apothem);

  return (
    <div className="max-w-4xl mx-auto p-6 bg-gradient-to-br from-amber-50 to-orange-50">
      <div className="bg-white rounded-lg shadow-lg p-6 mb-6">
        <h1 className="text-3xl font-bold text-amber-800 mb-2 flex items-center gap-2">
          <Triangle className="w-8 h-8" />
          Kim Tự Tháp - Phương Pháp Đường Tròn
        </h1>
        <p className="text-gray-600 mb-4">Góc đáy: 52°51' (giống Kim Tự Tháp Giza)</p>
      </div>

      <div className="bg-white rounded-lg shadow-lg p-6 mb-6">
        <h2 className="text-xl font-bold text-amber-700 mb-4 flex items-center gap-2">
          <Circle className="w-6 h-6" />
          Bước 1: Vẽ Đường Tròn
        </h2>
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Đường kính đường tròn (cm):
          </label>
          <input
            type="number"
            value={diameter}
            onChange={(e) => setDiameter(Number(e.target.value))}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-amber-500"
          />
        </div>
        <div className="bg-amber-50 p-4 rounded-lg">
          <p className="text-lg">📏 Bán kính: <span className="font-bold text-amber-800">{radius.toFixed(2)} cm</span></p>
          <p className="text-sm text-gray-600 mt-2">Bán kính này = Cạnh bên của kim tự tháp</p>
        </div>
      </div>

      <div className="bg-white rounded-lg shadow-lg p-6 mb-6">
        <h2 className="text-xl font-bold text-amber-700 mb-4">🎨 Minh Họa 4 Tam Giác Trong Đường Tròn</h2>
        <div className="bg-gray-50 p-4 rounded-lg">
          <svg viewBox="0 0 500 500" className="w-full max-w-2xl mx-auto">
            {/* Đường tròn */}
            <circle cx="250" cy="250" r="180" fill="none" stroke="#f59e0b" strokeWidth="3"/>
            
            {/* Tâm đường tròn - đỉnh chung của 4 tam giác */}
            <circle cx="250" cy="250" r="6" fill="#dc2626"/>
            <text x="260" y="255" className="text-sm font-bold" fill="#dc2626">Tâm (Đỉnh chung)</text>
            
            {(() => {
              const centerX = 250;
              const centerY = 250;
              const r = 180;
              const apexAngle = 180 - 2 * angleInDegrees; // Góc ở đỉnh tam giác
              const halfApex = apexAngle / 2;
              
              // Tính toán 4 tam giác liền nhau
              const startAngle = -90 - halfApex * 2; // Bắt đầu từ trên, lùi về trái một nửa
              const points = [];
              
              // Tạo 5 điểm (4 tam giác = 5 đỉnh trên đường tròn)
              for (let i = 0; i <= 4; i++) {
                const angle = (startAngle + i * halfApex * 2) * Math.PI / 180;
                const x = centerX + r * Math.cos(angle);
                const y = centerY + r * Math.sin(angle);
                points.push({ x, y });
              }
              
              return (
                <>
                  {/* Vẽ 4 tam giác liền nhau */}
                  {points.slice(0, 4).map((p, idx) => {
                    const nextP = points[idx + 1];
                    return (
                      <g key={idx}>
                        {/* Cạnh bên từ tâm đến đỉnh hiện tại */}
                        {idx === 0 && (
                          <line 
                            x1={centerX} y1={centerY} 
                            x2={p.x} y2={p.y} 
                            stroke="#3b82f6" 
                            strokeWidth="3"
                          />
                        )}
                        {/* Cạnh bên từ tâm đến đỉnh tiếp theo (được chia sẻ giữa các tam giác) */}
                        <line 
                          x1={centerX} y1={centerY} 
                          x2={nextP.x} y2={nextP.y} 
                          stroke="#3b82f6" 
                          strokeWidth="3"
                        />
                        {/* Cạnh đáy */}
                        <line 
                          x1={p.x} y1={p.y} 
                          x2={nextP.x} y2={nextP.y} 
                          stroke="#059669" 
                          strokeWidth="2"
                          strokeDasharray="5,3"
                        />
                        {/* Đỉnh trên đường tròn */}
                        <circle cx={p.x} cy={p.y} r="4" fill="#059669"/>
                        {idx === 3 && <circle cx={nextP.x} cy={nextP.y} r="4" fill="#059669"/>}
                      </g>
                    );
                  })}
                  
                  {/* Nhãn góc đáy cho tam giác đầu tiên */}
                  <text x={points[0].x - 50} y={points[0].y + 5} className="text-xs font-bold" fill="#dc2626">52°51'</text>
                  <text x={points[1].x + 10} y={points[1].y + 5} className="text-xs font-bold" fill="#dc2626">52°51'</text>
                  
                  {/* Mũi tên chỉ khoảng trống */}
                  <path 
                    d={`M ${points[4].x + 20} ${points[4].y} Q ${points[4].x + 40} ${centerY} ${points[0].x - 20} ${points[0].y}`}
                    fill="none" 
                    stroke="#ef4444" 
                    strokeWidth="2"
                    strokeDasharray="5,5"
                  />
                  <text x={points[0].x - 100} y={centerY - 120} className="text-sm italic font-bold" fill="#ef4444">Khoảng trống</text>
                  <text x={points[0].x - 115} y={centerY - 105} className="text-xs italic" fill="#6b7280">(Để gấp kim tự tháp)</text>
                </>
              );
            })()}
            
            {/* Chú thích cạnh bên */}
            <text x="270" y="150" className="text-sm font-bold" fill="#3b82f6">r = {radius.toFixed(1)}cm</text>
            <text x="265" y="165" className="text-xs" fill="#3b82f6">(Cạnh bên)</text>
            
            {/* Chú thích đường kính */}
            <line x1="70" y1="250" x2="430" y2="250" stroke="#f59e0b" strokeWidth="2" strokeDasharray="5,5" opacity="0.5"/>
            <text x="320" y="270" className="text-sm font-bold" fill="#f59e0b">Ø = {diameter}cm</text>
            
            {/* Chú thích cạnh đáy */}
            <text x="200" y="55" className="text-xs font-bold" fill="#059669">Cạnh đáy = {baseLength.toFixed(2)}cm</text>
            
            {/* Chú thích */}
            <text x="10" y="30" className="text-xs font-bold" fill="#374151">4 Tam Giác liền nhau - Chung cạnh bên - Cạnh bên = Bán kính = {radius.toFixed(1)}cm</text>
            <text x="10" y="480" className="text-xs" fill="#6b7280">💡 Các đỉnh cạnh đáy nằm trên đường tròn | 🔵 Cạnh bên chung | 🟢 Cạnh đáy | 🔴 Khoảng trống để gấp</text>
          </svg>
        </div>
        <p className="text-sm text-gray-600 text-center mt-4">
          ✂️ Đây là bản vẽ phẳng (net) của kim tự tháp. Cắt theo đường tròn, gấp 4 tam giác lên theo khoảng trống màu đỏ, các cạnh đáy sẽ ghép thành hình vuông!
        </p>
      </div>

      <div className="bg-white rounded-lg shadow-lg p-6 mb-6">
        <h2 className="text-xl font-bold text-amber-700 mb-4">📐 Kết Quả Tính Toán</h2>
        
        <div className="space-y-4">
          <div className="bg-blue-50 p-4 rounded-lg">
            <h3 className="font-bold text-blue-800 mb-2">Cạnh bên (Edge):</h3>
            <p className="text-2xl font-bold text-blue-900">{sideEdge.toFixed(2)} cm</p>
            <p className="text-sm text-gray-600">Từ đỉnh xuống góc đáy</p>
          </div>

          <div className="bg-green-50 p-4 rounded-lg">
            <h3 className="font-bold text-green-800 mb-2">Cạnh đáy hình vuông:</h3>
            <p className="text-2xl font-bold text-green-900">{baseLength.toFixed(2)} cm</p>
            <p className="text-sm text-gray-600">Mỗi cạnh của đáy</p>
          </div>

          <div className="bg-purple-50 p-4 rounded-lg">
            <h3 className="font-bold text-purple-800 mb-2">Chiều cao mặt bên (Slant Height):</h3>
            <p className="text-2xl font-bold text-purple-900">{slantHeight.toFixed(2)} cm</p>
            <p className="text-sm text-gray-600">Từ đỉnh xuống trung điểm cạnh đáy</p>
          </div>

          <div className="bg-red-50 p-4 rounded-lg">
            <h3 className="font-bold text-red-800 mb-2">Chiều cao kim tự tháp:</h3>
            <p className="text-2xl font-bold text-red-900">{actualHeight.toFixed(2)} cm</p>
            <p className="text-sm text-gray-600">Từ đỉnh xuống tâm đáy</p>
          </div>
        </div>
      </div>

      <div className="bg-white rounded-lg shadow-lg p-6 mb-6">
        <h2 className="text-xl font-bold text-amber-700 mb-4">📋 Hướng Dẫn Làm</h2>
        <ol className="space-y-3 list-decimal list-inside text-gray-700">
          <li className="pl-2">Vẽ đường tròn đường kính {diameter} cm (bán kính {radius.toFixed(2)} cm)</li>
          <li className="pl-2">Vẽ 4 tam giác cân với:
            <ul className="list-disc list-inside ml-6 mt-2 space-y-1 text-sm">
              <li>Cạnh bên = {sideEdge.toFixed(2)} cm</li>
              <li>Góc đáy = 52°51'</li>
              <li>Cạnh đáy = {baseLength.toFixed(2)} cm</li>
            </ul>
          </li>
          <li className="pl-2">Ghép 4 tam giác tạo thành hình vuông đáy {baseLength.toFixed(2)} × {baseLength.toFixed(2)} cm</li>
          <li className="pl-2">Dựng kim tự tháp với chiều cao {actualHeight.toFixed(2)} cm</li>
        </ol>
      </div>

      <div className="bg-gradient-to-r from-amber-100 to-orange-100 rounded-lg shadow-lg p-6">
        <h2 className="text-xl font-bold text-amber-800 mb-3 flex items-center gap-2">
          <Square className="w-6 h-6" />
          Tỷ Lệ Vàng
        </h2>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <p className="text-sm text-gray-600">Tỷ lệ Chiều cao / Nửa đáy:</p>
            <p className="text-xl font-bold text-amber-900">{(actualHeight / (baseLength/2)).toFixed(4)}</p>
          </div>
          <div>
            <p className="text-sm text-gray-600">Pi/2 (lý thuyết):</p>
            <p className="text-xl font-bold text-amber-900">{(Math.PI / 2).toFixed(4)}</p>
          </div>
        </div>
        <p className="text-xs text-gray-500 mt-3">
          ✨ Góc 52°51' tạo ra tỷ lệ gần với π/2, đây là đặc điểm của Kim Tự Tháp Giza!
        </p>
      </div>
    </div>
  );
}

export default PyramidCalculator;