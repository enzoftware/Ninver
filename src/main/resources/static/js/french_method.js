// CONSTANTES
var ndiasano = 360;

var selectPeriodoGracia =    '       <select class="form-control" id="pg">\n' +
    '                                    <option>S</option>\n' +
    '                                    <option>P</option>\n' +
    '                                    <option>T</option>\n' +
    '                                </select>\n';

// DATOS ENTRADA
var precioVenta = 0;
var porcCuotaInicial = 0;
var tea = 0;
var frecuencia = "empty";
var anos = 0;

//DATOS INTERMEDIOS
var frecuenciaDias = 0;
var tep = 0;
var prestamo = 0;
var nperiodos = 0;


// EVENTOS DEL DOM

$('#calcular').on('click', function () {
    getValuesIntermediate();
    setValuesIntermediate();
    metodoFrancesPrimerCalculo();
});

// FUNCIONES PARA CALCULOS

function calcTEP(_tea) {
    _tea = _tea / 100;
    var base = 1 + _tea;
    var exp = frecuenciaDias / ndiasano;
    return Math.pow(base, exp) - 1;
}

function calcPrestamo(_pv, _ci) {
    return _pv * (1 - (_ci / 100));
}


// GET & SET  VALUES INTERMEDIATE VALUES

function getValuesIntermediate() {
    precioVenta = $('#precioVenta').val();
    porcCuotaInicial = $('#porcCuotaInicial').val();
    tea = $('#tea').val();
    frecuencia = $('#frecuencia').val();
    anos = $('#anos').val();

    switch (frecuencia) {
        case 'Diario':
            frecuenciaDias = 1;
            nperiodos = anos * 360;
            break;
        case 'Mensual':
            frecuenciaDias = 30;
            nperiodos = anos * 12;
            break;
        case 'Bimestral':
            frecuenciaDias = 60;
            nperiodos = anos * 6;
            break;
        case 'Trimestral':
            frecuenciaDias = 90;
            nperiodos = anos * 4;
            break;
        case 'Cuatrimestral':
            frecuenciaDias = 120;
            nperiodos = anos * 3;
            break;
        case 'Semestral':
            frecuenciaDias = 180;
            nperiodos = anos * 2;
            break;
        case 'Anual':
            frecuenciaDias = 360;
            nperiodos = anos * 1;
            break;
    }

    tep = calcTEP(tea);
    prestamo = parseFloat(calcPrestamo(precioVenta,porcCuotaInicial)).toFixed(2);
}

function setValuesIntermediate(){
    $('#tep').text(parseFloat(tep*100).toFixed(7));
    $('#prestamo').text(parseFloat(prestamo).toFixed(2));
    $('#nperiodos').text(nperiodos);
}


// FRENCH METHOD CALCULATE VALUES

function calcularInteres(_tep,_si){
    return _tep * _si;
}

function calcularAmortizacion(_r,_i){
    return _r - _i;
}

function calcularCuota(_tep,_n,_c){
    return _c * ((_tep*Math.pow(1+_tep,_n)/(Math.pow(1+_tep,_n)-1)));
    
    /*
    DONDE : 
    _c: ES EL MONTO DEL PRESTAMO
    _tep: ES LA TASA EFECTIVA DEL PERIODO DE PAGO
    _n: ES EL NUMERO TOTAL DE CUOTAS A PAGAR
    
    EL RESULTADO REPRESENTA LA ANUALIDAD O CUOTA A PAGAR
    */
}

function calcularCuotaCambioDeTasa(_tep,_n,_nc,_c){
    return _c * ((_tep*Math.pow(1+_tep,_n-_nc+1)/(Math.pow(1+_tep,_n-_nc+1)-1)));
    
    /*
    DONDE : 
    _c: ES EL MONTO DEL PRESTAMO
    _tep: ES LA TASA EFECTIVA DEL PERIODO DE PAGO
    _n: ES EL NUMERO TOTAL DE CUOTAS A PAGAR
    
    EL RESULTADO REPRESENTA LA ANUALIDAD O CUOTA A PAGAR
    */
}

// GENERAR TABLAS PARA MOSTRAR

function addRow(_ind,_tea,_tep,_pg,_si,_int,_cuota,_amort,_sf){
    $('#tableResult > tbody:last-child')
        .append(
            '<tr> ' +
            '<th>'+_ind+'</th>'+
            '<td>'+_tea+'</td>'+
            '<td>'+_tep+'</td>'+
            '<td>'+_pg+'</td>'+
            '<td>'+_si+'</td>'+
            '<td>'+_int+'</td>'+
            '<td>'+_cuota+'</td>'+
            '<td>'+_amort+'</td>'+
            '<td>'+_sf+'</td>'+
            '</tr>');
}

function metodoFrancesPrimerCalculo(){
    /*
    var lol = 1;
    var xd = '<input type="number" step="0.01" class="form-control" id="porcCuotaInicial" value="'+ lol +'">';
    addRow(1,1,1,selectPeriodoGracia,1,1,xd,1,1);
    */

    var cuota = parseFloat(calcularCuota(tep,nperiodos,prestamo)).toFixed(2);
    var montoInicial = parseFloat(prestamo).toFixed(2);

    tea = parseFloat(tea).toFixed(2);
    tep = parseFloat(tep).toFixed(7);
    var tea_row = '<input type="number" step="0.01" class="form-control tea" value="'+ tea +'">';
    
    for (var i = 1 ; i <= nperiodos ; i++){
        var interes = parseFloat(calcularInteres(tep,montoInicial)).toFixed(2);
        var amortizacion = parseFloat(calcularAmortizacion(cuota,interes)).toFixed(2);
        var saldoFinal = parseFloat(montoInicial - amortizacion).toFixed(2);
        addRow(i,tea_row,tep,selectPeriodoGracia,montoInicial,interes,cuota,amortizacion,saldoFinal);
        montoInicial = saldoFinal;
    }
}