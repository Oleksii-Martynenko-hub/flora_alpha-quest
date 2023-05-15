import FormStepsIndicator from '@/components/form-steps-indicator/form-steps-indicator'

import styles from './page.module.scss'

export default function Home() {
  return (
    <main className={styles.page}>
      <FormStepsIndicator currentStep={2} />
    </main>
  )
}
