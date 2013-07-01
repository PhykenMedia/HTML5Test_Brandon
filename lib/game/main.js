ig.module( 
	'game.main' 
)
.requires(
	'impact.game',
	'impact.font',
    'game.utilities.Camera',
	
	'game.entities.SquishKitten',
	
	'game.levels.main'
)
.defines(function(){

MyGame = ig.Game.extend({
	
	// Load a font
	font: new ig.Font( 'media/04b03.font.png' ),
    player: null,
    camera: null,

	
	init: function() {
        this.camera = new Camera( ig.system.width/4, ig.system.height/3, 5 );
        this.camera.trap.size.x = ig.system.width/10;
        this.camera.trap.size.y = ig.system.height/3;
        this.camera.lookAhead.x = 0;

        ig.input.bind( ig.KEY.MOUSE1, 'mouse1');
        ig.input.bind( ig.KEY.MOUSE2, 'mouse2');

        ig.game.gravity = 400;

		this.loadLevel( LevelMain );
	},

    loadLevel: function( level ) {
        this.parent( level );

        this.player = this.getEntitiesByType( EntitySquishKitten )[0];

        // Set camera max and reposition trap
        this.camera.max.x = this.collisionMap.width * this.collisionMap.tilesize - ig.system.width;
        this.camera.max.y = this.collisionMap.height * this.collisionMap.tilesize - ig.system.height;

        this.camera.set( this.player );
    },


	update: function() {
        this.camera.follow( this.player );
		// Update all entities and backgroundMaps
		this.parent();
		
		// Add your own, additional update code here
	},
	
	draw: function() {
		// Draw all entities and backgroundMaps
		this.parent();
	}
});


ig.main( '#canvas', MyGame, 60, 768, 480, 1 );

});
