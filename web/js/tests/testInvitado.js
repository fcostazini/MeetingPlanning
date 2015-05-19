

if(TEST == undefined){
	var TEST = {};
}

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
	testAgregarANoConsumir : function(){
		var inv = new Invitado("gestor","Facundo");
		inv.agregarANoConsumir("carne");
		return inv.categoriasNoConsumidas[0] == "carne";
		
	},
	testAgregarANoConsumirYaExistente : function(){
		var inv = new Invitado("gestor","Facundo");
		inv.categoriasNoConsumidas[0] ="carne";
		return !inv.agregarANoConsumir("carne");
		
		
	},
	testQuitarDeNoConsumir : function(){
		var inv = new Invitado("gestor","Facundo");
		inv.categoriasNoConsumidas[0] = "carne"
		inv.categoriasNoConsumidas[1] = "bebida"
		inv.quitarDeNoConsumir("carne");
		return inv.categoriasNoConsumidas.length == 1 && inv.categoriasNoConsumidas[0] =="bebida";
		
	},
	testQuitarDeNoConsumirNoExistente : function(){
		var inv = new Invitado("gestor","Facundo");
		inv.categoriasNoConsumidas[0] = "carne"
		inv.categoriasNoConsumidas[1] = "bebida"
		return !inv.quitarDeNoConsumir("pan");
		
		
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
