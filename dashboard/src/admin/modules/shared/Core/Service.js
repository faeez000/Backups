export default class Service {
  constructor(mapper = null, baseUrl = '') {
    this.mapper = mapper;
    this.baseUrl = baseUrl;
  }
  save() {}
  update() {}
  delete() {}
}
