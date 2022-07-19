import { DocumentDefinition } from "mongoose";
import UserModal, { UserDocument } from "../modals/user.modal";
export async function CreateUser(input: DocumentDefinition<Omit<UserDocument, 'createdAt' | 'updatedAt' | 'passwoard' |'comparedPasswoard'>>) {
  try {
    return await UserModal.create(input)
  } catch (e: any) { }
}