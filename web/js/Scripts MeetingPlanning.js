



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
			this.gestorCategoria.agregarNoConsumo(nombreCategoria);
		}
	}

	Invitado.prototype.quitarDeNoConsumir = function(nombreCategoria){
		var  posicion = this.categoriasNoConsumidas.indexOf(nombreCategoria);
		if(posicion>=0){
			this.categoriasNoConsumidas.splice(posicion,1);
			this.gestorCategoria.quitarNoConsumo(nombreCategoria);
		}
	}
	
	Invitado.prototype.agregarGasto = function(gastoCategoria){
		for(var i in this.gastosCategoria){
			if(gastoCategoria.equals(this.gastosCategoria[i])){
				return false;
			}
		}
		this.gastosCategoria[this.gastosCategoria.length] = gastoCategoria;
		this.gestorCategoria.sumarGasto(gastoCategoria);
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
			this.gastosCategoria.splice(posicion, 1);
			this.gestorCategoria.restarGasto(gastoCategoria);
		}
	}



function GestorCategoria(evento){
	this.totalesCategoria = [];
	this.totalInvitados = 0;
	this.evento = evento;
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

	GestorCategoria.prototype.sumarGasto = function(gasto){
		var encontrado;
		encontrado = -1
		for (var i in this.totalesCategoria){
			if(this.totalesCategoria[i].getNombre()==gasto.nombre){
				encontrado = i;
				break;
			}
		}
		if(encontrado>=0){
			this.totalesCategoria[encontrado].agregarGasto(gasto.gasto);
		}
		else {
			this.totalesCategoria[this.totalesCategoria.length] = new TotalCategoria(gasto,this.totalInvitados);
		}
	}

	GestorCategoria.prototype.restarGasto = function(gasto){
		var encontrado;
		encontrado = -1
		for (var i in this.totalesCategoria){
			if(this.totalesCategoria[i].getNombre()==gasto.nombre){
				encontrado = i;
				break;
			}
		}
		if(encontrado>=0){
			this.totalesCategoria[encontrado].agregarGasto(-1*gasto.gasto);
			if (this.totalesCategoria[encontrado].getGasto()<=0){
				this.totalesCategoria.slice(encontrado,1);
				this.evento.actualizarCategorias(gasto.nombre);
			}
		}
		else {
			return false;
		}
	}

	GestorCategoria.prototype.agregarNoConsumo = function(categoria){
		for (var i in this.totalesCategoria){
			if(this.totalesCategoria[i].getNombre()==categoria){
				this.totalesCategoria[i].cantidadPersonas--;
				break;
			}
		}
	}

	GestorCategoria.prototype.quitarNoConsumo = function(categoria){
		for (var i in this.totalesCategoria){
			if(this.totalesCategoria[i].getNombre()==categoria){
				this.totalesCategoria[i].cantidadPersonas++;
				break;
			}
		}
	}
	


function Evento(){
	this.invitados = [];
	this.gestorCategoria = new GestorCategoria(this);
}
	
	Evento.prototype.getInvitado = function(nombre){
		for(var i in this.invitados){
			if(nombre==this.invitados[i].nombre){
				return this.invitados[i];
			}
		}
		return null;
	}
	
	Evento.prototype.agregarInvitado  = function(nombre){
		for(var i in this.invitados){
			if(nombre==this.invitados[i].nombre){
				return false;
			}
		}
		this.invitados[this.invitados.length] = new Invitado(this.gestorCategoria, nombre);
		this.gestorCategoria.sumarInvitado();
	}
	
	Evento.prototype.quitarInvitado  = function(nombre){
		var posicion = -1;
		for(var i in this.invitados){
			if(nombre==this.invitados[i].nombre){
				posicion=i;
				break;
			}
		}
		if(posicion<0){
			return false;
		} else {
			this.gestorCategoria.restarInvitado(this.invitados[i]);
			this.invitados.splice(posicion,1);			
			
		}
	}

	Evento.prototype.actualizarCategorias  = function(categoria){

	}


