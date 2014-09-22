var WebSocket = require('ws');
var ws = new WebSocket('ws://localhost:7204/myo/1');

var express = require('express');
var app = express();
var server = require('http').Server(app);
var io = require('socket.io')(server);
var morgan = require('morgan');
var mongoose = require('mongoose'),
	Schema = mongoose.Schema;

mongoose.connect("mongodb://admin:bananaman@ds039000.mongolab.com:39000/heroku_app29470628");

var characterSchema = new Schema({
	pointables: {type: Object}
});

var charSchema = mongoose.model('Character', characterSchema);

server.listen(3000);

app.use(express.static(__dirname + "/public"));
var activated = false;
var handDetection = false;
var counter = 0;
var previousTime = (new Date()).getTime();
var previousDegree = 0;
var characterData = {};

var p00d0 = [];
var p00d1 = [];
var p00d2 = [];
var p00b0 = [];
var p00b1 = [];
var p00b2 = [];
var p01d0 = [];
var p01d1 = [];
var p01d2 = [];
var p01b0 = [];
var p01b1 = [];
var p01b2 = [];
var p02d0 = [];
var p02d1 = [];
var p02d2 = [];
var p02b0 = [];
var p02b1 = [];
var p02b2 = [];

var p10d0 = [];
var p10d1 = [];
var p10d2 = [];
var p10b0 = [];
var p10b1 = [];
var p10b2 = [];
var p11d0 = [];
var p11d1 = [];
var p11d2 = [];
var p11b0 = [];
var p11b1 = [];
var p11b2 = [];
var p12d0 = [];
var p12d1 = [];
var p12d2 = [];
var p12b0 = [];
var p12b1 = [];
var p12b2 = [];

var p20d0 = [];
var p20d1 = [];
var p20d2 = [];
var p20b0 = [];
var p20b1 = [];
var p20b2 = [];
var p21d0 = [];
var p21d1 = [];
var p21d2 = [];
var p21b0 = [];
var p21b1 = [];
var p21b2 = [];
var p22d0 = [];
var p22d1 = [];
var p22d2 = [];
var p22b0 = [];
var p22b1 = [];
var p22b2 = [];

var p30d0 = [];
var p30d1 = [];
var p30d2 = [];
var p30b0 = [];
var p30b1 = [];
var p30b2 = [];
var p31d0 = [];
var p31d1 = [];
var p31d2 = [];
var p31b0 = [];
var p31b1 = [];
var p31b2 = [];
var p32d0 = [];
var p32d1 = [];
var p32d2 = [];
var p32b0 = [];
var p32b1 = [];
var p32b2 = [];

var p40d0 = [];
var p40d1 = [];
var p40d2 = [];
var p40b0 = [];
var p40b1 = [];
var p40b2 = [];
var p41d0 = [];
var p41d1 = [];
var p41d2 = [];
var p41b0 = [];
var p41b1 = [];
var p41b2 = [];
var p42d0 = [];
var p42d1 = [];
var p42d2 = [];
var p42b0 = [];
var p42b1 = [];
var p42b2 = [];

