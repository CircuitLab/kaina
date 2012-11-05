var asserts = [
    {
      , 'say': 'open hands'
      , 'func': ['handsOpen']
      , 'time': 500
    }
  , {
      , 'say': 'close hands'
      , 'func': ['handsStop', 'handsClose']
      , 'time': 500
    }
  , {
      , 'say': 'stop hands'
      , 'func': ['handsStop']
      , 'time': 500
    }
];

var Arm = require('./lib/arm');
var arm = new Arm(null, true);
var SayDo = require('./SayDo');
var sayDo = new SayDo({ "target": arm, "asserts": asserts });
