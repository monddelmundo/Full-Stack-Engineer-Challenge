import { Result } from "../models/result";

export class ResultService {
  private static _result;
  static get result() {
    return ResultService._result;
  }

  create(obj) {
    return Result.create({...obj, createdAt: new Date(), updatedAt: null}).then((item) =>
      item
    );
  }

  getById(id: number) {
    return Result.findByPk(id);
  }

  getAll() {
    return Result.findAll();
  }
}
