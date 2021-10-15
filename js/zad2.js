window.addEventListener('DOMContentLoaded', () => {

  const createBoxBtn = document.querySelector('[data-action="create"]');
  const deleteBoxesBtn = document.querySelector('[data-action="destroy"]');
  const input = document.querySelector('.js-input');
  const boxesWrapper = document.querySelector('#boxes');

  const createBoxes = () => {
    const { value } = input;
    if (Number.isSafeInteger(Number(value))) {
      const defaultBoxSize = 30;
      let extraBoxSize = 0
      for (let i = 0; i < value; i++) {
        let boxSize = defaultBoxSize + extraBoxSize
        const boxDiv = document.createElement("div");

        boxDiv.style.background = 'RED';
        boxDiv.style.width = `${boxSize}px`
        boxDiv.style.height = `${boxSize}px`

        boxesWrapper.appendChild(boxDiv);
        extraBoxSize = extraBoxSize + 10;
      }
    }
  }

  const deleteBoxes = () => {
    boxesWrapper.remove();
  };

  createBoxBtn.addEventListener('click', createBoxes)
  deleteBoxesBtn.addEventListener('click', deleteBoxes)

});
