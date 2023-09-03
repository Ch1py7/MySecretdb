import { ObjectId } from 'mongodb'

export interface UpdateLike {
  updateLike: {
    $set: {
        likes: number;
    };
  }
  _id: ObjectId
}