/*
NOTE:
This code was modified based on Prof. Altice's dialogue box example
*/

class Talking2 extends Phaser.Scene {
    constructor() {
        super("ending");

        // dialog constants
        this.DBOX_X = 0;			    // dialog box x-position
        this.DBOX_Y = 400;			    // dialog box y-position
        this.DBOX_FONT = 'shortstack';	// dialog box font key

        this.TEXT_X = 50;			// text w/in dialog box x-position
        this.TEXT_Y = 445;			// text w/in dialog box y-position
        this.TEXT_SIZE = 24;		// text font size (in pixels)
        this.TEXT_MAX_WIDTH = 715;	// max width of text within box

        this.NEXT_TEXT = '[SPACE]';	// text to display for next prompt
        this.NEXT_X = 775;			// next text prompt x-position
        this.NEXT_Y = 574;			// next text prompt y-position

        this.LETTER_TIMER = 10;		// # ms each letter takes to "type" onscreen

        // dialog variables
        this.dialogConvo2 = 0;			// current "conversation"
        this.dialogLine2 = 0;			// current line of conversation
        this.dialogSpeaker2 = null;		// current speaker
        this.dialogLastSpeaker2 = null;	// last speaker
        this.dialogTyping2 = false;		// flag to lock player input while text is "typing"
        this.dialogText2 = null;			// the actual dialog text
        this.nextText2 = null;			// player prompt text to continue typing

        // character variables
        this.Me = null;
        this.Friend = null;
     
        this.tweenDuration = 500;

        this.OFFSCREEN_X = -500;        // x,y values to place characters offscreen
        this.OFFSCREEN_Y = 1000;
    }

    preload()
    {
        // load assets
        this.load.path = "./assets/";
        this.load.audio('music', 'music.mp3');

        // load JSON (dialog)
        this.load.json('dialog2', 'ending.json');

        // load image
        

        // this.load.image('dialogbox', 'img/box.png');
        // this.load.image('Narrative', 'img/Narrative.png');
        this.load.image('Me', 'img/player.png');
        this.load.image('Friend', 'img/friend.png');

        // load bitmap font
        this.load.bitmapFont('shortstack', 'font/shortStack.png', 'font/shortStack.xml');
    
    }

    create() {
        // parse dialog from JSON file
        this.dialog2 = this.cache.json.get('dialog2');
        //console.log(this.dialog);


        // add dialog box sprite
        // this.dialogbox = this.add.sprite(this.DBOX_X, this.DBOX_Y, 'dialogbox').setOrigin(0);
        

        // initialize dialog text objects (with no text)
        this.dialogText2 = this.add.bitmapText(this.TEXT_X, this.TEXT_Y, this.DBOX_FONT, '', this.TEXT_SIZE);
        this.nextText2 = this.add.bitmapText(this.NEXT_X, this.NEXT_Y, this.DBOX_FONT, '', this.TEXT_SIZE);

        // ready the character dialog images offscreen
        this.Me = this.add.sprite(this.OFFSCREEN_X, this.DBOX_Y+8, 'Me').setOrigin(0, 1);
        this.Friend = this.add.sprite(this.OFFSCREEN_X, this.DBOX_Y+8, 'Friend').setOrigin(0, 1);
        // this.neptune = this.add.sprite(this.OFFSCREEN_X, this.DBOX_Y+8, 'neptune').setOrigin(0, 1);
        // this.jove = this.add.sprite(this.OFFSCREEN_X, this.DBOX_Y+8, 'jove').setOrigin(0, 1);

        // input
        cursors = this.input.keyboard.createCursorKeys();
        keyRight = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.RIGHT);

        // start dialog
        this.typeText();      
        
