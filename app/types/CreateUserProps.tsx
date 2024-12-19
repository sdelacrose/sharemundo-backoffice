export interface AssignProductProps {
  goToNextStep: () => void;
  goToPreviousStep: () => void;
}
export interface Step {
  label: string;
  isCompleted: boolean;
}

export interface StepIndicatorProps {
  steps: Step[];
  currentStep: number;
}

export interface SetupBasicProps {
  goToNextStep: () => void;
  goToPreviousStep?: () => void;
}
export interface OptionalSettingProps {
  goToNextStep: () => void;
  goToPreviousStep: () => void;
  handleClose: any;
}
export interface ReviewFinishProps {
  goToNextStep: () => void;
  goToPreviousStep: () => void;
  isLastStep?: boolean;
}
