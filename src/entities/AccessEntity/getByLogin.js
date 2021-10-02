import AccessEntity from ".";
import hashPassword from "./helpers/hashPassword";

export default function getByLogin(username, password) {
    return AccessEntity.model.findOne({username, password: hashPassword(password, username), active: true})
}