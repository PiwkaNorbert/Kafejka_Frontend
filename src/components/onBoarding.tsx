import { useState } from 'react'
import { Button } from './ui/button'

interface TutorialStep {
  position: { x: string; y: string }
  instruction: {
    x: string
    y: string
    text: string
  }
  actionType?: 'setEditing' | 'clearEditing'
  highlightDimensions?: { width: string; height: string }
}
export function OnboardingTutorial({
  onComplete,
  setIsEditing,
}: {
  onComplete: () => void
  setIsEditing: (computerId: number, isEditing: boolean) => void
}) {
  const [currentStep, setCurrentStep] = useState(0)

  const handleAction = (step: TutorialStep) => {
    if (step.actionType === 'setEditing') {
      setIsEditing(1, true)
    } else if (step.actionType === 'clearEditing') {
      setIsEditing(1, false)
    }
  }

  const nextStep = () => {
    if (currentStep < steps.length - 1) {
      const nextStepIndex = currentStep + 1
      setCurrentStep(nextStepIndex)
      if (steps[nextStepIndex]?.actionType) {
        handleAction(steps[nextStepIndex] as TutorialStep)
      }
    } else {
      completeTutorial()
    }
  }

  const prevStep = () => {
    if (currentStep > 0) {
      const prevStepIndex = currentStep - 1
      setCurrentStep(prevStepIndex)
      if (steps[prevStepIndex]?.actionType) {
        handleAction(steps[prevStepIndex] as TutorialStep)
      }
    }
  }

  const completeTutorial = () => {
    localStorage.setItem('kafejkaTutorial', 'true')
    onComplete()
  }

  const currentInstruction = steps[currentStep]?.instruction
  const highlightDimensions = steps[currentStep]?.highlightDimensions || {
    width: '140px',
    height: '55px',
  }

  return (
    <div className="fixed inset-0 z-50">
      {/* Semi-transparent overlay with a "hole" */}
      <div className="absolute inset-0 bg-black bg-opacity-0">
        <div
          className="absolute rounded-md bg-transparent"
          style={{
            left: steps[currentStep]?.position.x,
            top: steps[currentStep]?.position.y,
            width: highlightDimensions.width,
            height: highlightDimensions.height,
            boxShadow: '0 0 0 9999px rgba(0, 0, 0, 0.6)',
          }}
        />
      </div>

      {/* Highlight border */}
      <div
        className="pointer-events-none absolute  rounded-md border-4 border-red-500 bg-transparent"
        style={{
          left: steps[currentStep]?.position?.x,
          top: steps[currentStep]?.position?.y,
          width: highlightDimensions.width,
          height: highlightDimensions.height,
        }}
      />

      {/* Instruction box */}
      <div
        className="absolute w-96 rounded-lg bg-white p-4 shadow-lg"
          style={{ left: currentInstruction?.x, top: currentInstruction?.y }}
      >
        <p className="mb-4 text-muted-foreground">{currentInstruction?.text}</p>
        <div className="flex justify-between">
          <Button onClick={prevStep} disabled={currentStep === 0}>
            Poprzedni krok
          </Button>
          <Button onClick={nextStep}>
            {currentStep === steps.length - 1 ? 'Zakończ' : 'Następny krok'}
          </Button>
        </div>
        <p className="mt-2 text-xs text-gray-500">
          Krok {currentStep + 1} z {steps.length}
        </p>
      </div>
    </div>
  )
}

const steps = [
  {
    position: { x: 'calc(50% - 215px)', y: '187px' },
    instruction: {
      x: 'calc(50% - 70px)',
      y: '139px',
      text: 'Aby rozpocząć edycję, proszę kliknąć na etykietę "Komputer #".',
    },
  },
  {
    position: { x: 'calc(50% - 225px)', y: '187px' },
    instruction: {
      x: 'calc(50% + 135px)',
      y: '139px',
      text: 'W tym miejscu można dokonać modyfikacji nazwy stanowiska komputerowego.',
    },
    actionType: 'setEditing',
    highlightDimensions: { width: '355px', height: '55px' },
  },
  {
    position: { x: 'calc(50% + 55px)', y: '298px' },
    instruction: {
      x: 'calc(50% + 200px)',
      y: '250px',
      text: 'Wybierz czas wyłączenia tutaj, aby zastosować opóźnienie. Jeśli nie wybierzesz czasu, operacja zostanie wykonana natychmiast po kliknięciu "Wyłącz" lub "Restartuj".',
    },
  },
  {
    position: { x: 'calc(50% - 215px)', y: '298px' },
    instruction: {
      x: 'calc(50% - 70px)',
      y: '250px',
      text: 'Kliknij "Wyłącz", aby wyłączyć komputer. Jeśli wybrano czas opóźnienia, operacja zostanie wykonana po tym czasie. W przeciwnym razie komputer zostanie wyłączony natychmiast.',
    },
  },
  {
    position: { x: 'calc(50% - 80px)', y: '298px' },
    instruction: {
      x: 'calc(50% + 65px)',
      y: '250px',
      text: 'Kliknij "Restartuj", aby zrestartować komputer. Zalecamy użycie tej opcji po zakończeniu korzystania ze stanowiska przez czytelnika, aby usunąć wszystkie dane i przywrócić komputer do stanu początkowego. Podobnie jak w przypadku wyłączania, jeśli wybrano czas opóźnienia, restart nastąpi po tym czasie. Bez wybranego opóźnienia, restart rozpocznie się natychmiast.',
    },
  },
]
