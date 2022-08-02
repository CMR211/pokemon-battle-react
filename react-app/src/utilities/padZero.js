export default function padZero(number) {
    let arr = []
    for (let i = 0; i < 3 - number.toString().length; i++) {
        arr.push("0")
    }
    arr.push(number.toString().split(""))
    return arr.join("")
}
