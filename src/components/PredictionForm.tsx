import React from 'react';
import { Calculator, Settings } from 'lucide-react';
import { MolecularProperty } from './MolecularProperty';
import { SolventSelector } from './SolventSelector';
import type { Molecule, Solvent } from '../types';

interface PredictionFormProps {
  molecule: Molecule;
  selectedSolvents: Solvent[];
  isLoading: boolean;
  onMoleculeUpdate: (updates: Partial<Molecule>) => void;
  onSolventsUpdate: (solvents: Solvent[]) => void;
  onPredict: () => void;
}

export function PredictionForm({
  molecule,
  selectedSolvents,
  isLoading,
  onMoleculeUpdate,
  onSolventsUpdate,
  onPredict
}: PredictionFormProps) {
  return (
    <div className="bg-white rounded-xl shadow-lg p-6 border border-blue-100">
      <div className="flex items-center space-x-2 mb-6">
        <Settings className="w-5 h-5 text-blue-600" />
        <h2 className="text-xl font-semibold text-gray-900">
          Molecular Properties Input
        </h2>
      </div>

      <div className="space-y-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Molecule Name
          </label>
          <input
            type="text"
            value={molecule.name}
            onChange={(e) => onMoleculeUpdate({ name: e.target.value })}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            placeholder="Enter molecule name"
          />
        </div>

        <div className="grid md:grid-cols-2 gap-4">
          <MolecularProperty
            label="Molecular Weight (Da)"
            value={molecule.molecularWeight}
            onChange={(value) => onMoleculeUpdate({ molecularWeight: value })}
            min={50}
            max={1000}
            step={1}
            unit="Da"
            info="Molecular weight affects membrane permeability and solubility"
          />

          <MolecularProperty
            label="LogP (Octanol-Water)"
            value={molecule.logP}
            onChange={(value) => onMoleculeUpdate({ logP: value })}
            min={-3}
            max={8}
            step={0.1}
            info="Lipophilicity parameter - higher values indicate more lipophilic molecules"
          />

          <MolecularProperty
            label="Polar Surface Area (Ų)"
            value={molecule.polarSurfaceArea}
            onChange={(value) => onMoleculeUpdate({ polarSurfaceArea: value })}
            min={0}
            max={300}
            step={1}
            unit="Ų"
            info="Total polar surface area affects solubility and permeability"
          />

          <MolecularProperty
            label="H-Bond Donors"
            value={molecule.hbondDonors}
            onChange={(value) => onMoleculeUpdate({ hbondDonors: value })}
            min={0}
            max={20}
            step={1}
            info="Number of hydrogen bond donor groups"
          />

          <MolecularProperty
            label="H-Bond Acceptors"
            value={molecule.hbondAcceptors}
            onChange={(value) => onMoleculeUpdate({ hbondAcceptors: value })}
            min={0}
            max={20}
            step={1}
            info="Number of hydrogen bond acceptor groups"
          />

          <MolecularProperty
            label="Rotatable Bonds"
            value={molecule.rotatableBonds}
            onChange={(value) => onMoleculeUpdate({ rotatableBonds: value })}
            min={0}
            max={30}
            step={1}
            info="Number of rotatable bonds affects molecular flexibility"
          />
        </div>

        <SolventSelector
          selectedSolvents={selectedSolvents}
          onSelectionChange={onSolventsUpdate}
        />

        <button
          onClick={onPredict}
          disabled={isLoading || !molecule.name}
          className="w-full bg-gradient-to-r from-blue-600 to-emerald-600 text-white py-3 px-4 rounded-lg font-medium hover:from-blue-700 hover:to-emerald-700 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 flex items-center justify-center space-x-2"
        >
          <Calculator className="w-5 h-5" />
          <span>{isLoading ? 'Predicting...' : 'Predict Solubility'}</span>
        </button>
      </div>
    </div>
  );
}