var blah = 0;
var startChar = 'w';
var oldChar = ' ';
var notI = true;
var notA = true;
var notS = true;
var notK = true;
charSchema.find({}, function(err, result){
	characterData = result;
	console.log(JSON.stringify(result));
});
io.sockets.on('connection', function(socket){
	socket.on('pointables', function(data){
		var newHand = JSON.parse(data);
		if (activated){
			if (!handDetection)
			{
				io.sockets.emit("char", "hand detected");
				handDetection = true;
			}
			var allZ = [];
			for (var i = 0; i < characterData.length; i++){
				var zscores = [];
				for (var j = 0; j < characterData[i].pointables.pointables.length; j++){
					var bones = characterData[i].pointables.pointables[j].bones;
					for (var k = 0; k < 3; k++){
						for (var l = 0; l < 3; l++){
							var avg = bones[k].direction[l].mean;
							var std = bones[k].direction[l].stddev;
							var curr = newHand[j].bones[k].direction[l];
							zscores.push((avg - curr)/std);
						}
					}
				}
				allZ[i] = {meanZ: mean(zscores), character: characterData[i].pointables.character};
			}
			console.log(allZ);
			var prevZ = 10000;
			var mainChar = '';
			for (var i = 0; i < allZ.length; i++){
				if (Math.abs(allZ[i].meanZ) < Math.abs(prevZ)){
					mainChar = allZ[i].character;
					prevZ = allZ[i].meanZ;
				}
			}
			if (mainChar == 'i' && notI){
				io.sockets.emit("char", "i");
				notI = false;
			}
			if (mainChar == 'a' && notA){
				io.sockets.emit("char", "a");
				notA = false;
			}
			if (mainChar == 'k' && notK){
				io.sockets.emit("char", "kay");
				notK = false;
			}
			oldChar = mainChar;
			console.log(mainChar);
			console.log(prevZ);

			io.sockets.emit("finalData", {meanStats: allZ, mainChar: mainChar});
		}
		else{
			handDetection = false;
		}
	});

	socket.on('learn', function(data){
		p00d0.push(data.pointables[0].bones[0].direction[0]);
		p00d1.push(data.pointables[0].bones[0].direction[1]);
		p00d2.push(data.pointables[0].bones[0].direction[2]);
		p00b0.push(data.pointables[0].bones[0].basis[0]);
		p00b1.push(data.pointables[0].bones[0].basis[1]);
		p00b2.push(data.pointables[0].bones[0].basis[2]);
		p01d0.push(data.pointables[0].bones[1].direction[0]);
		p01d1.push(data.pointables[0].bones[1].direction[1]);
		p01d2.push(data.pointables[0].bones[1].direction[2]);
		p01b0.push(data.pointables[0].bones[1].basis[0]);
		p01b1.push(data.pointables[0].bones[1].basis[1]);
		p01b2.push(data.pointables[0].bones[1].basis[2]);
		p02d0.push(data.pointables[0].bones[2].direction[0]);
		p02d1.push(data.pointables[0].bones[2].direction[1]);
		p02d2.push(data.pointables[0].bones[2].direction[2]);
		p02b0.push(data.pointables[0].bones[2].basis[0]);
		p02b1.push(data.pointables[0].bones[2].basis[1]);
		p02b2.push(data.pointables[0].bones[2].basis[2]);

		p10d0.push(data.pointables[1].bones[0].direction[0]);
		p10d1.push(data.pointables[1].bones[0].direction[1]);
		p10d2.push(data.pointables[1].bones[0].direction[2]);
		p10b0.push(data.pointables[1].bones[0].basis[0]);
		p10b1.push(data.pointables[1].bones[0].basis[1]);
		p10b2.push(data.pointables[1].bones[0].basis[2]);
		p11d0.push(data.pointables[1].bones[1].direction[0]);
		p11d1.push(data.pointables[1].bones[1].direction[1]);
		p11d2.push(data.pointables[1].bones[1].direction[2]);
		p11b0.push(data.pointables[1].bones[1].basis[0]);
		p11b1.push(data.pointables[1].bones[1].basis[1]);
		p11b2.push(data.pointables[1].bones[1].basis[2]);
		p12d0.push(data.pointables[1].bones[2].direction[0]);
		p12d1.push(data.pointables[1].bones[2].direction[1]);
		p12d2.push(data.pointables[1].bones[2].direction[2]);
		p12b0.push(data.pointables[1].bones[2].basis[0]);
		p12b1.push(data.pointables[1].bones[2].basis[1]);
		p12b2.push(data.pointables[1].bones[2].basis[2]);

		p20d0.push(data.pointables[2].bones[0].direction[0]);
		p20d1.push(data.pointables[2].bones[0].direction[1]);
		p20d2.push(data.pointables[2].bones[0].direction[2]);
		p20b0.push(data.pointables[2].bones[0].basis[0]);
		p20b1.push(data.pointables[2].bones[0].basis[1]);
		p20b2.push(data.pointables[2].bones[0].basis[2]);
		p21d0.push(data.pointables[2].bones[1].direction[0]);
		p21d1.push(data.pointables[2].bones[1].direction[1]);
		p21d2.push(data.pointables[2].bones[1].direction[2]);
		p21b0.push(data.pointables[2].bones[1].basis[0]);
		p21b1.push(data.pointables[2].bones[1].basis[1]);
		p21b2.push(data.pointables[2].bones[1].basis[2]);
		p22d0.push(data.pointables[2].bones[2].direction[0]);
		p22d1.push(data.pointables[2].bones[2].direction[1]);
		p22d2.push(data.pointables[2].bones[2].direction[2]);
		p22b0.push(data.pointables[2].bones[2].basis[0]);
		p22b1.push(data.pointables[2].bones[2].basis[1]);
		p22b2.push(data.pointables[2].bones[2].basis[2]);

		p30d0.push(data.pointables[3].bones[0].direction[0]);
		p30d1.push(data.pointables[3].bones[0].direction[1]);
		p30d2.push(data.pointables[3].bones[0].direction[2]);
		p30b0.push(data.pointables[3].bones[0].basis[0]);
		p30b1.push(data.pointables[3].bones[0].basis[1]);
		p30b2.push(data.pointables[3].bones[0].basis[2]);
		p31d0.push(data.pointables[3].bones[1].direction[0]);
		p31d1.push(data.pointables[3].bones[1].direction[1]);
		p31d2.push(data.pointables[3].bones[1].direction[2]);
		p31b0.push(data.pointables[3].bones[1].basis[0]);
		p31b1.push(data.pointables[3].bones[1].basis[1]);
		p31b2.push(data.pointables[3].bones[1].basis[2]);
		p32d0.push(data.pointables[3].bones[2].direction[0]);
		p32d1.push(data.pointables[3].bones[2].direction[1]);
		p32d2.push(data.pointables[3].bones[2].direction[2]);
		p32b0.push(data.pointables[3].bones[2].basis[0]);
		p32b1.push(data.pointables[3].bones[2].basis[1]);
		p32b2.push(data.pointables[3].bones[2].basis[2]);

		p40d0.push(data.pointables[4].bones[0].direction[0]);
		p40d1.push(data.pointables[4].bones[0].direction[1]);
		p40d2.push(data.pointables[4].bones[0].direction[2]);
		p40b0.push(data.pointables[4].bones[0].basis[0]);
		p40b1.push(data.pointables[4].bones[0].basis[1]);
		p40b2.push(data.pointables[4].bones[0].basis[2]);
		p41d0.push(data.pointables[4].bones[1].direction[0]);
		p41d1.push(data.pointables[4].bones[1].direction[1]);
		p41d2.push(data.pointables[4].bones[1].direction[2]);
		p41b0.push(data.pointables[4].bones[1].basis[0]);
		p41b1.push(data.pointables[4].bones[1].basis[1]);
		p41b2.push(data.pointables[4].bones[1].basis[2]);
		p42d0.push(data.pointables[4].bones[2].direction[0]);
		p42d1.push(data.pointables[4].bones[2].direction[1]);
		p42d2.push(data.pointables[4].bones[2].direction[2]);
		p42b0.push(data.pointables[4].bones[2].basis[0]);
		p42b1.push(data.pointables[4].bones[2].basis[1]);
		p42b2.push(data.pointables[4].bones[2].basis[2]);

		var result = {
			character: startChar,
		   pointables:[
		      {
		         finger:"Thumb",
		         bones:{
		            0:{
		               direction:{
		                  0:{stddev: Math.sqrt(variance(p00d0)), mean: mean(p00d0)},
		                  1:{stddev: Math.sqrt(variance(p00d1)), mean: mean(p00d1)},
		                  2:{stddev: Math.sqrt(variance(p00d2)), mean: mean(p00d2)}
		               },
		               basis:{
		                  0:{stddev: Math.sqrt(variance(p00b0)), mean: mean(p00b0)},
		                  1:{stddev: Math.sqrt(variance(p00b1)), mean: mean(p00b1)},
		                  2:{stddev: Math.sqrt(variance(p00b2)), mean: mean(p00b2)}
		               }
		            },
		            1:{
		               direction:{
		                  0:{stddev: Math.sqrt(variance(p01d0)), mean: mean(p01d0)},
		                  1:{stddev: Math.sqrt(variance(p01d1)), mean: mean(p01d1)},
		                  2:{stddev: Math.sqrt(variance(p01d2)), mean: mean(p01d2)}
		               },
		               basis:{
		                  0:{stddev: Math.sqrt(variance(p01b0)), mean: mean(p01b0)},
		                  1:{stddev: Math.sqrt(variance(p01b1)), mean: mean(p01b1)},
		                  2:{stddev: Math.sqrt(variance(p01b2)), mean: mean(p01b2)}
		               }
		            },
		            2:{
		               direction:{
		                  0:{stddev: Math.sqrt(variance(p02d0)), mean: mean(p02d0)},
		                  1:{stddev: Math.sqrt(variance(p02d1)), mean: mean(p02d1)},
		                  2:{stddev: Math.sqrt(variance(p02d2)), mean: mean(p02d2)}
		               },
		               basis:{
		                  0:{stddev: Math.sqrt(variance(p02b0)), mean: mean(p02b0)},
		                  1:{stddev: Math.sqrt(variance(p02b1)), mean: mean(p02b1)},
		                  2:{stddev: Math.sqrt(variance(p02b2)), mean: mean(p02b2)}
		               }
		            }
		         }
		      },
		      {
		         finger:"Index finger",
		         bones:{
		            0:{
		               direction:{
		                  0:{stddev: Math.sqrt(variance(p10d0)), mean: mean(p10d0)},
		                  1:{stddev: Math.sqrt(variance(p10d1)), mean: mean(p10d1)},
		                  2:{stddev: Math.sqrt(variance(p10d2)), mean: mean(p10d2)}
		               },
		               basis:{
		                  0:{stddev: Math.sqrt(variance(p10b0)), mean: mean(p10b0)},
		                  1:{stddev: Math.sqrt(variance(p10b1)), mean: mean(p10b1)},
		                  2:{stddev: Math.sqrt(variance(p10b2)), mean: mean(p10b2)}
		               }
		            },
		            1:{
		               direction:{
		                  0:{stddev: Math.sqrt(variance(p11d0)), mean: mean(p11d0)},
		                  1:{stddev: Math.sqrt(variance(p11d1)), mean: mean(p11d1)},
		                  2:{stddev: Math.sqrt(variance(p11d2)), mean: mean(p11d2)}
		               },
		               basis:{
		                  0:{stddev: Math.sqrt(variance(p11b0)), mean: mean(p11b0)},
		                  1:{stddev: Math.sqrt(variance(p11b1)), mean: mean(p11b1)},
		                  2:{stddev: Math.sqrt(variance(p11b2)), mean: mean(p11b2)}
		               }
		            },
		            2:{
		               direction:{
		                  0:{stddev: Math.sqrt(variance(p12d0)), mean: mean(p12d0)},
		                  1:{stddev: Math.sqrt(variance(p12d1)), mean: mean(p12d1)},
		                  2:{stddev: Math.sqrt(variance(p12d2)), mean: mean(p12d2)}
		               },
		               basis:{
		                  0:{stddev: Math.sqrt(variance(p12b0)), mean: mean(p12b0)},
		                  1:{stddev: Math.sqrt(variance(p12b1)), mean: mean(p12b1)},
		                  2:{stddev: Math.sqrt(variance(p12b2)), mean: mean(p12b2)}
		               }
		            }
		         }
		      },
		      {
		         finger:"Middle finger",
		         bones:{
		            0:{
		               direction:{
		                  0:{stddev: Math.sqrt(variance(p20d0)), mean: mean(p20d0)},
		                  1:{stddev: Math.sqrt(variance(p20d1)), mean: mean(p20d1)},
		                  2:{stddev: Math.sqrt(variance(p20d2)), mean: mean(p20d2)}
		               },
		               basis:{
		                  0:{stddev: Math.sqrt(variance(p20b0)), mean: mean(p20b0)},
		                  1:{stddev: Math.sqrt(variance(p20b1)), mean: mean(p20b1)},
		                  2:{stddev: Math.sqrt(variance(p20b2)), mean: mean(p20b2)}
		               }
		            },
		            1:{
		               direction:{
		                  0:{stddev: Math.sqrt(variance(p21d0)), mean: mean(p21d0)},
		                  1:{stddev: Math.sqrt(variance(p21d1)), mean: mean(p21d1)},
		                  2:{stddev: Math.sqrt(variance(p21d2)), mean: mean(p21d2)}
		               },
		               basis:{
		                  0:{stddev: Math.sqrt(variance(p21b0)), mean: mean(p21b0)},
		                  1:{stddev: Math.sqrt(variance(p21b1)), mean: mean(p21b1)},
		                  2:{stddev: Math.sqrt(variance(p21b2)), mean: mean(p21b2)}
		               }
		            },
		            2:{
		               direction:{
		                  0:{stddev: Math.sqrt(variance(p22d0)), mean: mean(p22d0)},
		                  1:{stddev: Math.sqrt(variance(p22d1)), mean: mean(p22d1)},
		                  2:{stddev: Math.sqrt(variance(p22d2)), mean: mean(p22d2)}
		               },
		               basis:{
		                  0:{stddev: Math.sqrt(variance(p22b0)), mean: mean(p22b0)},
		                  1:{stddev: Math.sqrt(variance(p22b1)), mean: mean(p22b1)},
		                  2:{stddev: Math.sqrt(variance(p22b2)), mean: mean(p22b2)}
		               }
		            }
		         }
		      },
		      {
		         finger:"Ring finger",
		         bones:{
		            0:{
		               direction:{
		                  0:{stddev: Math.sqrt(variance(p30d0)), mean: mean(p30d0)},
		                  1:{stddev: Math.sqrt(variance(p30d1)), mean: mean(p30d1)},
		                  2:{stddev: Math.sqrt(variance(p30d2)), mean: mean(p30d2)}
		               },
		               basis:{
		                  0:{stddev: Math.sqrt(variance(p30b0)), mean: mean(p30b0)},
		                  1:{stddev: Math.sqrt(variance(p30b1)), mean: mean(p30b1)},
		                  2:{stddev: Math.sqrt(variance(p30b2)), mean: mean(p30b2)}
		               }
		            },
		            1:{
		               direction:{
		                  0:{stddev: Math.sqrt(variance(p31d0)), mean: mean(p31d0)},
		                  1:{stddev: Math.sqrt(variance(p31d1)), mean: mean(p31d1)},
		                  2:{stddev: Math.sqrt(variance(p31d2)), mean: mean(p31d2)}
		               },
		               basis:{
		                  0:{stddev: Math.sqrt(variance(p31b0)), mean: mean(p31b0)},
		                  1:{stddev: Math.sqrt(variance(p31b1)), mean: mean(p31b1)},
		                  2:{stddev: Math.sqrt(variance(p31b2)), mean: mean(p31b2)}
		               }
		            },
		            2:{
		               direction:{
		                  0:{stddev: Math.sqrt(variance(p32d0)), mean: mean(p32d0)},
		                  1:{stddev: Math.sqrt(variance(p32d1)), mean: mean(p32d1)},
		                  2:{stddev: Math.sqrt(variance(p32d2)), mean: mean(p32d2)}
		               },
		               basis:{
		                  0:{stddev: Math.sqrt(variance(p32b0)), mean: mean(p32b0)},
		                  1:{stddev: Math.sqrt(variance(p32b1)), mean: mean(p32b1)},
		                  2:{stddev: Math.sqrt(variance(p32b2)), mean: mean(p12b2)}
		               }
		            }
		         }
		      },
		      {
		         finger:"Pinky finger",
		         bones:{
		            0:{
		               direction:{
		                  0:{stddev: Math.sqrt(variance(p40d0)), mean: mean(p40d0)},
		                  1:{stddev: Math.sqrt(variance(p40d1)), mean: mean(p40d1)},
		                  2:{stddev: Math.sqrt(variance(p40d2)), mean: mean(p40d2)}
		               },
		               basis:{
		                  0:{stddev: Math.sqrt(variance(p40b0)), mean: mean(p40b0)},
		                  1:{stddev: Math.sqrt(variance(p40b1)), mean: mean(p40b1)},
		                  2:{stddev: Math.sqrt(variance(p40b2)), mean: mean(p40b2)}
		               }
		            },
		            1:{
		               direction:{
		                  0:{stddev: Math.sqrt(variance(p41d0)), mean: mean(p41d0)},
		                  1:{stddev: Math.sqrt(variance(p41d1)), mean: mean(p41d1)},
		                  2:{stddev: Math.sqrt(variance(p41d2)), mean: mean(p41d2)}
		               },
		               basis:{
		                  0:{stddev: Math.sqrt(variance(p41b0)), mean: mean(p41b0)},
		                  1:{stddev: Math.sqrt(variance(p41b1)), mean: mean(p41b1)},
		                  2:{stddev: Math.sqrt(variance(p41b2)), mean: mean(p41b2)}
		               }
		            },
		            2:{
		               direction:{
		                  0:{stddev: Math.sqrt(variance(p42d0)), mean: mean(p42d0)},
		                  1:{stddev: Math.sqrt(variance(p42d1)), mean: mean(p42d1)},
		                  2:{stddev: Math.sqrt(variance(p42d2)), mean: mean(p42d2)}
		               },
		               basis:{
		                  0:{stddev: Math.sqrt(variance(p42b0)), mean: mean(p42b0)},
		                  1:{stddev: Math.sqrt(variance(p42b1)), mean: mean(p42b1)},
		                  2:{stddev: Math.sqrt(variance(p42b2)), mean: mean(p42b2)}
		               }
		            }
		         }
		      }
		   ]
		}
		blah++;
		console.log(blah);
		console.log(startChar);
		if (blah == 100){
			console.log(JSON.stringify(result));
			var newCharSchema = new charSchema({
				pointables: result
			});
			newCharSchema.save();
			blah = 0;
			startChar = nextChar(startChar);
		}
	});

	ws.on('message', function(myo){
		var data = JSON.parse(myo);
		if (data[1].type == "orientation")
		{
			var o = data[1].orientation;
			var pitch = Math.asin(2.0 * (o.w * o.y - o.x * o.z));
			var roll = Math.atan2(2.0 * (o.w * o.x + o.y * o.z), 1.0 - 2.0 * (o.x * o.x + o.y * o.y));
			var yaw = Math.atan2(2 * (o.w * o.z + o.x * o.y), 1.0 - 2.0 * (o.y * o.y + o.z * o.z));
			if (activated){
				//console.log(toDegrees(roll) + ", " + toDegrees(yaw) + ", " + toDegrees(pitch));
				if((new Date()).getTime() - previousTime > 250){
					if (previousDegree != 0 && (toDegrees(roll) - previousDegree) > 30){
						io.sockets.emit("char", "j");
					}
					previousDegree = toDegrees(roll);
					previousTime = (new Date().getTime());
				}
			}
		}
		else{
			if (counter == 0){
				if (data[1].pose == "wave_in"){
					activated = !activated;
					var state = activated?"activated":"deactivated";
					if (!activated){
						handDetection = false;
					}
					io.sockets.emit("char", state);
					console.log(state);
				}
				if (data[1].pose == "fist"){
					if (activated && notS)
					{
						io.sockets.emit("char", "s");
						notS = false;
					}
				}
				counter++;
			}
			else if (counter > 2){
				counter = 0
			}
			else{
				counter++;
			}
		}
	});
});

