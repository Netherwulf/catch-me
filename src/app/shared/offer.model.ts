export class OfferModel {
  title: string;
  category: string;
  description: string;
  city: string;
  exchangeList: string[];
  userId: string;

  constructor() {
    this.title = '';
    this.category = '';
    this.description = '';
    this.city = '';
    this.exchangeList = [];
    this.userId = '';
  }
}
