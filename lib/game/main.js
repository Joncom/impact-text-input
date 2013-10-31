ig.module('game.main')
.requires(
    'impact.game',
    'impact.font',
    'impact.input'
)
.defines(function(){

    // TODO: Figure out if CAPS lock is on and use caps accordingly.

    MyGame = ig.Game.extend({

        // Load a font
        font: new ig.Font( 'media/04b03.font.png' ),
        currentLine: '',
        lastPressedAction: null,
        repeatActionTimer: new ig.Timer(),
        repeatActionStarted: false,
        repeatActionStartDelay: 1,
        repeatActionInterval: 0.5,


        init: function() {

            // ig.KEY is missing this keycode.
            ig.KEY['TILDE'] = 192;
            ig.KEY['BACKSLASH'] = 220;
            ig.KEY['FORWARD_SLASH'] = 191;
            ig.KEY['SEMICOLON'] = 186; // XXX: Is 59 in FF.
            ig.KEY['APOSTROPHE'] = 222;
            ig.KEY['OPEN_BRACKET'] = 219;
            ig.KEY['CLOSE_BRACKET'] = 221;

            ig.input.bind(ig.KEY.TILDE, '`');
            ig.input.bind(ig.KEY.BACKSLASH, '\\');
            ig.input.bind(ig.KEY.FORWARD_SLASH, '/');
            ig.input.bind(ig.KEY.SEMICOLON, ';');
            ig.input.bind(ig.KEY.APOSTROPHE, "'");
            ig.input.bind(ig.KEY.OPEN_BRACKET, '[');
            ig.input.bind(ig.KEY.CLOSE_BRACKET, ']');

            ig.input.bind(ig.KEY.BACKSPACE, 'BACKSPACE');
            ig.input.bind(ig.KEY.TAB, 'TAB');
            ig.input.bind(ig.KEY.ENTER, 'ENTER');
            ig.input.bind(ig.KEY.PAUSE, 'PAUSE');
            ig.input.bind(ig.KEY.CAPS, 'CAPS');
            ig.input.bind(ig.KEY.ESC, 'ESC');
            ig.input.bind(ig.KEY.SPACE, ' ');
            ig.input.bind(ig.KEY.PAGE_UP, 'PAGE_UP');
            ig.input.bind(ig.KEY.PAGE_DOWN, 'PAGE_DOWN');
            ig.input.bind(ig.KEY.END, 'END');
            ig.input.bind(ig.KEY.HOME, 'HOME');
            ig.input.bind(ig.KEY.LEFT_ARROW, 'LEFT_ARROW');
            ig.input.bind(ig.KEY.UP_ARROW, 'UP_ARROW');
            ig.input.bind(ig.KEY.RIGHT_ARROW, 'RIGHT_ARROW');
            ig.input.bind(ig.KEY.DOWN_ARROW, 'DOWN_ARROW');
            ig.input.bind(ig.KEY.INSERT, 'INSERT');
            ig.input.bind(ig.KEY.DELETE, 'DELETE');
            ig.input.bind(ig.KEY._0, '0');
            ig.input.bind(ig.KEY._1, '1');
            ig.input.bind(ig.KEY._2, '2');
            ig.input.bind(ig.KEY._3, '3');
            ig.input.bind(ig.KEY._4, '4');
            ig.input.bind(ig.KEY._5, '5');
            ig.input.bind(ig.KEY._6, '6');
            ig.input.bind(ig.KEY._7, '7');
            ig.input.bind(ig.KEY._8, '8');
            ig.input.bind(ig.KEY._9, '9');
            ig.input.bind(ig.KEY.A, 'A');
            ig.input.bind(ig.KEY.B, 'B');
            ig.input.bind(ig.KEY.C, 'C');
            ig.input.bind(ig.KEY.D, 'D');
            ig.input.bind(ig.KEY.E, 'E');
            ig.input.bind(ig.KEY.F, 'F');
            ig.input.bind(ig.KEY.G, 'G');
            ig.input.bind(ig.KEY.H, 'H');
            ig.input.bind(ig.KEY.I, 'I');
            ig.input.bind(ig.KEY.J, 'J');
            ig.input.bind(ig.KEY.K, 'K');
            ig.input.bind(ig.KEY.L, 'L');
            ig.input.bind(ig.KEY.M, 'M');
            ig.input.bind(ig.KEY.N, 'N');
            ig.input.bind(ig.KEY.O, 'O');
            ig.input.bind(ig.KEY.P, 'P');
            ig.input.bind(ig.KEY.Q, 'Q');
            ig.input.bind(ig.KEY.R, 'R');
            ig.input.bind(ig.KEY.S, 'S');
            ig.input.bind(ig.KEY.T, 'T');
            ig.input.bind(ig.KEY.U, 'U');
            ig.input.bind(ig.KEY.V, 'V');
            ig.input.bind(ig.KEY.W, 'W');
            ig.input.bind(ig.KEY.X, 'X');
            ig.input.bind(ig.KEY.Y, 'Y');
            ig.input.bind(ig.KEY.Z, 'Z');
            ig.input.bind(ig.KEY.NUMPAD_0, '0');
            ig.input.bind(ig.KEY.NUMPAD_1, '1');
            ig.input.bind(ig.KEY.NUMPAD_2, '2');
            ig.input.bind(ig.KEY.NUMPAD_3, '3');
            ig.input.bind(ig.KEY.NUMPAD_4, '4');
            ig.input.bind(ig.KEY.NUMPAD_5, '5');
            ig.input.bind(ig.KEY.NUMPAD_6, '6');
            ig.input.bind(ig.KEY.NUMPAD_7, '7');
            ig.input.bind(ig.KEY.NUMPAD_8, '8');
            ig.input.bind(ig.KEY.NUMPAD_9, '9');
            ig.input.bind(ig.KEY.MULTIPLY, '*');
            ig.input.bind(ig.KEY.ADD, '+');
            ig.input.bind(ig.KEY.SUBSTRACT, '-');
            ig.input.bind(ig.KEY.DECIMAL, '.');
            ig.input.bind(ig.KEY.DIVIDE, '/');
            ig.input.bind(ig.KEY.SHIFT, 'SHIFT');
            ig.input.bind(ig.KEY.CTRL, 'CTRL');
            ig.input.bind(ig.KEY.ALT, 'ALT');
            ig.input.bind(ig.KEY.PLUS, '=');
            ig.input.bind(ig.KEY.COMMA, ',');
            ig.input.bind(ig.KEY.MINUS, '-');
            ig.input.bind(ig.KEY.PERIOD, '.');
        },

        update: function() {
            // Update all entities and backgroundMaps
            this.parent();

            for( var action in ig.input.presses ) {
                this.doAction(action);
                this.lastPressedAction = action;
                this.repeatActionStarting = false;
                this.repeatActionStarted = false;
            }

            var action = this.lastPressedAction;
            // Begin countdown to repeat an action?
            if(ig.input.state(action) &&
                    !this.repeatActionStarting &&
                    !this.repeatActionStarted) {

                this.repeatActionStarting = true;
                this.repeatActionTimer.set(
                    this.repeatActionStartDelay);
            }
            // Repeat action for first time?
            else if(ig.input.state(action) &&
                    this.repeatActionStarting &&
                    !this.repeatActionStarted &&
                    this.repeatActionTimer.delta() >= 0) {

                this.repeatActionStarting = false;
                this.repeatActionStarted = true;
                this.doAction(action);
                this.repeatActionTimer.set(
                    this.repeatActionInterval);
            }
            // Repeat action again?
            else if(ig.input.state(action) &&
                    this.repeatActionStarted &&
                    this.repeatActionTimer.delta() >= 0) {

                this.doAction(action);
                this.repeatActionTimer.reset();
            }
        },

        draw: function() {
            // Draw all entities and backgroundMaps
            this.parent();


            // Add your own drawing code here
            var x = ig.system.width/2,
                y = ig.system.height/2;

            this.font.draw( this.currentLine, x, y, ig.Font.ALIGN.CENTER );
        },

        doAction: function(action) {
            if(action === 'SHIFT') {
                return;
            } else if(action === 'BACKSPACE') {
                var length = this.currentLine.length - 1;
                var newLine = this.currentLine.substr(0, length);
                this.currentLine = newLine;
            } else if(action === '`' && ig.input.state('SHIFT')) {
                this.currentLine += '~';
            } else if(action === '1' && ig.input.state('SHIFT')) {
                this.currentLine += '!';
            } else if(action === '2' && ig.input.state('SHIFT')) {
                this.currentLine += '@';
            } else if(action === '3' && ig.input.state('SHIFT')) {
                this.currentLine += '#';
            } else if(action === '4' && ig.input.state('SHIFT')) {
                this.currentLine += '$';
            } else if(action === '5' && ig.input.state('SHIFT')) {
                this.currentLine += '%';
            } else if(action === '6' && ig.input.state('SHIFT')) {
                this.currentLine += '^';
            } else if(action === '7' && ig.input.state('SHIFT')) {
                this.currentLine += '&';
            } else if(action === '8' && ig.input.state('SHIFT')) {
                this.currentLine += '*';
            } else if(action === '9' && ig.input.state('SHIFT')) {
                this.currentLine += '(';
            } else if(action === '0' && ig.input.state('SHIFT')) {
                this.currentLine += ')';
            } else if(action === '-' && ig.input.state('SHIFT')) {
                this.currentLine += '_';
            } else if(action === '=' && ig.input.state('SHIFT')) {
                this.currentLine += '+';
            } else if(action === '\\' && ig.input.state('SHIFT')) {
                this.currentLine += '|';
            } else if(action === '/' && ig.input.state('SHIFT')) {
                this.currentLine += '?';
            } else if(action === ',' && ig.input.state('SHIFT')) {
                this.currentLine += '<';
            } else if(action === '.' && ig.input.state('SHIFT')) {
                this.currentLine += '>';
            } else if(action === ';' && ig.input.state('SHIFT')) {
                this.currentLine += ':';
            } else if(action === "'" && ig.input.state('SHIFT')) {
                this.currentLine += '"';
            } else if(action === '[' && ig.input.state('SHIFT')) {
                this.currentLine += '{';
            } else if(action === "]" && ig.input.state('SHIFT')) {
                this.currentLine += '}';
            } else {
                if(ig.input.state('SHIFT')) {
                   this.currentLine += action;
                } else {
                    this.currentLine += action.toLowerCase();
                }
            }
        }

    });

    // Start the Game with 60fps, a resolution of 320x240, scaled
    // up by a factor of 2
    ig.main( '#canvas', MyGame, 60, 320, 240, 2 );

});
