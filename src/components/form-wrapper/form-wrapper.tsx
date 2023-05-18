import styles from './form-wrapper.module.scss'

function FormWrapper({ title, children }: { title: string; children: JSX.Element }) {
  return (
    <div className={styles.formWrapper}>
      <h2 className={styles.title}>{title}</h2>

      {children}
    </div>
  )
}

export default FormWrapper
