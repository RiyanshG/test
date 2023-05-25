function TurnLeft (sec: number) {
    hummingbird.setRotationServo(FourPort.One, -100)
    hummingbird.setRotationServo(FourPort.Two, 0)
    basic.pause(sec * 1000)
    hummingbird.setRotationServo(FourPort.One, 0)
    hummingbird.setRotationServo(FourPort.Two, 0)
}
function GoForward (sec: number) {
    hummingbird.setRotationServo(FourPort.One, 100)
    hummingbird.setRotationServo(FourPort.Two, -55)
    basic.pause(sec * 1000)
    hummingbird.setRotationServo(FourPort.One, 0)
    hummingbird.setRotationServo(FourPort.Two, 0)
}
function PoliceLEDOff () {
    hummingbird.setTriLED(
    TwoPort.Two,
    0,
    0,
    0
    )
    hummingbird.setLED(ThreePort.Three, 0)
}
function PoliceLEDOn () {
    while (!(direction == 0)) {
        hummingbird.setTriLED(
        TwoPort.Two,
        255,
        0,
        0
        )
        hummingbird.setPositionServo(FourPort.Three, 0)
        music.playTone(523, music.beat(BeatFraction.Whole))
        hummingbird.setTriLED(
        TwoPort.Two,
        0,
        0,
        255
        )
        hummingbird.setPositionServo(FourPort.Three, 180)
        music.playTone(622, music.beat(BeatFraction.Whole))
    }
}
function GoBackward (sec: number) {
    hummingbird.setRotationServo(FourPort.One, -100)
    hummingbird.setRotationServo(FourPort.Two, 55)
    basic.pause(sec * 1000)
    hummingbird.setRotationServo(FourPort.One, 0)
    hummingbird.setRotationServo(FourPort.Two, 0)
}
function TurnRight (sec: number) {
    hummingbird.setRotationServo(FourPort.One, 0)
    hummingbird.setRotationServo(FourPort.Two, 100)
    basic.pause(sec * 1000)
    hummingbird.setRotationServo(FourPort.One, 0)
    hummingbird.setRotationServo(FourPort.Two, 0)
}
function Stop () {
    hummingbird.setRotationServo(FourPort.One, 0)
    hummingbird.setRotationServo(FourPort.Two, 0)
}
// Start hummingbird and turn on the headlights:
// 
// direction: -1: backward, 0: stop, 1: forward, -0.5: left, 0.5: right
// LED 1: left front yellow light
// LED 2: right front yellow light
// .................................................................................
// The LEDs are:
//    single:
// 1: left front yellow light
// 2: right front yellow light
// 3: left back red light
//     tri:
// 1: right back red light
// 2: red/blue tri-led at the top of the car(police lights)
// .................................................................................
// The sensors are:
// Distance Sensor 1: The sensor at the front. When it detects something, the car starts moving.
// .................................................................................
// The servos are:
//     Rotation:
// 1: Front left wheel
// 2: Front right wheel
//     Position:
// 3: spinning police LED
let direction = 0
hummingbird.startHummingbird()
direction = 0
hummingbird.setLED(ThreePort.One, 100)
hummingbird.setLED(ThreePort.Two, 100)
// Move the robot if it senses my hand, and stop moving it when it senses my hand again.
basic.forever(function () {
    if (hummingbird.getSensor(SensorType.Distance, ThreePort.One) < 7) {
        while (hummingbird.getSensor(SensorType.Distance, ThreePort.One) < 7) {
        	
        }
        while (hummingbird.getSensor(SensorType.Distance, ThreePort.One) > 7) {
            direction = 1
            GoForward(3)
            direction = -1
            hummingbird.setLED(ThreePort.Three, 100)
            hummingbird.setTriLED(
            TwoPort.One,
            255,
            0,
            0
            )
            GoBackward(3)
            direction = -0.5
            hummingbird.setLED(ThreePort.Three, 0)
            hummingbird.setTriLED(
            TwoPort.One,
            0,
            0,
            0
            )
            TurnLeft(3)
            direction = 1
            GoForward(3)
            direction = -1
            hummingbird.setLED(ThreePort.Three, 100)
            hummingbird.setTriLED(
            TwoPort.One,
            255,
            0,
            0
            )
            GoBackward(3)
            direction = 0.5
            hummingbird.setLED(ThreePort.Three, 0)
            hummingbird.setTriLED(
            TwoPort.One,
            0,
            0,
            0
            )
            TurnRight(3)
        }
        direction = 0
        Stop()
    } else {
        direction = 0
        Stop()
    }
})
// Turn on the police light and siren if the car is moving, otherwise turn on the rear lights.
basic.forever(function () {
    if (!(direction == 0)) {
        hummingbird.setLED(ThreePort.Three, 0)
        hummingbird.setTriLED(
        TwoPort.One,
        0,
        0,
        0
        )
        PoliceLEDOn()
    } else {
        PoliceLEDOff()
        music.stopAllSounds()
        hummingbird.setLED(ThreePort.Three, 100)
        hummingbird.setTriLED(
        TwoPort.One,
        255,
        0,
        0
        )
    }
})
