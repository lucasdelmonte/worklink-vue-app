document.addEventListener('DOMContentLoaded', (): void => {
  const inputs = document.querySelectorAll('.field__input:not([type=radio])') as NodeListOf<HTMLInputElement> | undefined
  if(inputs) [...inputs].forEach(input => setEventsListener(input))
})

const setEventsListener = (input: HTMLInputElement): void => {
  input.addEventListener('DOMContentLoaded', (evt) => validateInputsContent(evt.target))
  input.addEventListener('keyup', (evt) => validateInputsContent(evt.target))
  input.addEventListener('blur', (evt) => validateInputsContent(evt.target))
  input.addEventListener('focus', (evt) => validateInputsContent(evt.target))
}

const validateInputsContent = (target: EventTarget | null): void => {
  const elem = target as HTMLInputElement
  if (!elem) return

  elem.value.length > 0 && elem.value != '' ? elem.classList.add('has-value') : elem.classList.remove('has-value')
}