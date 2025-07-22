export interface Molecule {
  name: string;
  molecularWeight: number;
  logP: number;
  polarSurfaceArea: number;
  hbondDonors: number;
  hbondAcceptors: number;
  rotatableBonds: number;
}

export interface Solvent {
  id: string;
  name: string;
  dielectricConstant: number;
  polarity: 'low' | 'medium' | 'high';
}

export interface SolubilityPrediction {
  solvent: Solvent;
  solubility: number; // mg/mL
  confidence: number; // 0-1
  factors: {
    molecularWeight: number;
    logP: number;
    polarSurfaceArea: number;
    hbonds: number;
  };
}