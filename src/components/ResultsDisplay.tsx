import React from 'react';
import { TrendingUp, AlertCircle, CheckCircle } from 'lucide-react';
import { SolubilityChart } from './SolubilityChart';
import type { Molecule, SolubilityPrediction } from '../types';

interface ResultsDisplayProps {
  molecule: Molecule;
  predictions: SolubilityPrediction[];
  isLoading: boolean;
}

export function ResultsDisplay({ molecule, predictions, isLoading }: ResultsDisplayProps) {
  const getConfidenceColor = (confidence: number) => {
    if (confidence >= 0.8) return 'text-green-600';
    if (confidence >= 0.6) return 'text-yellow-600';
    return 'text-red-600';
  };

  const getConfidenceIcon = (confidence: number) => {
    if (confidence >= 0.8) return <CheckCircle className="w-4 h-4" />;
    if (confidence >= 0.6) return <AlertCircle className="w-4 h-4" />;
    return <AlertCircle className="w-4 h-4" />;
  };

  const getSolubilityLabel = (solubility: number) => {
    if (solubility > 10) return 'Highly Soluble';
    if (solubility > 1) return 'Soluble';
    if (solubility > 0.1) return 'Moderately Soluble';
    if (solubility > 0.01) return 'Poorly Soluble';
    return 'Very Poorly Soluble';
  };

  if (isLoading) {
    return (
      <div className="bg-white rounded-xl shadow-lg p-6 border border-blue-100">
        <div className="flex items-center justify-center py-8">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
          <span className="ml-3 text-gray-600">Analyzing molecular properties...</span>
        </div>
      </div>
    );
  }

  if (predictions.length === 0) {
    return (
      <div className="bg-white rounded-xl shadow-lg p-6 border border-blue-100">
        <div className="text-center py-8">
          <TrendingUp className="w-12 h-12 text-gray-400 mx-auto mb-3" />
          <h3 className="text-lg font-medium text-gray-900 mb-2">
            Ready to Predict
          </h3>
          <p className="text-gray-600">
            Enter molecular properties and click "Predict Solubility" to see results
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="bg-white rounded-xl shadow-lg p-6 border border-blue-100">
        <div className="flex items-center space-x-2 mb-4">
          <TrendingUp className="w-5 h-5 text-blue-600" />
          <h3 className="text-lg font-semibold text-gray-900">
            Solubility Predictions
          </h3>
        </div>

        <div className="space-y-4">
          <div className="bg-gray-50 rounded-lg p-3">
            <h4 className="font-medium text-gray-900">{molecule.name}</h4>
            <p className="text-sm text-gray-600">MW: {molecule.molecularWeight} Da</p>
          </div>

          <div className="space-y-3">
            {predictions.map((prediction) => (
              <div key={prediction.solvent.id} className="border border-gray-200 rounded-lg p-4">
                <div className="flex items-center justify-between mb-2">
                  <h5 className="font-medium text-gray-900">{prediction.solvent.name}</h5>
                  <div className={`flex items-center space-x-1 ${getConfidenceColor(prediction.confidence)}`}>
                    {getConfidenceIcon(prediction.confidence)}
                    <span className="text-sm font-medium">
                      {Math.round(prediction.confidence * 100)}%
                    </span>
                  </div>
                </div>
                
                <div className="space-y-1">
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-600">Solubility:</span>
                    <span className="font-medium">
                      {prediction.solubility.toFixed(3)} mg/mL
                    </span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-600">Classification:</span>
                    <span className="text-sm font-medium text-blue-600">
                      {getSolubilityLabel(prediction.solubility)}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <SolubilityChart predictions={predictions} />
    </div>
  );
}