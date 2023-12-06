document.addEventListener('DOMContentLoaded', (): void => {
  const inputs = document.querySelectorAll('.field__input:not([type=radio])') as NodeListOf<HTMLInputElement> | undefined
  const fileInputs = document.querySelectorAll('.field__input[type=file]') as NodeListOf<HTMLInputElement> | undefined
  if(inputs) [...inputs].forEach(input => setEventsListener(input))
  if(fileInputs) setFileInputs(fileInputs)
})

const setFileInputs = (fileInputs: NodeListOf<HTMLInputElement>): void => {
  [...fileInputs].forEach(input => {
    input.addEventListener('DOMContentLoaded', () => validateInputsFile(input))
    input.addEventListener('blur', () => validateInputsFile(input))
    input.addEventListener('focus', () => validateInputsFile(input))
    input.addEventListener('change', () => validateInputsFile(input))
  })
}

const validateInputsFile = (input: HTMLInputElement): void => {
  if(input.files?.length === 0 || !input.files) return

  const next = input.nextElementSibling as HTMLElement | undefined
  if(next?.tagName === 'UL') next?.remove()

  const ul = document.createElement('ul') as HTMLUListElement
  ul.className = 'field__list';
  [...input.files].forEach(file => {
    const li = document.createElement('li') as HTMLLIElement
    li.innerText = file.name
    ul.appendChild(li)
  })
  input.insertAdjacentElement('afterend', ul)
}

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