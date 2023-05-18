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
}
function PoliceLEDOn () {
    hummingbird.setTriLED(
    TwoPort.Two,
    255,
    0,
    0
    )
    basic.pause(300)
    hummingbird.setTriLED(
    TwoPort.Two,
    0,
    0,
    255
    )
    basic.pause(300)
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
// Start hummingbird and turn on the headlights
hummingbird.startHummingbird()
let direction = 0
hummingbird.setLED(ThreePort.One, 100)
hummingbird.setLED(ThreePort.Two, 100)
serial.writeNumber(hummingbird.getSensor(SensorType.Distance, ThreePort.One))
// Move the robot if it senses my hand, and stop moving it when it senses my hand again.
basic.forever(function () {
    if (hummingbird.getSensor(SensorType.Distance, ThreePort.One) < 5) {
        while (hummingbird.getSensor(SensorType.Distance, ThreePort.One) < 5) {
        	
        }
        while (hummingbird.getSensor(SensorType.Distance, ThreePort.One) > 5) {
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
            255,
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
            255,
            0,
            0
            )
            TurnRight(3)
        }
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
        while (!(direction == 0)) {
            music.playTone(523, music.beat(BeatFraction.Whole))
            music.playTone(622, music.beat(BeatFraction.Whole))
        }
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
basic.forever(function () {
    basic.showNumber(hummingbird.getSensor(SensorType.Distance, ThreePort.One))
})
