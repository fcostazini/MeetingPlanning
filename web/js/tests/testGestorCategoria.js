
if(TEST == undefined){
	var TEST = {};
}

TEST.GestorCategoria = {

	testAgregarInvitado : function(){
		return true;
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
