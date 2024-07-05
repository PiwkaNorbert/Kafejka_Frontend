
const ErrorCallback = ({ errorMsg }: ErrorCallbackProps) => {

  return (
    <div
      className=" grid justify-center items-start"
    >
      <h1 className="text-2xl mb-4">Nastąpił Błąd</h1>
      <p className="text-destructive bg-destructive/15 border border-destructive/25 p-4 rounded-lg">
        Proszę kliknąć przycisk{" "}
        <span className='italic'>
          "odśwież"
        </span>
        . Jeśli błąd pojawi się ponownie, prosimy poczekać cierpliwie, próbujemy naprawić problem.
        <br />
        {errorMsg && 'Błąd: ' + errorMsg}
      </p>
    </div>
  );
};


interface ErrorCallbackProps {
  errorMsg: string;
}

export default ErrorCallback;
