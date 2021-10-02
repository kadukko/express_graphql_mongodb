import AccessModel from "../../model/AccessModel"
import create from "./create"
import getByLogin from "./getByLogin"

const AccessEntity = () => ({
    model: AccessModel,
    create: create,
    getByLogin: getByLogin
})

export default AccessEntity()