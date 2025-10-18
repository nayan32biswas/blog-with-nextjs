import { nullableString } from '../common/types';
import { PostDescriptionType } from './types';

export function isSelfPost(currentUsername?: nullableString, postUsername?: nullableString) {
  if (!currentUsername || !postUsername) {
    return false;
  }

  return currentUsername === postUsername;
}

export function getPostDescriptionContent(description?: PostDescriptionType) {
  if (!description) {
    return [];
  }

  return description.content || [];
}
