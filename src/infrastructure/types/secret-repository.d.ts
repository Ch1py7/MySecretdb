export interface UpdateLike {
  updateLike: {
    $set: {
        likes: number;
    };
  }
  id: string
}