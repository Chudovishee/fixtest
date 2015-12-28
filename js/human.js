"use strict";

this.Human = function( attributes, skills ){
	this.attributes = {
		gender: false,
		beauty: 0,
		stamina: 0,
		weariness: 0,
		bore: 0,
		name: false
	}
	this.skills = [];
	this.state = false;


	this.setAttributes( attributes );
	this.setSkills( skills );

	if( !this.attributes.name ){
		this.attributes.name = generateName( this.attributes.gender );
	}
}

this.Human.prototype = {
	attributes: {},
	skills:[],
	state: false,// возможные состояния drink,godrink,dance
	setAttributes: function( attributes ){
		extend(this.attributes, attributes)
	},
	setSkills: function( skills ){
		extend(this.skills, skills)
	},
	attraction: function(){
		var result = this.attributes.beauty - this.attributes.weariness;
		if( result < 0) result = 0;
		return result;
	},
	what: function(message){
		console.log( "<b>" + this.attributes.name + ":</b> " + message)
	},

	check: function(){
		if( this.attributes.bore > this.attributes.stamina ){
			this.what("наскучила эта пьянка")
			return false
		}
		if( this.attributes.weariness > this.attributes.stamina ){
			this.what("нет больше сил")
			return false
		}
		if( this.state == "godrink" ){
			this.what("так и не налили, начинает скучать")
			this.attributes.bore++;
		}
		return true;
	},
	drink: function(){
		this.what(" выпивает")
		this.state = "drink";
		this.attributes.weariness++;
	},
	dance: function(dance){
		this.state = "dance"
		this.attributes.weariness++;
		this.what("начинает таневать " + dance)
	},
	action: function( pool, dance ){
		if( this.skills.indexOf(dance) >= 0 ){
			this.dance(dance);
		}
		else{
			this.state = "godrink"	
			this.what("идет в бар чтобы выпить")	
		}
	},
	restore: function(){
		this.attributes.weariness = 0;
		this.attributes.bore = 0;
		this.what("полон сил чтобы продолжать пьянку!")	
	},

}