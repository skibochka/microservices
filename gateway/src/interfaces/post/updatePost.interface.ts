export interface IUpdatePostInput {
  userId: number;
  postId: number;
  dataToUpdate: {
    title?: string;
    text?: string;
  };
}
