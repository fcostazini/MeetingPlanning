



function arrayContains(array, valor) {
	return array.indexOf(valor) >= 0;
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
	var totalInvitados = 0;
}	

	GestorCategoria.prototype.sumarInvitado = function(){
		this.totalInvitados++;
		for(var i in this.totalesCategoria){
			this.totalesCategoria[i].cantidadPersonas++;
		}
	}
		
	GestorCategoria.prototype.restarInvitado = function(invitado){
		this.totalInvitados--;
		for (var i in invitado.gastosCategoria){
			for (var j in this.totalesCategoria){
				if (invitado.gastosCategoria[i].nombre==this.totalesCategoria[j].getNombre()){
					this.totalesCategoria[j].agregarGasto(-1*invitado.gastosCategoria[i].gasto);
				}
			}
			
		}
		var encontrado;
		for (var i in this.totalesCategoria){
			encontrado = falso;
			for (var j in invitado.categoriasNoConsumidas){
				if(this.totalesCategoria[i].getNombre()==invitado.categoriasNoConsumidas[j]){
					encontrado = true;
					break;
				}
			}
			if(!encontrado){
				this.totalesCategoria[i].cantidadPersonas--;
			}
		}
		
	}
	


function Evento(){
	this.invitados = [];
	this.gestorCategoria = new GestorCategoria();
}
	
	Evento.prototype.getInvitado = function(nombre){
		for(var i in this.invitado){
			if(nombre==this.invitados[i].nombre){
				return this.invitados[i];
			}
		}
		return null;
	}
	
	Evento.prototype.agregarInvitado  = function(nombre){
		for(var i in this.invitado){
			if(nombre==this.invitados[i].nombre){
				return false;
			}
		}
		this.invitados[this.invitados.length] = new Invitado(this.gestorCategoria, nombre);
		this.gestorCategoria.sumarInvitado();
	}
	
	Evento.prototype.quitarInvitado  = function(nombre){
		var posicion = -1;
		for(var i in this.invitado){
			if(nombre==this.invitados[i].nombre){
				posicion=i;
				break;
			}
		}
		if(posicion<0){
			return false;
		} else {
			this.gestorCategoria.restarInvitado(Evento.getInvitado(posicion));
			this.invitados.splice(posicion,1);			
		}
	}


