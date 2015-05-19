
function arrayContains(array, valor){
	return array.indexOf(valor)>=0;
}

function TotalCategoria(gastoCategoria, cantidadPersonas){
	this.gastoCategoria = gastoCategoria;
	this.cantidadPersonas = cantidadPersonas;
	this.getNombre = function(){ return this.gastoCategoria.nombre; };
	this.getGasto = function(){ return this.gastoCategoria.gasto; };
	this.agregarGasto = function(valor){ this.gastoCategoria.agregarGasto(valor)}
	
}

function GastoCategoria(nombre,gasto){
	this.nombre = nombre;
	this.gasto = gasto;
	this.agregarGasto = function(valor){this.gasto += valor;}
	this.equals = function(valor){return this.nombre==valor.nombre;}
}


function Invitado(gestorCategoria, nombre){
	this.categoriasNoConsumidas = [];
	this.gastosCategoria = [];
	this.gestorCategoria = gestorCategoria;
	this.nombre = nombre;
	
	this.agregarANoConsumir = function(nombreCategoria){
		if(!arrayContains(this.categoriasNoConsumidas, nombreCategoria)){
			this.categoriasNoConsumidas[this.categoriasNoConsumidas.length] = nombreCategoria;
		}
		//Agregar llamado al gestor para restar uno de la categoria
	}

	this.quitarDeNoConsumir = function(nombreCategoria){
			
			var  posicion = this.categoriasNoConsumidas.indexOf(nombreCategoria);
			if(posicion>=0){
				this.categoriasNoConsumidas.splice(posicion,1);
			}
		//Agregar llamado al gestor para sumar uno de la categoria
	}
	
	this.agregarGasto = function(gastoCategoria){
		for(var i in this.gastosCategoria){
			if(gastoCategoria.equals(this.gastosCategoria[i])){
				return false;
			}
		}
		this.gastosCategoria[this.gastosCategoria.length] = gastoCategoria;
	}
	
	this.quitarGasto = function(gastoCategoria){
		var posicion = -1;
		for(var i in this.gastosCategoria){
			if(gastoCategoria.equals(this.gastosCategoria[i])){
				posicion = i;
				break;
			}
		}
		if(posicion<0){
			return false;
		} else {
			this.gastosCategoria.splice(posicion,1);			
		}
	}
	
}
var TEST = {};

TEST.Invitados = {
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
		for(var a in this){
			if(a != "run")
			console.log(a + ": " + this[a]());
		}
	}
	
}

