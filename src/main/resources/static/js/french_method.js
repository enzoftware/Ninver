var finance = new Finance();
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

//datos finales

var tir = 10.5;

// EVENTOS DEL DOM

$('#calcular').on('click', function () {
    console.log("CALCULAR");
    getValuesIntermediate();
    setValuesIntermediate();
    metodoFrancesPrimerCalculo();

    $.ajax({
        type : 'POST',
        url : '/calcular'
    });

    $(this).attr('disabled',true);
    $("#recalcular").attr('disabled',false);
    $("#genpdf").attr('disabled',false);
    $("#reload").attr('disabled',false);

});

$("#genpdf").click(function() {


    html2canvas($('#tableResult').get(0)).then(function(canvas) {
        var dataURL = canvas.toDataURL('image/png');
        var w = window.open('about:blank', 'image from canvas');
        w.document.write("<img src='" + dataURL + "' alt='from canvas'/>");
    });


    console.log("PDF GENERADO");
    $.ajax({
       type : 'POST',
       url : '/pdf'
    });

    var data = table.row(0).data();

});

$("#recalcular").click(function() {

    console.log("RECALCULAR");
    $.ajax({
        type : 'POST',
        url : '/recalcular'
    });

    recalcularMetodoFrances();

});

$("#reload").click(function() {

    console.log("REINICIAR");
    $.ajax({
        type : 'POST',
        url : '/reiniciar'
    });

    location.reload();

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
    tir = $("#tir").val();

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
    _nc: ES EL NUMERO DE LA CUOTA ACTUAL
    
    EL RESULTADO REPRESENTA LA ANUALIDAD O CUOTA A PAGAR
    */
}

// GENERAR TABLAS PARA MOSTRAR

function addRow(_ind,_tea,_tep,_pg,_si,_int,_cuota,_amort,_sf){
    $('#tableResult > tbody:last-child')
        .append(
            '<tr class="table"> ' +
            '<td>'+_ind+'</td>'+
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
    var cuotasparaTIR = [];
    var cuota = parseFloat(calcularCuota(tep,nperiodos,prestamo)).toFixed(2);
    var montoInicial = parseFloat(prestamo).toFixed(2);

    tea = parseFloat(tea).toFixed(2);
    tep = parseFloat(tep).toFixed(7);
    var tea_row = '<input type="number" step="0.01" class="form-control tea" value="'+ tea +'">';
    
    for (var i = 1 ; i <= nperiodos ; i++){
        var interes = parseFloat(calcularInteres(tep,montoInicial)).toFixed(2);
        var amortizacion = parseFloat(calcularAmortizacion(cuota,interes)).toFixed(2);
        var saldoFinal = parseFloat(montoInicial - amortizacion).toFixed(2);
        if(i == nperiodos && saldoFinal < 1){
            saldoFinal = 0.0;
        }

        addRow(i,tea_row,tep,selectPeriodoGracia,montoInicial,interes,cuota,amortizacion,saldoFinal);
        montoInicial = saldoFinal;
    }
    $("#trea").text(calcularTREA(100,9,nperiodos/anos,5));
    $("#tcea").text(calcularTCEA(nperiodos/anos,tir));
    $("#convexidad").text(calcularConvexidad(cuota,tir,prestamo,nperiodos));
    $("#duracion").text(calcularDuracion(nperiodos,cuota,tir,prestamo));
    $("#duracionmodif").text(calcularDuracionModificada(tir,cuota,prestamo,nperiodos));
}


function recalcularMetodoFrances() {
    var table = $("table tbody");
    var last_tea = Number(tea);

    var auxsaldofin = null,cuotaactual = null, cambio = false;

    table.find('tr').each(function (i) {


        var $tds = $(this).find('td'),
            nmonth = Number($tds.eq(0).text()),
            teamonth = Number($tds.eq(1).find('input').val()),
            tepmonth = Number($tds.eq(2).text()),
            pgmonth = $tds.eq(3).find('select option:selected').text(),
            simonth = Number($tds.eq(4).text()),
            interesmonth = Number($tds.eq(5).text()),
            cuotamonth = Number($tds.eq(6).text()),
            amortimonth = Number($tds.eq(7).text()),
            sfmonth = Number($tds.eq(8).text());

        if(auxsaldofin != null){
            simonth = auxsaldofin;
        }

        if(cuotaactual == null){
            cuotaactual = cuotamonth;
        }

        tepmonth = Number(parseFloat(calcTEP(teamonth)).toFixed(7));

        if(Number(last_tea) !== Number(teamonth)){
            cuotamonth = calcularCuotaCambioDeTasa(tepmonth,nperiodos,nmonth,simonth);
            cuotaactual =Number(cuotamonth);
            last_tea = teamonth;
        }

        interesmonth = calcularInteres(tepmonth,simonth);

        switch (pgmonth){
            case 'P':
                cambio = true;
                cuotamonth = interesmonth;
                amortimonth = 0.00;
                break;
            case 'T':
                cambio = true;
                amortimonth = 0.00;
                cuotamonth = 0.00;
                break;
            case 'S':
                if(cambio === true){
                    cuotamonth = calcularCuotaCambioDeTasa(tepmonth,nperiodos,nmonth,simonth);
                    cuotaactual =Number(cuotamonth);
                }
                amortimonth = cuotamonth - interesmonth;
                break;
            default:
                console.log("default");
                break;
        }

        sfmonth = simonth + interesmonth - cuotamonth;
        auxsaldofin = sfmonth;

        if(cambio === true){
            if(sfmonth < 1) sfmonth = 0;
            console.log(simonth+" "+interesmonth+" "+cuotamonth+" "+amortimonth+" "+sfmonth);
            $tds.eq(0).text(nmonth);
            $tds.eq(1).find('input').val(teamonth);
            $tds.eq(2).text(tepmonth.toFixed(7));
            $tds.eq(3).find('select option:selected').text(pgmonth);
            $tds.eq(4).text(simonth.toFixed(2));
            $tds.eq(5).text(interesmonth.toFixed(2));
            $tds.eq(6).text(cuotamonth.toFixed(2));
            $tds.eq(7).text(amortimonth.toFixed(2));
            $tds.eq(8).text(sfmonth.toFixed(2));

        }else {
            if(sfmonth < 1) sfmonth = 0;
            console.log(simonth+" "+interesmonth+" "+cuotaactual+" "+amortimonth+" "+sfmonth);
            $tds.eq(0).text(nmonth);
            $tds.eq(1).find('input').val(teamonth);
            $tds.eq(2).text(tepmonth.toFixed(7));
            $tds.eq(3).find('select option:selected').text(pgmonth);
            $tds.eq(4).text(simonth.toFixed(2));
            $tds.eq(5).text(interesmonth.toFixed(2));
            $tds.eq(6).text(cuotaactual.toFixed(2));
            $tds.eq(7).text(amortimonth.toFixed(2));
            $tds.eq(8).text(sfmonth.toFixed(2));
        }
    });

}

function calcularTIR() {
    return finance.IRR(prestamo*-1);
}

function calcularTCEA(_k,_tir) {
    return Math.pow(1+_tir,_k)-1;
}

function calcularTREA(_vf,_va,_p,_t) {
    var b = _vf / _va;
    var e = _p / _t;
    console.log(b+" "+e);
    return ( Math.pow(b ,e) - 1 ) * 100;
}

function calcularConvexidad(_cuota,_tir,_p,_n){
    var conv_sum = 0;
    for (var i = 0 ; i < _n ; i++){
        conv_sum += ((_cuota/(Math.pow(1+_tir,i)))*(Math.pow(i,2)+i));
    }
    return (1/(_p*(Math.pow(1+_tir,2))))*conv_sum;
}

function calcularDuracion(_n,_cuota,_tir,_p){
    var dura_sum = 0;
    for (var i = 0 ; i < _n; i++){
        dura_sum += ((i*_cuota)/(Math.pow(1+_tir,i)));
    }
    return dura_sum / _p;
}

function calcularDuracionModificada(_tir,_cuota,_p,_n){
    var dur = calcularDuracion(_n,_cuota,_tir,_p);
    var dm = (-1/(1+_tir))*dur;
    if(dm < 0){
        return dm * -1
    }else{
        return dm;
    }
}

