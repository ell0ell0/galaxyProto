var scale = 30;

var canvas = document.querySelector('#canvas'),
   readout = document.querySelector('#readout'),
   context = canvas.getContext('2d');
   context.canvas.width  = window.innerWidth;
   context.canvas.height = window.innerHeight;

var    b2Vec2 = Box2D.Common.Math.b2Vec2
      ,      b2BodyDef = Box2D.Dynamics.b2BodyDef
      ,      b2Body = Box2D.Dynamics.b2Body
      ,      b2FixtureDef = Box2D.Dynamics.b2FixtureDef
      ,      b2World = Box2D.Dynamics.b2World
      ,      b2PolygonShape = Box2D.Collision.Shapes.b2PolygonShape
      ,      b2CircleShape = Box2D.Collision.Shapes.b2CircleShape
      ,      b2MouseJointDef =  Box2D.Dynamics.Joints.b2MouseJointDef
      ,      b2DebugDraw = Box2D.Dynamics.b2DebugDraw
      ,      b2Fixture = Box2D.Dynamics.b2Fixture
      ,      b2AABB = Box2D.Collision.b2AABB
      ,     b2Color = Box2D.Common.b2Color;


      var world = new b2World(new b2Vec2(0,0), true);
      
      var bodyDef = new b2BodyDef;
      bodyDef.type = b2Body.b2_staticBody;
      
      var fixDef = new b2FixtureDef;      
      fixDef.density = 10.0;
      fixDef.friction = 0.5;
      fixDef.restitution = .5;
      
      //CREATING A CIRCLE WITH MULTIPLE(2) FIXTURES -- ONE OF THEM WILL BE A SENSOR
      
      bodyDef.position.Set((window.innerWidth/scale)/2,(window.innerHeight/scale)/2);
      bodyDef.userData = 'CIRCLE';
      
      //CIRCLE -- MAIN BODY FIXTURE
      fixDef.shape = new b2CircleShape(1);
      
      //CIRCLE -- SENSOR FIXTURE
      var fixDef2 = new b2FixtureDef;
      fixDef2.shape = new b2CircleShape(12);
      fixDef2.shape.SetLocalPosition(new b2Vec2(0 ,0));
      fixDef2.density = 0;
      fixDef2.isSensor = true; // SENSOR SET TO TRUE -- Fixture "fixDef2" is a SENSOR
        
        var wheel = world.CreateBody(bodyDef);
      wheel.CreateFixture(fixDef);
      wheel.CreateFixture(fixDef2);
      
      //BOX
      bodyDef.type = b2Body.b2_dynamicBody;
      bodyDef.position.Set(2,2);
      bodyDef.userData = 'BOX1';
      fixDef.shape = new b2CircleShape(0.4);
      // fixDef.shape.SetAsBox(0.25,0.25); //Half Width, Half Height
      var box1 = world.CreateBody(bodyDef);
      box1.CreateFixture(fixDef);
      
      bodyDef.position.Set(5,2);
      bodyDef.userData = 'BOX2';
      var box2 = world.CreateBody(bodyDef);
      box2.CreateFixture(fixDef);
      

      var pull = [];
      var listener = new Box2D.Dynamics.b2ContactListener;
      listener.BeginContact = function(contact) {
          fxA=contact.GetFixtureA(); // 1st COLLISION FIXTURE
          fxB=contact.GetFixtureB(); // 2nd COLLISION FIXTURE
          sA=fxA.IsSensor(); // Will store whether 1st fixture is a sensor or not (true or false)
          sB=fxB.IsSensor(); // Will store whether 2nd fixture is a sensor or not (true or false)
          if((sA && !sB) || (sB && !sA))  { // Will go on further iff Fixture A or B not both are sensors.
             if(sA)  {
                var bodyB = fxB.GetBody();
                pull.push(bodyB);
                console.log(pull);
             }
             else {
                var bodyA = fxA.GetBody();
                pull.push(bodyA);
                console.log(pull);
             }
          }
      }
      listener.EndContact = function(contact) {
          fxA=contact.GetFixtureA(); // 1st COLLISION FIXTURE
          fxB=contact.GetFixtureB(); // 2nd COLLISION FIXTURE
          sA=fxA.IsSensor(); // Will store whether 1st fixture is a sensor or not (true or false)
          sB=fxB.IsSensor(); // Will store whether 2nd fixture is a sensor or not (true or false)
          if((sA && !sB) || (sB && !sA))  { // Will go on further iff Fixture A or B not both are sensors.
             if(sA)  {
                var bodyB = fxB.GetBody();
                var index = pull.indexOf(bodyB);
                pull.splice(index,1);
                console.log(pull);
             }
             else {
                var bodyA = fxA.GetBody();
                var index = pull.indexOf(bodyA);
                pull.splice(index,1);
                console.log(pull);
             }
          }
      }



      var debugDraw = new b2DebugDraw();
      debugDraw.SetSprite ( document.getElementById ("canvas").getContext ("2d"));
      debugDraw.SetDrawScale(scale);     //define scale
      debugDraw.SetFillAlpha(0.3);    //define transparency
      debugDraw.SetLineThickness(1.0);
      debugDraw.SetFlags(b2DebugDraw.e_shapeBit | b2DebugDraw.e_jointBit);
      world.SetDebugDraw(debugDraw);
      
      window.setInterval(update,1000/60);
      //mouse

