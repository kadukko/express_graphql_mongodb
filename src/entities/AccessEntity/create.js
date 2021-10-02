import AccessEntity from ".";
import hashPassword from "./helpers/hashPassword";

export default function create(data) {
    return AccessEntity.model.create({
        ...data,
        password: hashPassword(data.password, data.username)
    })
}