function toDegrees(rad){
	return rad * 180 / Math.PI;
}

function mean(arr)
{
    var len = 0;
    var sum = 0;
    
    for(var i=0;i<arr.length;i++)
    {
          if (arr[i] == ""){}
          else if (!isNum(arr[i]))
          {
              //alert(arr[i] + " is not number!");
              return;
          }
          else
          {
             len = len + 1;
             sum = sum + parseFloat(arr[i]); 
          }
    }

    return sum / len;    
}

function variance(arr)
{
    var len = 0;
    var sum=0;
    for(var i=0;i<arr.length;i++)
    {
          if (arr[i] == ""){}
          else if (!isNum(arr[i]))
          {
              return 0;
          }
          else
          {
             len = len + 1;
             sum = sum + parseFloat(arr[i]); 
          }
    }

    var v = 0;
    if (len > 1)
    {
        var mean = sum / len;
        for(var i=0;i<arr.length;i++)
        {
              if (arr[i] == ""){}
              else
              {
                  v = v + (arr[i] - mean) * (arr[i] - mean);              
              }        
        }
        
        return v / len;
    }
    else
    {
         return 0;
    }    
}
function isNum(args)
{
    args = args.toString();

    if (args.length == 0) return false;

    for (var i = 0;  i<args.length;  i++)
    {
        if ((args.substring(i,i+1) < "0" || args.substring(i, i+1) > "9") && args.substring(i, i+1) != "."&& args.substring(i, i+1) != "-")
        {
            return false;
        }
    }

    return true;
}

function nextChar(c) {
	var char = String.fromCharCode(c.charCodeAt(0) + 1)
	if (char == 'j'){
		char = nextChar(char);
	}
    return char;
}

