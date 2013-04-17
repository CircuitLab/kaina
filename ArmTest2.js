/*
var asserts = [
    {
        'say': 'start all joint test'
      , 'func': []
      , 'time': 500
    }
  , {
        'say': 'open hands'
      , 'func': ['handsOpen']
      , 'time': 500
    }
  , {
        'say': 'close hands'
      , 'func': ['handsStop', 'handsClose']
      , 'time': 500
    }
  , {
        'say': 'stop hands'
      , 'func': ['handsStop']
      , 'time': 500
    }
  , {
        'say': 'up elbow'
      , 'func': ['elbowUp']
      , 'time': 500
    }
  , {
        'say': 'down elbow'
      , 'func': ['elbowStop', 'elbowDown']
      , 'time': 500
    }
  , {
        'say': 'stop elbow'
      , 'func': ['elbowStop']
      , 'time': 500
    }
  , {
        'say': 'up shoulder'
      , 'func': ['shoulderUp']
      , 'time': 500
    }
  , {
        'say': 'down shoulder'
      , 'func': ['shoulderStop', 'shoulderDown']
      , 'time': 500
    }
  , {
        'say': 'stop shoulder'
      , 'func': ['shoulderStop']
      , 'time': 500
    }
  , {
        'say': 'turn right'
      , 'func': ['baseRotate']
      , 'time': 1000
    }
  , {
        'say': 'turn left'
      , 'func': ['baseStop', 'baseReverse']
      , 'time': 1000
    }
  , {
        'say': 'stop all'
      , 'func': ['baseStop']
      , 'time': 250
    }
];
*/
var asserts = [
    {
        'say': "Let\\'s Dancing!!"
      , 'func': []
      , 'time': 200
    }
  , {
        'func': ['handsOpen', 'elbowUp']
      , 'time': 3000
    }
  , {
        'func': ['handsStop', 'elbowStop', 'shoulderUp', 'baseRotate']
      , 'time': 3000
    }
  , {
        'func': ['shoulderStop', 'baseStop', 'handsClose', 'elbowDown', 'baseReverse']
      , 'time': 3000
    }
  , {
        'func': ['handsStop', 'elbowStop', 'baseStop']
      , 'time': 200
    }
  , {
        'func': ['shoulderUp', 'elbowDown']
      , 'time': 1000
    }
  , {
        'func': ['shoulderStop', 'elbowStop']
      , 'time': 250
    }
  , {
        'func': ['shoulderUp', 'elbowDown']
      , 'time': 1000
    }
  , {
        'func': ['shoulderStop', 'elbowStop']
      , 'time': 250
    }
  , {
        'func': ['shoulderUp', 'elbowDown']
      , 'time': 1000
    }
  , {
        'func': ['shoulderStop', 'elbowStop']
      , 'time': 200
    }
  , {
        'func': ['shoulderDown', 'elbowUp']
      , 'time': 1000
    }
  , {
        'func': ['shoulderStop', 'elbowStop']
      , 'time': 250
    }
  , {
        'func': ['shoulderDown', 'elbowUp']
      , 'time': 1000
    }
  , {
        'func': ['shoulderStop', 'elbowStop']
      , 'time': 250
    }
  , {
        'func': ['shoulderDown', 'elbowUp']
      , 'time': 1000
    }
];

var Arm = require('./lib/arm');
var arm = new Arm(null, true);
var SayDo = require('./SayDo');
var sayDo = new SayDo({ "target": arm, "asserts": asserts });
