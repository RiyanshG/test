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
hummingbird.startHummingbird()
let direction = 0
hummingbird.setLED(ThreePort.One, 100)
hummingbird.setLED(ThreePort.Two, 100)
basic.forever(function () {
    if (hummingbird.getSensor(SensorType.Distance, ThreePort.One) < 3.5) {
        while (hummingbird.getSensor(SensorType.Distance, ThreePort.One) < 3.5) {
        	
        }
        while (hummingbird.getSensor(SensorType.Distance, ThreePort.One) > 3.5) {
            direction = 1
            GoForward(3)
            direction = -1
            GoBackward(3)
            direction = -0.5
            TurnLeft(3)
            direction = 1
            GoForward(3)
            direction = -1
            GoBackward(3)
            direction = 0.5
            TurnRight(3)
        }
    } else {
        direction = 0
        Stop()
    }
})
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
