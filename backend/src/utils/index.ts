import casual from "casual"





const generateUserName = () => {
    const username = casual.username + casual.integer(1, 99)
    return username;


}
export { generateUserName }