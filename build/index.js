
let root = document.getElementById('root');
let rootModal = document.getElementById('rootModal');
let GlobalSelectedListaProductos = [];

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
                <div class="modal-dialog modal-dialog modal-xl" role="document">
                    <div class="modal-content">
                        <div class="modal-header bg-primary text-white text-center">
                            <h5 class="text-center" id="lbTituloGrafico">Gráfico</h5>
                        </div>
                        <div class="modal-body">
                            <br>
                            <div class="table-responsive  col-12">
                                <table class="table table-responsive table-hover table-striped small">
                                    <thead class="bg-dark text-white">
                                        <tr>
                                            <td>Entidad</td>
                                            <td>Nombre</td>
                                            <td>Vigente</td>
                                            <td>Comprometido</td>
                                            <td>Devengado</td>
                                            <td>Pagado</td>
                                            <td>%Ejecución</td>
                                        </tr>
                                    </thead>
                                    <tbody id="tblA">
                                        
                                    </tbody>
                                </table>
                            </div>
                            
                            <div class="table-responsive col-12">
                                <table class="table table-responsive table-hover table-striped small">
                                    <thead class="bg-dark text-white">
                                        <tr>
                                            <td>PRG</td>
                                            <td>SUBP</td>
                                            <td>PROY</td>
                                            <td>ACT</td>
                                            <td>REN</td>
                                            <td>FTE</td>
                                        </tr>
                                    </thead>
                                    <tbody id="tblB">
                                        
                                    </tbody>
                                </table>
                            </div>

                        </div>
                        <div class="modal-body">
                            <h6 class="text-center" id="lbTituloGrafico2">Gráfico</h6>

                            <canvas id="barChart"></canvas>
                         
                        </div>
                        <div class="modal-footer">
                            <button class="btn btn-md btn-outline-success" data-dismiss="modal">Aceptar</button>
                        </div>
                    </div>
                </div>
            </div>
            `
        }
    }

    rootModal.innerHTML = view.modalDetalles();

}

function setMoneda(num,signo) {
    num = num.toString().replace(/\$|\,/g, '');
    if (isNaN(num)) num = "0";
    sign = (num == (num = Math.abs(num)));
    num = Math.floor(num * 100 + 0.50000000001);
    cents = num % 100;
    num = Math.floor(num / 100).toString();
    if (cents < 10) cents = "0" + cents;
    for (var i = 0; i < Math.floor((num.length - (1 + i)) / 3); i++)
        num = num.substring(0, num.length - (4 * i + 3)) + ',' + num.substring(num.length - (4 * i + 3));
    return (((sign) ? '' : '-') + signo + ' ' + num + ((cents == "00") ? '' : '.' + cents));
};

function getCard(no,titulo,entidad,programa,subprograma,proyecto,actividad,renglon,fuente,nombre,vigente,comprometido,devengado,pagado,ejecucion,organismo,correlativo){
  
    return `
        <div class="col-12">
            <div class="card shadow border-primary">
                <div class="card-header p-0 bg-primary">
                    <h5 class="text-white text-left">${no}         ${titulo}</h5>
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
                            <br>${setMoneda(vigente,'')}
                        </div>
                        <div class="col">
                            <b>Proyecto</b>
                            <br>${proyecto}
                            <br><br>
                            <b>Comprometido</b>
                            <br>${setMoneda(comprometido,'')}
                        </div>
                        <div class="col">
                            <b>Actividad</b>
                            <br>${actividad}
                            <br><br>
                            <b>Devengado</b>
                            <br>${setMoneda(devengado,'')}
                        </div>
                        <div class="col">
                            <b>Renglón</b>
                            <br>${renglon}
                            <br><br>
                            <b>Pagado</b>
                            <br>${setMoneda(pagado,'')}
                        </div>
                        <div class="col">
                            <b>Fuente:</b>
                            <br>${fuente}
                            <br><br>
                            <b>% Ejecución</b>
                            <br>${ejecucion}
                        </div>
                        <div class="col">
                            <b>Organismo</b>
                            <br>${organismo}
                            <br><br>
                            <b>Correlativo</b>
                            <br>${correlativo}
                        </div>

                        <div class="col">
                            <button class="btn btn-secondary btn-md btn-circle" onclick=
                            "getDetallesCard(${no},'${entidad}','${programa}','${subprograma}','${proyecto}','${actividad}','${renglon}','${fuente}','${nombre}','${vigente}','${comprometido}','${devengado}','${pagado}','${ejecucion}');">
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

function getDetallesCard(no,entidad,programa,subprograma,proyecto,actividad,renglon,fuente,nombre,vigente,comprometido,devengado,pagado,ejecucion){
    
    document.getElementById('lbTituloGrafico').innerText= nombre;
    document.getElementById('lbTituloGrafico2').innerText= nombre;

    //DETALLES DE LA TABLA INICIAL DEL MODAL
    document.getElementById('tblA').innerHTML = `<tr>
                                                    <td>${entidad}</td>
                                                    <td>${nombre}</td>
                                                    <td>${setMoneda(vigente,'')}</td>
                                                    <td>${setMoneda(comprometido,'')}</td>
                                                    <td>${setMoneda(devengado,'')}</td>
                                                    <td>${setMoneda(pagado,'')}</td>
                                                    <td>${ejecucion}</td>
                                                </tr>`

    document.getElementById('tblB').innerHTML = `<tr>
                                                    <td>${programa}</td>
                                                    <td>${subprograma}</td>
                                                    <td>${proyecto}</td>
                                                    <td>${actividad}</td>
                                                    <td>${renglon}</td>
                                                    <td>${fuente}</td>
                                                </tr>`

    // CARGANDO DATOS DE LA GRAFICA
    let labels = [];
    let dataset = [];
    
    labels.push("Vigente");
    labels.push("Comprometido");
    labels.push("Devengado");
    labels.push("Pagado");

    dataset.push(Number(vigente));
    dataset.push(Number(comprometido));
    dataset.push(Number(devengado));
    dataset.push(Number(pagado));

    var data = {
        labels: labels,
        datasets: [{
        label: 'Q',
        data: dataset,
        backgroundColor: 'rgba(54, 162, 235, 0.2)',
        borderColor: 'rgba(54, 162, 235, 1)',
        borderWidth: 1,
        fill: false
        }]
    };

    var options = {
        scales: {
        yAxes: [{
            ticks: {
            beginAtZero: true
            }
        }]
        },
        legend: {
        display: false
        },
        elements: {
        point: {
            radius: 0
        }
        }
    };

    var barChartCanvas = $("#barChart").get(0).getContext("2d");
    var barChart = new Chart(barChartCanvas, {type: 'bar', data: data, options: options});

    $('#modalDetalles').modal('show');

};

function addListeners(){

    // carga la lista de cards
    let str = '';
    data.map((rows)=>{
        str = str + getCard(rows.no, rows.titulo, rows.entidad, rows.programa, rows.subprograma, rows.proyecto, rows.actividad, rows.renglon, rows.fuente,rows.nombre,rows.vigente,rows.comprometido,rows.devengado,rows.pagado,rows.ejecucion,rows.organismo,rows.correlativo)
    }
    );
    root.innerHTML = str;

};

function iniciarIndex(){
    getView();
    addListeners();

};

iniciarIndex();

