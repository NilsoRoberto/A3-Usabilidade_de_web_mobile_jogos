import './Fundo.css';

function Fundo() {
  return (
    <> 
    
      <div className="ContainerGeral">
          <div className='ContainerCaixa1'>1</div>
          <div className='ContainerCaixa2'>2</div>
          <div className='ContainerCaixa3'>3
            <div class="borda-inferior"></div>
            </div>  
          <div className='ContainerCaixa4'>4
            <div class="borda-inferior"></div>
            </div> 
      </div>

      <div className="terra"></div>
    </>
  );
}

export default Fundo;


