var asserts = [
    {
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
      , 'time': 250
    }
  , {
        'say': 'down elbow'
      , 'func': ['elbowStop', 'elbowDown']
      , 'time': 250
    }
  , {
        'say': 'stop elbow'
      , 'func': ['elbowStop']
      , 'time': 500
    }
  , {
        'say': 'up shoulder'
      , 'func': ['shoulderUp']
      , 'time': 250
    }
  , {
        'say': 'down shoulder'
      , 'func': ['shoulderStop', 'shoulderDown']
      , 'time': 250
    }
  , {
        'say': 'stop shoulder'
      , 'func': ['shoulderStop']
      , 'time': 500
    }
  , {
        'say': 'turn right'
      , 'func': ['baseRotate']
      , 'time': 500
    }
  , {
        'say': 'turn left'
      , 'func': ['baseStop', 'baseReverse']
      , 'time': 500
    }
  , {
        'say': 'stop all'
      , 'func': ['baseStop']
      , 'time': 250
    }
];

var Arm = require('./lib/arm');
var arm = new Arm(null, true);
var SayDo = require('./SayDo');
var sayDo = new SayDo({ "target": arm, "asserts": asserts });
