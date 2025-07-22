import React from 'react';
import { BookOpen, Target, Zap } from 'lucide-react';

export function EducationalContent() {
  return (
    <div className="bg-white rounded-xl shadow-lg p-6 border border-blue-100">
      <div className="flex items-center space-x-2 mb-6">
        <BookOpen className="w-5 h-5 text-blue-600" />
        <h3 className="text-lg font-semibold text-gray-900">
          Understanding Solubility Prediction
        </h3>
      </div>

      <div className="grid md:grid-cols-3 gap-6">
        <div className="space-y-3">
          <div className="flex items-center space-x-2">
            <Target className="w-4 h-4 text-emerald-600" />
            <h4 className="font-medium text-gray-900">Key Factors</h4>
          </div>
          <ul className="text-sm text-gray-600 space-y-1">
            <li>• <strong>Molecular Weight:</strong> Larger molecules tend to be less soluble</li>
            <li>• <strong>LogP:</strong> Measures lipophilicity vs hydrophilicity</li>
            <li>• <strong>Polar Surface Area:</strong> Higher PSA increases water solubility</li>
            <li>• <strong>H-Bond Capacity:</strong> More H-bonds favor aqueous solubility</li>
          </ul>
        </div>

        <div className="space-y-3">
          <div className="flex items-center space-x-2">
            <Zap className="w-4 h-4 text-emerald-600" />
            <h4 className="font-medium text-gray-900">Lipinski's Rule</h4>
          </div>
          <ul className="text-sm text-gray-600 space-y-1">
            <li>• MW ≤ 500 Da</li>
            <li>• LogP ≤ 5</li>
            <li>• H-bond donors ≤ 5</li>
            <li>• H-bond acceptors ≤ 10</li>
            <li>Violations suggest poor oral bioavailability</li>
          </ul>
        </div>

        <div className="space-y-3">
          <div className="flex items-center space-x-2">
            <BookOpen className="w-4 h-4 text-emerald-600" />
            <h4 className="font-medium text-gray-900">Applications</h4>
          </div>
          <ul className="text-sm text-gray-600 space-y-1">
            <li>• Drug discovery and development</li>
            <li>• Formulation optimization</li>
            <li>• Environmental fate modeling</li>
            <li>• Process chemistry planning</li>
          </ul>
        </div>
      </div>

      <div className="mt-6 p-4 bg-amber-50 rounded-lg border border-amber-200">
        <p className="text-sm text-amber-800">
          <strong>Disclaimer:</strong> This tool provides estimates based on computational models. 
          Experimental validation is essential for research and development applications. 
          Predictions may vary from actual experimental results.
        </p>
      </div>
    </div>
  );
}