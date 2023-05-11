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
hummingbird.startHummingbird()
basic.forever(function () {
    GoForward(3)
    GoBackward(3)
    TurnLeft(3)
    GoForward(3)
    GoBackward(3)
    TurnRight(3)
})
