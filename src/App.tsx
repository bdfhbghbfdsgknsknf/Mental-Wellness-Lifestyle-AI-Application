import React from 'react';
import { Header } from './components/Header';
import { PredictionForm } from './components/PredictionForm';
import { ResultsDisplay } from './components/ResultsDisplay';
import { MoleculeDatabase } from './components/MoleculeDatabase';
import { EducationalContent } from './components/EducationalContent';
import { useSolubilityPredictor } from './hooks/useSolubilityPredictor';

function App() {
  const {
    currentMolecule,
    predictions,
    selectedSolvents,
    isLoading,
    updateMolecule,
    predictSolubility,
    loadPresetMolecule,
    updateSolvents
  } = useSolubilityPredictor();

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
      <Header />
      
      <main className="container mx-auto px-4 py-8 space-y-8">
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Input Section */}
          <div className="lg:col-span-2 space-y-6">
            <PredictionForm
              molecule={currentMolecule}
              selectedSolvents={selectedSolvents}
              isLoading={isLoading}
              onMoleculeUpdate={updateMolecule}
              onSolventsUpdate={updateSolvents}
              onPredict={predictSolubility}
            />
            
            <MoleculeDatabase onLoadMolecule={loadPresetMolecule} />
          </div>

          {/* Results Section */}
          <div className="space-y-6">
            <ResultsDisplay
              molecule={currentMolecule}
              predictions={predictions}
              isLoading={isLoading}
            />
          </div>
        </div>

        <EducationalContent />
      </main>
    </div>
  );
}

export default App;