export default function getGenderInfo(genderRate) {
    const male = Math.round(((8 - genderRate) / 8) * 1000) / 10
    const female = Math.round((genderRate / 8) * 1000) / 10
    return [male + "%", female + "%"]
}
