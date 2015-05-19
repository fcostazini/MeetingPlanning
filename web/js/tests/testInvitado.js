

var TEST = {};

TEST.Invitado = {
	testAgregarGasto : function(){
		var inv = new Invitado("gestor","Facundo");
		inv.agregarGasto(new GastoCategoria("Carne", 20));
		return (inv.gastosCategoria[0].nombre == "Carne" && inv.gastosCategoria[0].gasto == 20 );
	},

	testAgregarGastoYaExistente : function(){
		var inv = new Invitado("gestor","Facundo");
		inv.gastosCategoria[0] = new GastoCategoria("Carne", 20);
		return !inv.agregarGasto(new GastoCategoria("Carne", 50));
	},

	testQuitarGasto : function(){
		var inv = new Invitado("gestor","Facundo");
		var gasto = new GastoCategoria("Carne", 20);
		inv.gastosCategoria[0] = gasto;
		inv.quitarGasto(new GastoCategoria("Carne", 20));
		return (inv.gastosCategoria.indexOf(gasto) == -1);
	},

	testQuitarGastoNoExistente : function(){
		var inv = new Invitado("gestor","Facundo");
		var gasto = new GastoCategoria("Carne", 20);
		inv.gastosCategoria[0] = gasto;
		return !inv.quitarGasto(new GastoCategoria("Bebidas", 10));
	},
	run : function(){
		var resultados = [];
		for(var a in this){
			if(a != "run"){
				var resultado ={};
				resultado.name = a;
				resultado.value =this[a]();
				resultados[resultados.length] = resultado;
			}
		}
		return resultados;
	}
	
	
}

TEST.Evento ={
	test1 : function(){return true},
	run : function(){
		var resultados = [];
		for(var a in this){
			if(a != "run"){
				var resultado ={};
				resultado.name = a;
				resultado.value =this[a]();
				resultados[resultados.length] = resultado;
			}
		}
		return resultados;
	}
}