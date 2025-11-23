let draggedElement = null;

// Helper function to reattach drag events to swapped elements
function attachDragEvents(element) {
  element.addEventListener("dragstart", (e) => {
    draggedElement = e.target;
    e.dataTransfer.setData("text/plain", e.target.id);
  });

  element.addEventListener("dragover", (e) => {
    e.preventDefault();
  });

  element.addEventListener("drop", (e) => {
    e.preventDefault();

    const target = e.target;

    if (
      target &&
      target !== draggedElement &&
      target.classList.contains("puzzlePiece")
    ) {
      const draggedParent = draggedElement.parentNode;
      const targetParent = target.parentNode;

      const draggedClone = draggedElement.cloneNode(true);
      const targetClone = target.cloneNode(true);

      draggedParent.replaceChild(targetClone, draggedElement);
      targetParent.replaceChild(draggedClone, target);

      attachDragEvents(draggedClone);
      attachDragEvents(targetClone);
    }
  });
}

function makePiece(pieceNumber) {
  const pieceDiv = document.createElement("div");
  pieceDiv.classList.add("puzzlePiece");
  pieceDiv.setAttribute("draggable", "true");
  pieceDiv.textContent = pieceNumber;
  attachDragEvents(pieceDiv);
  return pieceDiv;
}

function main() {
  const grid = document.querySelector(".puzzleGrid");
  const pieces = Array.from({ length: 25 }, (_, i) => i + 1);

  // Shuffle pieces
  for (let i = pieces.length - 1; i > 0; i--) {
    const randomIndex = Math.floor(Math.random() * (i + 1));
    [pieces[i], pieces[randomIndex]] = [pieces[randomIndex], pieces[i]];
  }

  // Create grid
  pieces.forEach((piece) => {
    const pieceDiv = makePiece(piece);
    grid.appendChild(pieceDiv);
  });
}

main();
