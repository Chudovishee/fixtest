"use strict"; 

this.Application = function(){
	var self = this;

	this.timer = setInterval(function(){
		self.step();
	},0)

	this.pool = [];
	this.out = [];
	for(var  i = 0; i < 10; i++){
		var skills = [];
		for(var j = 0; j < this.music.length; j++){
			if(Math.random() > 0.5){
				skills.push( this.music[j] );
			}
		}
		this.pool.push(new Human({
			gender: "male",
			beauty: Math.floor(Math.random()*10+5),
			stamina: Math.floor(Math.random()*10+5),
			weariness: 0,
			bore: 0
		},skills ));
	}

	this.pool.push(new Barman({
		beauty: 5,
		stamina: 1,
		weariness: 0,
		bore: 0
	},["rnb"]));
	this.pool.push(new Barman({
		beauty: 5,
		stamina: 1,
		weariness: 0,
		bore: 0
	},["pop"]));

	this.pool.push(new FatherFrost({
		beauty: 100,
		stamina: 100,
		weariness: 0,
		bore: 0
	},[]));
} 


this.Application.prototype = {
	state: false,
	music: ["rnb", "electro", "pop"],
	pool:[],
	out: [],
	what: function(message){
		console.log(message)
	},
	changeMusic: function(){
		this.state = this.music[ Math.floor( Math.random()*this.music.length ) ]
		this.what("<br/>начинает играть " + this.state)
	},
	step: function(){
		var i;
		if( this.pool.length == 0 ){
			console.log("вечеринка окончена :(<br/>")
			clearTimeout(this.timer)
			return false;
		}

		this.pool.sort(function(a,b){
			if(a.attraction() < b.attraction()) return 1;
			if(a.attraction() > b.attraction()) return -1;
			return 0;
		})

		this.changeMusic();

		for(i = 0; i < this.pool.length; i++){
			this.pool[i].action( this.pool, this.state );			
		}
		for(i = 0; i < this.pool.length;){
			if( !this.pool[i].check() ){
				this.out.push( this.pool[i] );
				this.pool.splice(i,1);
			}
			else{
				i++;
			}
		}
	}

};
