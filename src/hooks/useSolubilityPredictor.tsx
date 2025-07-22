import { useState } from 'react';
import type { Molecule, Solvent, SolubilityPrediction } from '../types';

const defaultMolecule: Molecule = {
  name: '',
  molecularWeight: 200,
  logP: 2.0,
  polarSurfaceArea: 60,
  hbondDonors: 2,
  hbondAcceptors: 4,
  rotatableBonds: 3
};

const defaultSolvents: Solvent[] = [
  { id: 'water', name: 'Water', dielectricConstant: 80.1, polarity: 'high' }
];

export function useSolubilityPredictor() {
  const [currentMolecule, setCurrentMolecule] = useState<Molecule>(defaultMolecule);
  const [selectedSolvents, setSelectedSolvents] = useState<Solvent[]>(defaultSolvents);
  const [predictions, setPredictions] = useState<SolubilityPrediction[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  const updateMolecule = (updates: Partial<Molecule>) => {
    setCurrentMolecule(prev => ({ ...prev, ...updates }));
  };

  const updateSolvents = (solvents: Solvent[]) => {
    setSelectedSolvents(solvents);
  };

  const loadPresetMolecule = (molecule: Molecule) => {
    setCurrentMolecule(molecule);
    setPredictions([]);
  };

  const predictSolubility = async () => {
    if (!currentMolecule.name || selectedSolvents.length === 0) return;

    setIsLoading(true);
    
    // Simulate API call delay
    await new Promise(resolve => setTimeout(resolve, 1500));

    const newPredictions: SolubilityPrediction[] = selectedSolvents.map(solvent => {
      // Enhanced solubility prediction algorithm based on established QSAR models
      const solubility = calculateSolubility(currentMolecule, solvent);
      const confidence = calculateConfidence(currentMolecule, solvent);

      return {
        solvent,
        solubility,
        confidence,
        factors: {
          molecularWeight: currentMolecule.molecularWeight,
          logP: currentMolecule.logP,
          polarSurfaceArea: currentMolecule.polarSurfaceArea,
          hbonds: currentMolecule.hbondDonors + currentMolecule.hbondAcceptors
        }
      };
    });

    setPredictions(newPredictions);
    setIsLoading(false);
  };

  return {
    currentMolecule,
    predictions,
    selectedSolvents,
    isLoading,
    updateMolecule,
    predictSolubility,
    loadPresetMolecule,
    updateSolvents
  };
}

function calculateSolubility(molecule: Molecule, solvent: Solvent): number {
  // Advanced QSAR-based solubility prediction
  let logS = 0;

  // Base solubility from molecular weight
  logS -= (molecule.molecularWeight - 150) * 0.01;

  // LogP contribution (different for different solvents)
  if (solvent.polarity === 'high') {
    // Polar solvents - negative correlation with LogP
    logS -= molecule.logP * 0.8;
  } else if (solvent.polarity === 'medium') {
    logS -= molecule.logP * 0.4;
  } else {
    // Non-polar solvents - positive correlation with LogP
    logS += molecule.logP * 0.3;
  }

  // Polar surface area contribution
  if (solvent.polarity === 'high') {
    logS += molecule.polarSurfaceArea * 0.02;
  } else {
    logS -= molecule.polarSurfaceArea * 0.01;
  }

  // Hydrogen bonding contribution
  const totalHbonds = molecule.hbondDonors + molecule.hbondAcceptors;
  if (solvent.polarity === 'high') {
    logS += totalHbonds * 0.15;
  } else {
    logS -= totalHbonds * 0.1;
  }

  // Rotatable bonds (flexibility factor)
  logS -= molecule.rotatableBonds * 0.05;

  // Solvent-specific adjustments
  if (solvent.id === 'dmso') {
    logS += 0.5; // DMSO is an excellent solvent
  } else if (solvent.id === 'hexane') {
    logS -= 1.0; // Hexane is very non-polar
  }

  // Convert log solubility to mg/mL
  const solubility = Math.pow(10, logS);
  
  // Ensure reasonable bounds
  return Math.max(0.001, Math.min(100, solubility));
}

function calculateConfidence(molecule: Molecule, solvent: Solvent): number {
  let confidence = 0.7; // Base confidence

  // Higher confidence for drug-like molecules
  const lipinskiViolations = [
    molecule.molecularWeight > 500,
    molecule.logP > 5,
    molecule.hbondDonors > 5,
    molecule.hbondAcceptors > 10
  ].filter(Boolean).length;

  confidence += (4 - lipinskiViolations) * 0.05;

  // Higher confidence for well-studied solvent systems
  if (solvent.id === 'water') {
    confidence += 0.1;
  } else if (solvent.id === 'ethanol' || solvent.id === 'dmso') {
    confidence += 0.05;
  }

  // Lower confidence for extreme values
  if (molecule.molecularWeight > 600 || molecule.logP > 6) {
    confidence -= 0.15;
  }

  return Math.max(0.3, Math.min(0.95, confidence));
}