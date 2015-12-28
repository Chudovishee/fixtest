"use strict";

//бармен. умеет дополнительные состояния wait и pour
this.Barman = inherit(Human, 
function(){
	Human.apply(this, arguments)
},
{
	attraction: function(){
		return -1;
	},
	setSkills: function( skills ){
		Human.prototype.setSkills.apply(this, arguments);

		if( this.skills.indexOf( "barman" ) == -1 ){
			this.skills.push("barman");
		}
	},
	check: function(){
		if( this.state == "wait" ){
			this.what("протирает стойку и уходит - посетителей больше нет")
			return false;
		}
		return true;
	},
	pour: function( pool ){
		this.state = "wait";
		for(var i = 0, served = 0; i < pool.length && served < this.attributes.stamina; i++){
			if( this.state == "wait" && pool[i].skills.indexOf("barman") == -1){
				this.state = "pour";
			}

			if( pool[i].state == "godrink" ){
				this.what("наливает для " + pool[i].attributes.name)
				pool[i].drink();
				served++;
			}
		}
	},
	action: function( pool, dance){
		if( this.skills.indexOf(dance) >= 0 ){
			Human.prototype.action.apply(this, arguments);		
		}
		else{
			this.pour(pool);
		}
	}
});

