import React from 'react';
import { FlaskConical, Beaker } from 'lucide-react';

export function Header() {
  return (
    <header className="bg-white shadow-sm border-b border-blue-100">
      <div className="container mx-auto px-4 py-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="flex items-center space-x-2">
              <FlaskConical className="w-8 h-8 text-blue-600" />
              <Beaker className="w-6 h-6 text-emerald-600" />
            </div>
            <div>
              <h1 className="text-2xl font-bold text-gray-900">
                Solubility Predictor
              </h1>
              <p className="text-sm text-gray-600">
                AI-powered molecular solubility prediction for drug discovery
              </p>
            </div>
          </div>
          
          <div className="hidden md:flex items-center space-x-4 text-sm text-gray-600">
            <span className="flex items-center space-x-1">
              <div className="w-2 h-2 bg-green-500 rounded-full"></div>
              <span>ML Model Active</span>
            </span>
          </div>
        </div>
      </div>
    </header>
  );
}