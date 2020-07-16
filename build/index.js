
let root = document.getElementById('root');
let rootModal = document.getElementById('rootModal');
let GlobalSelectedListaProductos = [];

//let socket = io();

if ('serviceWorker' in navigator) {
    window.addEventListener('load', () =>
   navigator.serviceWorker.register('sw.js')
    .then(registration => console.log('Service Worker registered'))
    .catch(err => 'SW registration failed'));
};

function getView(){
    let view = {
        modalDetalles:()=>{
            return `
            <div class="modal fade" id="modalDetalles" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div class="modal-dialog modal-dialog modal-lg" role="document">
                    <div class="modal-content">
                        <div class="modal-header bg-primary text-white">
                            <h3 id="lbTituloGrafico">Gráfico</h3>
                        </div>

                        <div class="modal-body">
                          <div class="">

                          
                          </div>
                    </div>
                </div>
            </div>
            `
        }
    }

    rootModal.innerHTML = view.modalDetalles();

}

function getCard(no,entidad,programa,subprograma,proyecto,actividad,renglon,fuente,nombre,vigente,comprometido,devengado,pagado,ejecucion){
  
    return `
        <div class="col-12">
            <div class="card shadow border-primary">
                <div class="card-header p-0 bg-primary">
                    <h5 class="text-white text-left">Filtro: ${no}</h5>
                </div>
                <div class="card-body text-center small">
                    <div class="row row-cols-sm-2 row-cols-md-5 row-cols-lg-9 row-cols-xl-9">
                        <div class="col">
                            <b>Entidad</b>
                            <br>${entidad}
                                <br>
                                <br>
                            <b>Entidad</b>
                            <br>${entidad}
                        </div>
                        <div class="col">
                            <b>Programa</b>
                            <br>${programa}
                            <br><br>
                            <b>Nombre</b>
                            <br>${nombre}
                        </div>
                        <div class="col">
                            <b>Subprograma</b>
                            <br>${subprograma}
                            <br><br>
                            <b>Vigente</b>
                            <br>${vigente}
                        </div>
                        <div class="col">
                            <b>Proyecto</b>
                            <br>${proyecto}
                            <br><br>
                            <b>Comprometido</b>
                            <br>${comprometido}
                        </div>
                        <div class="col">
                            <b>Actividad</b>
                            <br>${actividad}
                            <br><br>
                            <b>Devengado</b>
                            <br>${devengado}
                        </div>
                        <div class="col">
                            <b>Renglón</b>
                            <br>${renglon}
                            <br><br>
                            <b>Pagado</b>
                            <br>${pagado}
                        </div>
                        <div class="col">
                            <b>Fuente:</b>
                            <br>${fuente}
                            <br><br>
                            <b>% Ejecución</b>
                            <br>${ejecucion}
                        </div>
                        <div class="col">
                            <button class="btn btn-secondary btn-sm btn-circle" onclick="getDetallesCard();">
                                +
                            </button>
                        </div>
                    </div>    

                    
                </div>
            </div>
            <br>
        </div>
        
        `
};

function getDetallesCard(){


    $('#modalDetalles').modal('show');

}

function addListeners(){

    // carga la lista de cards
    let str = '';
    data.map((rows)=>{
        str = str + getCard(rows.no, rows.entidad, rows.programa, rows.subprograma, rows.proyecto, rows.actividad, rows.renglon, rows.fuente,rows.nombre,rows.vigente,rows.comprometido,rows.devengado,rows.pagado,rows.ejecucion)
    }
    );
    root.innerHTML = str;

}

function iniciarIndex(){
    getView();
    addListeners();

};

iniciarIndex();

