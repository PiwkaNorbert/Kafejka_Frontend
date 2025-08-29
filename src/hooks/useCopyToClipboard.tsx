import * as React from 'react'

function oldSchoolCopy(text: string) {
  const tempTextArea = document.createElement('textarea')
  tempTextArea.value = text
  document.body.appendChild(tempTextArea)
  tempTextArea.select()
  document.execCommand('copy')
  document.body.removeChild(tempTextArea)
}

type CopyFn = (text: string) => string

export default function useCopyToClipboard(): [string, CopyFn] {
  const [text, setText] = React.useState<string>('')

  const copyToClipboard = React.useCallback((value: string): string => {
    const handleCopy = async () => {
      try {
        if (navigator?.clipboard?.writeText) {
          await navigator.clipboard.writeText(value)
          setText(value)
        } else {
          throw new Error('writeText not supported')
        }
      } catch (e) {
        oldSchoolCopy(value)
        setText(value)
      }
      return value
    }

    void handleCopy()
    return value
  }, [])

  return [text, copyToClipboard]
}
