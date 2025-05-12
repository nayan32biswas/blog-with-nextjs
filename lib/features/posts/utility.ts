import { nullableString } from "../common/types";

export function isSelfPost(currentUsername: nullableString, postUsername: nullableString) {
  if (!currentUsername || !postUsername) {
    return false;
  }

  return currentUsername === postUsername;
}
