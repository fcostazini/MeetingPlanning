
if(TEST == undefined){
	var TEST = {};
}

TEST.Evento = {

	testAgregarInvitado : function(){
		var evento = new Evento();
		evento.invitados[0] = {nombre:"juan"};
		evento.agregarInvitado("Facundo");
		return evento.invitados.length = 2 && evento.invitados[1].nombre =="Facundo";
		
	},
	testAgregarInvitadoYaExistente : function(){
		var evento = new Evento();
		evento.invitados[0] = {nombre:"Facundo"};
		return !evento.agregarInvitado("Facundo") && evento.invitados.length == 1;
		
	},
	testQuitarInvitado : function(){
		var evento = new Evento();
		
		evento.invitados[0] = {nombre:"Facundo"};
		evento.invitados[1] = {nombre:"juan"};
		evento.quitarInvitado("Facundo");
		return evento.invitados.length = 1 && evento.invitados[0].nombre == "juan";
		
	},
	testQuitarInvitadoNoExistente : function(){
		var evento = new Evento();
		evento.invitados[0] = {nombre:"Facundo"};
		return !evento.quitarInvitado("Pedro") && evento.invitados.length == 1;
		
	},
	testGetInvitado :function(){
		var evento = new Evento();
		evento.invitados[0] = {nombre:"Pedro"};
		return evento.getInvitado("Pedro") !=null && evento.getInvitado("Pedro").nombre == "Pedro";
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
