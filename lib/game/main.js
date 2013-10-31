ig.module('game.main')
.requires(
    'impact.game',
    'impact.font'
)
.defines(function(){

    MyGame = ig.Game.extend({

        // Load a font
        font: new ig.Font( 'media/04b03.font.png' ),


        init: function() {
            ig.input.bind(ig.KEY.UP_ARROW, 'UP_ARROW');
            ig.input.bind(ig.key.BACKSPACE, 'BACKSPACE');
            ig.input.bind(ig.key.TAB, 'TAB');
            ig.input.bind(ig.key.ENTER, 'ENTER');
            ig.input.bind(ig.key.PAUSE, 'PAUSE');
            ig.input.bind(ig.key.CAPS, 'CAPS');
            ig.input.bind(ig.key.ESC, 'ESC');
            ig.input.bind(ig.key.SPACE, 'SPACE');
            ig.input.bind(ig.key.PAGE_UP, 'PAGE_UP');
            ig.input.bind(ig.key.PAGE_DOWN, 'PAGE_DOWN');
            ig.input.bind(ig.key.END, 'END');
            ig.input.bind(ig.key.HOME, 'HOME');
            ig.input.bind(ig.key.LEFT_ARROW, 'LEFT_ARROW');
            ig.input.bind(ig.key.UP_ARROW, 'UP_ARROW');
            ig.input.bind(ig.key.RIGHT_ARROW, 'RIGHT_ARROW');
            ig.input.bind(ig.key.DOWN_ARROW, 'DOWN_ARROW');
            ig.input.bind(ig.key.INSERT, 'INSERT');
            ig.input.bind(ig.key.DELETE, 'DELETE');
            ig.input.bind(ig.key._0, '_0');
            ig.input.bind(ig.key._1, '_1');
            ig.input.bind(ig.key._2, '_2');
            ig.input.bind(ig.key._3, '_3');
            ig.input.bind(ig.key._4, '_4');
            ig.input.bind(ig.key._5, '_5');
            ig.input.bind(ig.key._6, '_6');
            ig.input.bind(ig.key._7, '_7');
            ig.input.bind(ig.key._8, '_8');
            ig.input.bind(ig.key._9, '_9');
            ig.input.bind(ig.key.A, 'A');
            ig.input.bind(ig.key.B, 'B');
            ig.input.bind(ig.key.C, 'C');
            ig.input.bind(ig.key.D, 'D');
            ig.input.bind(ig.key.E, 'E');
            ig.input.bind(ig.key.F, 'F');
            ig.input.bind(ig.key.G, 'G');
            ig.input.bind(ig.key.H, 'H');
            ig.input.bind(ig.key.I, 'I');
            ig.input.bind(ig.key.J, 'J');
            ig.input.bind(ig.key.K, 'K');
            ig.input.bind(ig.key.L, 'L');
            ig.input.bind(ig.key.M, 'M');
            ig.input.bind(ig.key.N, 'N');
            ig.input.bind(ig.key.O, 'O');
            ig.input.bind(ig.key.P, 'P');
            ig.input.bind(ig.key.Q, 'Q');
            ig.input.bind(ig.key.R, 'R');
            ig.input.bind(ig.key.S, 'S');
            ig.input.bind(ig.key.T, 'T');
            ig.input.bind(ig.key.U, 'U');
            ig.input.bind(ig.key.V, 'V');
            ig.input.bind(ig.key.W, 'W');
            ig.input.bind(ig.key.X, 'X');
            ig.input.bind(ig.key.Y, 'Y');
            ig.input.bind(ig.key.Z, 'Z');
            ig.input.bind(ig.key.NUMPAD_0, 'NUMPAD_0');
            ig.input.bind(ig.key.NUMPAD_1, 'NUMPAD_1');
            ig.input.bind(ig.key.NUMPAD_2, 'NUMPAD_2');
            ig.input.bind(ig.key.NUMPAD_3, 'NUMPAD_3');
            ig.input.bind(ig.key.NUMPAD_4, 'NUMPAD_4');
            ig.input.bind(ig.key.NUMPAD_5, 'NUMPAD_5');
            ig.input.bind(ig.key.NUMPAD_6, 'NUMPAD_6');
            ig.input.bind(ig.key.NUMPAD_7, 'NUMPAD_7');
            ig.input.bind(ig.key.NUMPAD_8, 'NUMPAD_8');
            ig.input.bind(ig.key.NUMPAD_9, 'NUMPAD_9');
            ig.input.bind(ig.key.MULTIPLY, 'MULTIPLY');
            ig.input.bind(ig.key.ADD, 'ADD');
            ig.input.bind(ig.key.SUBSTRACT, 'SUBSTRACT');
            ig.input.bind(ig.key.DECIMAL, 'DECIMAL');
            ig.input.bind(ig.key.DIVIDE, 'DIVIDE');
            ig.input.bind(ig.key.F1, 'F1');
            ig.input.bind(ig.key.F2, 'F2');
            ig.input.bind(ig.key.F3, 'F3');
            ig.input.bind(ig.key.F4, 'F4');
            ig.input.bind(ig.key.F5, 'F5');
            ig.input.bind(ig.key.F6, 'F6');
            ig.input.bind(ig.key.F7, 'F7');
            ig.input.bind(ig.key.F8, 'F8');
            ig.input.bind(ig.key.F9, 'F9');
            ig.input.bind(ig.key.F10, 'F10');
            ig.input.bind(ig.key.F11, 'F11');
            ig.input.bind(ig.key.F12, 'F12');
            ig.input.bind(ig.key.SHIFT, 'SHIFT');
            ig.input.bind(ig.key.CTRL, 'CTRL');
            ig.input.bind(ig.key.ALT, 'ALT');
            ig.input.bind(ig.key.PLUS, 'PLUS');
            ig.input.bind(ig.key.COMMA, 'COMMA');
            ig.input.bind(ig.key.MINUS, 'MINUS');
            ig.input.bind(ig.key.PERIOD, 'PERIOD');
        },

        update: function() {
            // Update all entities and backgroundMaps
            this.parent();

            // Add your own, additional update code here
        },

        draw: function() {
            // Draw all entities and backgroundMaps
            this.parent();


            // Add your own drawing code here
            var x = ig.system.width/2,
                y = ig.system.height/2;

            this.font.draw( 'It Works!', x, y, ig.Font.ALIGN.CENTER );
        }

    });

    // Start the Game with 60fps, a resolution of 320x240, scaled
    // up by a factor of 2
    ig.main( '#canvas', MyGame, 60, 320, 240, 2 );

});