        music = this.sound.add('music');
        music.play();

    }

    update() {
        // check for spacebar press
        if(Phaser.Input.Keyboard.JustDown(cursors.space) && !this.dialogTyping2) {
            // trigger dialog
            this.typeText();
        }
        // if(Phaser.Input.Keyboard.JustDown(cursors.space)) {
        //     this.scene.start("titleScene");
        // }
        // if(Phaser.Input.Keyboard.JustDown(cursors.space) && this.dialogText.text == "I...alright, fine. Goodness, I swear, she’s so infuriating at times."){
        //     this.scene.start("playScene");
        // }
       
    }

    typeText() {
        // lock input while typing
        this.dialogTyping2 = true;

        // clear text
        this.dialogText2.text = '';
        this.nextText2.text = '';

        /* Note: In my conversation data structure: 
                - each array within the main JSON array is a "conversation"
                - each object within a "conversation" is a "line"
                - each "line" can have 3 properties: 
                    1. a speaker (required)
                    2. the dialog text (required)
                    3. an (optional) flag indicating if this speaker is new
        */

        // make sure there are lines left to read in this convo, otherwise jump to next convo
        if(this.dialogLine2 > this.dialog2[this.dialogConvo2].length - 1) {
            this.dialogLine2 = 0;
            // I increment conversations here, but you could create logic to exit the dialog here
            this.dialogConvo2++;

        }
        
        // make sure we haven't run out of conversations...
        if(this.dialogConvo2 >= this.dialog2.length) {
            // here I'm simply "exiting" the last speaker and removing the dialog box,
            // but you could build other logic to change game states here
            console.log('End of Conversations');
            
            // tween out prior speaker's image
            if(this.dialogLastSpeaker2) {
                // this.tweens.add({
                //     targets: this[this.dialogLastSpeaker],
                //     x: this.OFFSCREEN_X,
                //     duration: this.tweenDuration,
                //     ease: 'Linear'
                // });
                this.scene.start("titleScene");
                music.stop();
            }
            // make text box invisible
            // this.dialogbox.visible = false;

        } else {
            // if not, set current speaker
            this.dialogSpeaker2 = this.dialog2[this.dialogConvo2][this.dialogLine2]['speaker'];
            // check if there's a new speaker (for exit/enter animations)
            if(this.dialog2[this.dialogConvo2][this.dialogLine2]['newSpeaker']) {
                // tween out prior speaker's image
                if(this.dialogLastSpeaker2) {
                    this.tweens.add({
                        targets: this[this.dialogLastSpeaker2],
                        x: this.OFFSCREEN_X,
                        duration: this.tweenDuration,
                        ease: 'Linear'
                    });
                }
                // tween in new speaker's image
                this.tweens.add({
                    targets: this[this.dialogSpeaker2],
                    x: this.DBOX_X + 50,
                    duration: this.tweenDuration,
                    ease: 'Linear'
                });
            }

            // build dialog (concatenate speaker + line of text)
            this.dialogLines2 = this.dialog2[this.dialogConvo2][this.dialogLine2]['speaker'].toUpperCase() + ': ' + this.dialog2[this.dialogConvo2][this.dialogLine2]['dialog'];

            // create a timer to iterate through each letter in the dialog text
            let currentChar = 0; 
            this.textTimer = this.time.addEvent({
                delay: this.LETTER_TIMER,
                repeat: this.dialogLines2.length - 1,
                callback: () => { 
                    // concatenate next letter from dialogLines
                    this.dialogText2.text += this.dialogLines2[currentChar];
                    // advance character position
                    currentChar++;
                    // check if timer has exhausted its repeats 
                    // (necessary since Phaser 3 no longer seems to have an onComplete event)
                    if(this.textTimer.getRepeatCount() == 0) {
                        // show prompt for more text
                        this.nextText2 = this.add.bitmapText(this.NEXT_X, this.NEXT_Y, this.DBOX_FONT, this.NEXT_TEXT, this.TEXT_SIZE).setOrigin(1);
                        // un-lock input
                        this.dialogTyping2 = false;
                        // destroy timer
                        this.textTimer.destroy();
                    }
                },
                callbackScope: this // keep Scene context
            });
            
            // set bounds on dialog
            this.dialogText2.maxWidth = this.TEXT_MAX_WIDTH;

            // increment dialog line
            this.dialogLine2++;

            // set past speaker
            this.dialogLastSpeaker2 = this.dialogSpeaker2;
        }
    }

}