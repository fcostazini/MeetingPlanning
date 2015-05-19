
function arrayContains(array, valor) {
	return array.indexOf(valor) > =0;
}



function TotalCategoria(gastoCategoria, cantidadPersonas) {
	this.gastoCategoria = gastoCategoria;
	this.cantidadPersonas = cantidadPersonas;
}
	TotalCategoria.prototype.getNombre = function() { return this.gastoCategoria.nombre; };
	TotalCategoria.prototype.getGasto = function() { return this.gastoCategoria.gasto; };
	TotalCategoria.prototype.agregarGasto = function(valor) { this.gastoCategoria.agregarGasto(valor)};
	
	
	
function GastoCategoria(nombre,gasto){
	this.nombre = nombre;
	this.gasto = gasto;
}
	GastoCategoria.prototype.agregarGasto = function(valor){this.gasto += valor;};
	GastoCategoria.prototype.equals = function(valor){return this.nombre==valor.nombre;};



function Invitado(gestorCategoria, nombre){
	this.categoriasNoConsumidas = [];
	this.gastosCategoria = [];
	this.gestorCategoria = gestorCategoria;
	this.nombre = nombre;
}	

	Invitado.prototype.agregarANoConsumir = function(nombreCategoria){
		if(!arrayContains(this.categoriasNoConsumidas, nombreCategoria)){
			this.categoriasNoConsumidas[this.categoriasNoConsumidas.length] = nombreCategoria;
		}
		//Agregar llamado al gestor para restar uno de la categoria
	}

	Invitado.prototype.quitarDeNoConsumir = function(nombreCategoria){
			
			var  posicion = this.categoriasNoConsumidas.indexOf(nombreCategoria);
			if(posicion>=0){
				this.categoriasNoConsumidas.splice(posicion,1);
			}
		//Agregar llamado al gestor para sumar uno de la categoria
	}
	
	Invitado.prototype.agregarGasto = function(gastoCategoria){
		for(var i in this.gastosCategoria){
			if(gastoCategoria.equals(this.gastosCategoria[i])){
				return false;
			}
		}
		this.gastosCategoria[this.gastosCategoria.length] = gastoCategoria;
	}
	
	Invitado.prototype.quitarGasto = function(gastoCategoria){
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
	

	
function GestorCategoria(){
	this.totalesCategoria = [];
	
}	



function Evento(){
	this.invitados = [];
	this.gestorCategoria = new GestorCategoria();
}
	
	Evento.prototype.abrirEvento(){
		
	}
	
	Evento.prototype.cerrarEvento(){
		
	}
	
	Evento.prototype.agregarInvitado(nombre){
		for(var i in this.invitado){
			if(nombre==this.invitados[i].nombre)){
				return false;
			}
		}
		this.invitados[this.invitados.length] = new Invitado(this.gestorCategoria, nombre);
		//Falta llamar al gestor y sumar 1 a todas las categorias!
	}
	
	Evento.prototype.quitarInvitado(nombre){
		var posicion = -1;
		for(var i in this.invitado){
			if(nombre==this.invitados[i].nombre)){
				posicion=i;
				break;
			}
		}
		if(posicion<0){
			return false;
		} else {
			this.invitados.splice(posicion,1);			
		}
		//Falta llamar al gestor para:
			//Restar 1 de todas las categorias que consuma el invitado.
			//Restar los gastos de cada categoria que tenga el invitado.
	}


