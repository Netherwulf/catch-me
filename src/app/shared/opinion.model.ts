export class OpinionModel {
  text: string;
  grade: string;
  authorId: string;
  recipientId: string;

  constructor() {
    this.text = '';
    this.grade = '';
    this.authorId = '';
    this.recipientId = '';
  }
}
