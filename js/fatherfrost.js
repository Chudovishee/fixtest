"use strict";

//дедмороз умеет wait и give
this.FatherFrost = inherit(Human, 
function(){
	Human.apply(this, arguments)
	this.attributes.name = "Дед-мороз";
},
{
	list: [],
	attraction: function(){
		return -2;
	},
	setSkills: function( skills ){
		Human.prototype.setSkills.apply(this, arguments);

		if( this.skills.indexOf( "fatherfrost" ) == -1 ){
			this.skills.push("fatherfrost");
		}
	},
	check: function(){
		if( this.state == "wait" ){
			this.what("У барной стойки без подарков больше никого нет :(")
			return false;
		}
		return true;
	},
	give: function( pool ){
		var index;
		this.state = "wait";
		for(var i = 0; i < pool.length; i++){
			if( pool[i].state == "godrink" && this.list.indexOf(pool[i].attributes.name) == -1 ){
				this.what("дарит подарок " + pool[i].attributes.name + "!!!")
				this.list.push( pool[i].attributes.name );
				pool[i].restore();
				this.state = "give";
				break;
			}
		}
	},
	action: function( pool, dance){
		this.give(pool);
	}
});

