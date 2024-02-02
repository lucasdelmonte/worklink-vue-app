document.addEventListener('click', (e) => {
  const target = e.target as HTMLElement
  if(target.closest('.megamenu__list-first-level')) {
    const secondLevel = target.closest('.megamenu__list-first-level')?.nextElementSibling as HTMLUListElement | undefined
    if(!secondLevel) return

    console.log(secondLevel)
  }
})