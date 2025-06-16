function Planta({ imagem, nome }) {
  function handleDragStart(e) {
    e.dataTransfer.setData("planta", imagem); // envia o caminho da imagem
  }

  return (
    <div
      className="planta"
      draggable
      onDragStart={handleDragStart}
    >
      <img src={imagem} alt={nome} width="60" />
    </div>
  );
}

export default Planta;
