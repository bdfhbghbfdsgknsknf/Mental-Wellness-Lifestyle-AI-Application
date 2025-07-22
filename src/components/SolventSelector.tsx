import React from 'react';
import { Droplets } from 'lucide-react';
import type { Solvent } from '../types';

interface SolventSelectorProps {
  selectedSolvents: Solvent[];
  onSelectionChange: (solvents: Solvent[]) => void;
}

const availableSolvents: Solvent[] = [
  { id: 'water', name: 'Water', dielectricConstant: 80.1, polarity: 'high' },
  { id: 'ethanol', name: 'Ethanol', dielectricConstant: 24.5, polarity: 'medium' },
  { id: 'dmso', name: 'DMSO', dielectricConstant: 46.7, polarity: 'high' },
  { id: 'chloroform', name: 'Chloroform', dielectricConstant: 4.8, polarity: 'low' },
  { id: 'acetone', name: 'Acetone', dielectricConstant: 20.7, polarity: 'medium' },
  { id: 'hexane', name: 'Hexane', dielectricConstant: 1.9, polarity: 'low' }
];

export function SolventSelector({ selectedSolvents, onSelectionChange }: SolventSelectorProps) {
  const toggleSolvent = (solvent: Solvent) => {
    const isSelected = selectedSolvents.some(s => s.id === solvent.id);
    if (isSelected) {
      onSelectionChange(selectedSolvents.filter(s => s.id !== solvent.id));
    } else {
      onSelectionChange([...selectedSolvents, solvent]);
    }
  };

  return (
    <div className="space-y-3">
      <div className="flex items-center space-x-2">
        <Droplets className="w-5 h-5 text-blue-600" />
        <h3 className="font-medium text-gray-900">Select Solvents</h3>
      </div>
      
      <div className="grid grid-cols-2 gap-2">
        {availableSolvents.map((solvent) => {
          const isSelected = selectedSolvents.some(s => s.id === solvent.id);
          return (
            <button
              key={solvent.id}
              onClick={() => toggleSolvent(solvent)}
              className={`p-3 text-sm rounded-lg border transition-all duration-200 ${
                isSelected
                  ? 'bg-blue-50 border-blue-300 text-blue-700'
                  : 'bg-white border-gray-200 text-gray-700 hover:border-blue-200 hover:bg-blue-50'
              }`}
            >
              <div className="font-medium">{solvent.name}</div>
              <div className="text-xs text-gray-500">
                ε = {solvent.dielectricConstant}
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
}