var mouseX, mouseY, mousePVec, isMouseDown, selectedBody, mouseJoint;

var canvasPosition = {};
canvasPosition.x = $('canvas').offset().left;
canvasPosition.y = $('canvas').offset().top;

//var canvasPosition = getElementPosition(document.getElementById("canvas"));

document.addEventListener("mousedown", function(e) {
   isMouseDown = true;
   handleMouseMove(e);
   document.addEventListener("mousemove", handleMouseMove, true);
}, true);

document.addEventListener("mouseup", function() {
   document.removeEventListener("mousemove", handleMouseMove, true);
   isMouseDown = false;
   mouseX = undefined;
   mouseY = undefined;
}, true);

function handleMouseMove(e) {
   mouseX = (e.clientX - canvasPosition.x) / scale;
   mouseY = (e.clientY - canvasPosition.y) / scale;
};
function getBodyAtMouse() {
   mousePVec = new b2Vec2(mouseX, mouseY);
   var aabb = new b2AABB();
   aabb.lowerBound.Set(mouseX - 0.001, mouseY - 0.001);
   aabb.upperBound.Set(mouseX + 0.001, mouseY + 0.001);
   // Query the world for overlapping shapes.
   selectedBody = null;
   world.QueryAABB(getBodyCB, aabb);
   return selectedBody;
}
function getBodyCB(fixture) {
   if(fixture.GetBody().GetType() != 0) { //Static Bodies have type 0
      if(fixture.GetShape().TestPoint(fixture.GetBody().GetTransform(), mousePVec)) {
         selectedBody = fixture.GetBody();
         return false;
      }
   }
   return true;
}
      
      function update() {
if(isMouseDown && (!mouseJoint)) {
var body = getBodyAtMouse();
if(body) {
var md = new b2MouseJointDef();
md.bodyA = world.GetGroundBody();
md.bodyB = body;
md.target.Set(mouseX, mouseY);
md.collideConnected = true;
md.maxForce = 300.0 * body.GetMass();
mouseJoint = world.CreateJoint(md);
body.SetAwake(true);
}
}
if(mouseJoint) {
if(isMouseDown) {
mouseJoint.SetTarget(new b2Vec2(mouseX, mouseY));
} 
else {
world.DestroyJoint(mouseJoint);
mouseJoint = null;
}
}
         world.Step(1 / 60, 10, 10);
         world.DrawDebugData();
         world.ClearForces();
         world.SetContactListener(listener);
         for(i=0;i<pull.length;i++) {
            var c1 = pull[i].GetWorldCenter();
            var c2 = wheel.GetWorldCenter();
            var vec = new b2Vec2();
            vec.x = c2.x - c1.x;
            vec.y = c2.y - c1.y;
            var mag = Math.sqrt(((vec.x*vec.x)+(vec.y*vec.y)));
            vec.x = vec.x / mag;
            vec.y = vec.y / mag;
            var force = new b2Vec2();
            force.x = 100 * vec.x;
            force.y = 100 * vec.y;
            pull[i].ApplyForce(force, pull[i].GetWorldPoint(new b2Vec2(0,0)));
            pull[i].SetAngularDamping(0);
         }
         
      };