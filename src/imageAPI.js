import axios from 'axios';
export default class ImageAPI {
  constructor() {
    (this.KEY = '25937561-4be56ebc67dabae3f5d5abc9c'),
      (this.URL = 'https://pixabay.com/api/'),
      (this.image_type = 'photo'),
      (this.orientation = 'horizontal'),
      (this.safesearch = 'true'),
      (this.per_page = 5),
      (this.page = 1),
      (this.querry = '');
  }
  async getImages() {
    const searchRequest = `${this.URL}?key=${this.KEY}&q=${this.querry}&${this.image_type}&${this.orientation}&${this.safesearch}&per_page=${this.per_page}&page=${this.page}`;
    try {
      const response = await axios.get(searchRequest);
      return response.data;
    } catch (error) {
      return error.status;
    }
  }
  // get page() {
  //   return this.page;
  // }
  // set page(newPage) {
  //   this.page = newPage;
  // }
}
