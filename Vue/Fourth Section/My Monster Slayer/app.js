	new Vue({
		el: '#app',
		data: {
			started: false,
			myHealth: 100,
			monsterHealth: 100,
			log: []
		},
		methods: {
			startGame: function(){
				this.started = true;
				this.log = [];
				this.myHealth = 100;
				this.monsterHealth = 100;
			},
			attack: function() {
				var dam = this.calculateDamage(3, 8)
				this.myHealth -= dam;
				this.log.unshift({
					isPlayer: false,
					text: 'Monster attacks with ' + dam + ' damage!'
				});
				if ( this.checkWin() ) {
					return;
				}
				dam = this.calculateDamage(2, 7)
				this.monsterHealth -= dam;
				this.log.unshift({
					isPlayer: true,
					text: 'Player attacks with ' + dam + ' damage!'
				});
				this.checkWin();
			},
			specialAttack: function() {
				var dam = this.calculateDamage(4, 8);
				this.myHealth -= dam;
				this.log.unshift({
					isPlayer: false,
					text: 'Monster specialAttacks with ' + dam + ' damage!'
				});
				if ( this.checkWin() ) {
					return;
				}
				dam = this.calculateDamage(4, 10)
				this.monsterHealth -= dam;
				this.log.unshift({
					isPlayer: true,
					text: 'Player specialAttacks with ' + dam + ' damage!'
				});
				this.checkWin();
			},
			heal: function() {
				this.myHealth += 10; 
				this.myHealth -= this.calculateDamage(3, 8);
				if(this.myHealth > 100){
					this.myHealth = 100;
				}
				this.log.unshift({
					isPlayer: true,
					text: 'Player healed!'
				});
			},
			giveUp: function() {
				this.started = false;
			},
			calculateDamage: function(x, y) {
				return Number((x + Math.random() * y).toFixed());
			},
			checkWin: function() {
				if (this.monsterHealth <= 0){
					if(confirm('You won! New game?')){
						this.startGame();
					} else {
						this.started = false;
					}
					return true;
				} else if ( this.myHealth <= 0){
					if(confirm('You lost! New game?')){
						this.startGame();
					} else {
						this.started = false;
					}
					return true;
				}
				return false;
			}
		}
	});