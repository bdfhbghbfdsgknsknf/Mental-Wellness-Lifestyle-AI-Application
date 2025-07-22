import React from 'react';
import { Database, Download } from 'lucide-react';
import type { Molecule } from '../types';

interface MoleculeDatabaseProps {
  onLoadMolecule: (molecule: Molecule) => void;
}

const presetMolecules: Molecule[] = [
  {
    name: 'Aspirin',
    molecularWeight: 180.16,
    logP: 1.19,
    polarSurfaceArea: 63.6,
    hbondDonors: 1,
    hbondAcceptors: 4,
    rotatableBonds: 3
  },
  {
    name: 'Caffeine',
    molecularWeight: 194.19,
    logP: -0.07,
    polarSurfaceArea: 58.4,
    hbondDonors: 0,
    hbondAcceptors: 6,
    rotatableBonds: 0
  },
  {
    name: 'Ibuprofen',
    molecularWeight: 206.28,
    logP: 3.97,
    polarSurfaceArea: 37.3,
    hbondDonors: 1,
    hbondAcceptors: 2,
    rotatableBonds: 4
  },
  {
    name: 'Acetaminophen',
    molecularWeight: 151.16,
    logP: 0.46,
    polarSurfaceArea: 49.3,
    hbondDonors: 2,
    hbondAcceptors: 2,
    rotatableBonds: 1
  },
  {
    name: 'Warfarin',
    molecularWeight: 308.33,
    logP: 2.7,
    polarSurfaceArea: 62.9,
    hbondDonors: 1,
    hbondAcceptors: 5,
    rotatableBonds: 5
  },
  {
    name: 'Lipinski Violator',
    molecularWeight: 650.0,
    logP: 6.5,
    polarSurfaceArea: 180.0,
    hbondDonors: 8,
    hbondAcceptors: 12,
    rotatableBonds: 15
  }
];

export function MoleculeDatabase({ onLoadMolecule }: MoleculeDatabaseProps) {
  return (
    <div className="bg-white rounded-xl shadow-lg p-6 border border-blue-100">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center space-x-2">
          <Database className="w-5 h-5 text-blue-600" />
          <h3 className="text-lg font-semibold text-gray-900">
            Molecule Library
          </h3>
        </div>
        <button className="text-sm text-blue-600 hover:text-blue-700 flex items-center space-x-1">
          <Download className="w-4 h-4" />
          <span>Export Data</span>
        </button>
      </div>

      <p className="text-sm text-gray-600 mb-4">
        Load preset molecules to quickly test solubility predictions
      </p>

      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-3">
        {presetMolecules.map((molecule) => (
          <button
            key={molecule.name}
            onClick={() => onLoadMolecule(molecule)}
            className="p-3 text-left border border-gray-200 rounded-lg hover:border-blue-300 hover:bg-blue-50 transition-all duration-200"
          >
            <div className="font-medium text-gray-900 text-sm">{molecule.name}</div>
            <div className="text-xs text-gray-600 mt-1">
              MW: {molecule.molecularWeight} Da
            </div>
            <div className="text-xs text-gray-600">
              LogP: {molecule.logP}
            </div>
          </button>
        ))}
      </div>
    </div>
  );
}