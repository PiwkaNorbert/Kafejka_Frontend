const ErrorCallback = ({ errorMsg }: ErrorCallbackProps) => {
  return (
    <div className=" grid items-start justify-center">
      <h1 className="mb-4 text-2xl">Nastąpił Błąd</h1>
      <p className="rounded-lg border border-destructive/25 bg-destructive/15 p-4 text-destructive">
        Proszę kliknąć przycisk <span className="italic">"odśwież"</span>
        . Jeśli błąd pojawi się ponownie, prosimy poczekać cierpliwie, próbujemy
        naprawić problem.
        <br />
        {errorMsg && 'Błąd: ' + errorMsg}
      </p>
    </div>
  )
}

interface ErrorCallbackProps {
  errorMsg: string
}

export default ErrorCallback
