function Planta({ imagem, nome }) {
  const handleDragStart = (e) => {
    e.dataTransfer.setData("planta", imagem);
  };

  return (
    <img
      src={imagem}
      alt={nome}
      width="60"
      draggable
      onDragStart={handleDragStart}
    />
  );
}

export default Planta;