const ingresos = [

    new Ingreso('Sueldo', 10000.00),
    new Ingreso('Aguinaldo', 1300.00),
    
];

const egresos = [

    new Egreso('Renta departamento', 390),
    new Egreso('Ropa', 400)

];


function cargarApp(){
    cargarCabecero();
    cargarIngresos();
    cargarEgresos();
}

function totalIngresos(){
    let totalIngreso = 0;
    for (let ingreso of ingresos){
        totalIngreso += ingreso.valor;
    }
    return totalIngreso;
}

function totalEgresos(){
    let totalEgresos = 0;
    for (let egreso of egresos){
        totalEgresos += egreso.valor;
        
    }
    return totalEgresos;
}

function cargarCabecero(){
    let presupuesto = totalIngresos() - totalEgresos();
    let porcentajeEgreso = totalEgresos()/totalIngresos();
    document.getElementById('presupuesto').innerHTML = formatoMoneda(presupuesto);
    document.getElementById('porcentaje').innerHTML = formatoPorcentaje(porcentajeEgreso);
    document.getElementById('ingresos').innerHTML = formatoMoneda(totalIngresos());
    document.getElementById('egresos').innerHTML = formatoMoneda(totalEgresos());
}
//currency : EUR by USD (para pasar de Dolar a Euro) y 'en-US' por 'es-ES'
function formatoMoneda(valor){
    return valor.toLocaleString('en-US',{style:'currency', currency:'USD', minimumFractionDigits:2})
}

function formatoPorcentaje(valor){
    return valor.toLocaleString('en-US', {style:'percent', minimumFractionDigits:2})
}



function cargarIngresos(){
    let ingresosHTML = '';

    for(let ingreso of ingresos){
        ingresosHTML += crearIngresoHTML(ingreso);
    }
    document.getElementById('lista-ingresos').innerHTML = ingresosHTML;
}

function crearIngresoHTML(ingreso){
    let ingresoHTML = `
    <div class="elemento limpiarEstilos">
    <div class="elemento_descripcion">${ingreso.descripcion}</div>
    <div class="derecha limpiarEstilos">
        <div class="elemento_valor">+${formatoMoneda(ingreso.valor)}</div>
        <div class="elemento_eliminar">
            <button class="elemento_eliminar--btn">
                <ion-icon name='close-circle-outline'
                onclick='eliminarIngreso(${ingreso.id})'></ion-icon>
            </button>
        </div>
    </div>
</div>
    
    `;
    return ingresoHTML;
}

function eliminarIngreso(id){
    let indiceEliminar = ingresos.findIndex(ingreso => ingreso.id === id);
    ingresos.splice(indiceEliminar, 1);
    cargarCabecero();
    cargarIngresos();
}

function cargarEgresos(){
    let egresosHTML = '';

    for(let egreso of egresos){
        egresosHTML += crearEgresoHTML(egreso);
    }
    document.getElementById('lista-egresos').innerHTML = egresosHTML;
}

function crearEgresoHTML(egreso){
    let egresoHTML = `
    <div class="elemento limpiarEstilos">
                    <div class="elemento_descripcion">${egreso.descripcion}</div>
                    <div class="derecha limpiar estilos">
                        <div class="elemento_valor">- ${formatoMoneda(egreso.valor)}</div>
                        <div class="elemento_porcentaje"> ${formatoPorcentaje(egreso.valor/totalEgresos())}</div>
                        <div class="elemento_eliminar">
                            <button class="elemento_eliminar--btn">
                                <ion-icon name='close-circle-outline' onclick='eliminarEgresos(${egreso.id})'></ion-icon>
                            </button>
                        </div>
                    </div>
                </div>
    
    `;
    return egresoHTML;
}

function eliminarEgresos(id){
    let indiceEliminar = egresos.findIndex(egreso => egreso.id === id);
    egresos.splice(indiceEliminar, 1);
    cargarCabecero();
    cargarEgresos();
   
}

function agregarDatos(){
    let forma = document.forms['forma'];
    let tipo = forma ['tipo'];
    let descripcion = forma ['descripcion'];
    let valor = forma ['valor'];
    if (descripcion.value !== '' && valor.value !== ''){
        if(tipo.value === 'ingreso'){
            ingresos.push(new Ingreso(descripcion.value, +valor.value));
            cargarCabecero();
            cargarIngresos();
        }
        else if(tipo.value === 'egreso'){
            egresos.push(new Egreso(descripcion.value, +valor.value));
            cargarCabecero();
            cargarEgresos();
        }
    }
}