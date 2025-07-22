import React from 'react';
import { BarChart3 } from 'lucide-react';
import type { SolubilityPrediction } from '../types';

interface SolubilityChartProps {
  predictions: SolubilityPrediction[];
}

export function SolubilityChart({ predictions }: SolubilityChartProps) {
  if (predictions.length === 0) return null;

  const maxSolubility = Math.max(...predictions.map(p => p.solubility));

  return (
    <div className="bg-white rounded-xl shadow-lg p-6 border border-blue-100">
      <div className="flex items-center space-x-2 mb-4">
        <BarChart3 className="w-5 h-5 text-blue-600" />
        <h3 className="text-lg font-semibold text-gray-900">
          Solubility Comparison
        </h3>
      </div>

      <div className="space-y-3">
        {predictions.map((prediction) => (
          <div key={prediction.solvent.id} className="space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium text-gray-700">
                {prediction.solvent.name}
              </span>
              <span className="text-sm text-gray-600">
                {prediction.solubility.toFixed(3)} mg/mL
              </span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2">
              <div
                className="bg-gradient-to-r from-blue-500 to-emerald-500 h-2 rounded-full transition-all duration-500"
                style={{
                  width: `${(prediction.solubility / maxSolubility) * 100}%`
                }}
              ></div>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-4 p-3 bg-blue-50 rounded-lg">
        <p className="text-sm text-blue-700">
          <strong>Note:</strong> Predictions are based on molecular descriptors and established 
          QSAR models. Experimental validation is recommended for critical applications.
        </p>
      </div>
    </div>
  );
}