import { getUsers } from "../repositories/user.repository";

export async function getUsersService() {
  return getUsers();
}
