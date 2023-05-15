import styles from './form-steps-indicator.module.scss'

interface FormStepsIndicatorProps {
  currentStep: number
}

function FormStepsIndicator({ currentStep }: FormStepsIndicatorProps) {
  const steps = [
    {
      label: 'Start First Project',
      step: 1,
    },
    {
      label: 'Project Details',
      step: 2,
    },
    {
      label: 'Create Project',
      step: 3,
    },
  ]

  return (
    <aside>
      <ul className={styles.stepsList}>
        {steps.map(({ label, step }) => (
          <li
            key={step}
            className={`${styles.step} ${step === currentStep && styles.current} ${
              step < currentStep && styles.finished
            }`}
          >
            <span className={styles.stepMarker}></span>
            <span className={styles.stepLabel}>{label}</span>
          </li>
        ))}
      </ul>
    </aside>
  )
}

export default FormStepsIndicator
