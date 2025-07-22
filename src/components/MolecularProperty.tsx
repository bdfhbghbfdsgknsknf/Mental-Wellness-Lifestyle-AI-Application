import React from 'react';
import { Info } from 'lucide-react';

interface MolecularPropertyProps {
  label: string;
  value: number;
  onChange: (value: number) => void;
  min: number;
  max: number;
  step: number;
  unit?: string;
  info?: string;
}

export function MolecularProperty({
  label,
  value,
  onChange,
  min,
  max,
  step,
  unit,
  info
}: MolecularPropertyProps) {
  return (
    <div className="space-y-2">
      <div className="flex items-center justify-between">
        <label className="block text-sm font-medium text-gray-700">
          {label}
        </label>
        {info && (
          <div className="group relative">
            <Info className="w-4 h-4 text-gray-400 hover:text-blue-600 cursor-help" />
            <div className="absolute right-0 top-6 w-64 p-2 bg-gray-900 text-white text-xs rounded-lg opacity-0 group-hover:opacity-100 transition-opacity z-10">
              {info}
            </div>
          </div>
        )}
      </div>
      
      <div className="space-y-2">
        <div className="flex items-center space-x-2">
          <input
            type="number"
            value={value}
            onChange={(e) => onChange(parseFloat(e.target.value) || 0)}
            min={min}
            max={max}
            step={step}
            className="w-20 px-2 py-1 text-sm border border-gray-300 rounded focus:ring-1 focus:ring-blue-500 focus:border-transparent"
          />
          {unit && <span className="text-sm text-gray-500">{unit}</span>}
        </div>
        
        <input
          type="range"
          value={value}
          onChange={(e) => onChange(parseFloat(e.target.value))}
          min={min}
          max={max}
          step={step}
          className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer slider"
        />
      </div>
    </div>
  );
}