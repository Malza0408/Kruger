import { EducationModel } from "../schemas/education";
import { UserModel } from '../schemas/user';

class Education {
  static async create({ newEducation }) {
    console.log(newEducation)
    let createdNewEducation = await EducationModel.create(newEducation)
    // createdNewEducation = await createdNewEducation.populate('user').execPopulate()
    return createdNewEducation;
  }

  // static async findByEmail({ email }) {
  //   const user = await UserModel.findOne({ email });
  //   return user;
  // }

  static async findByUserId({ user_id }) {
    console.log('findByUser 연결')
    console.log(user_id)
   
      const education = await EducationModel.findOne({user_id}).populate('user')
    
    return education;
  }

  // static async findAll() {
  //   const users = await UserModel.find({});
  //   return users;
  // }

  // static async update({ user_id, fieldToUpdate, newValue }) {
  //   const filter = { id: user_id };
  //   const update = { [fieldToUpdate]: newValue };
  //   const option = { returnOriginal: false };

  //   const updatedUser = await UserModel.findOneAndUpdate(
  //     filter,
  //     update,
  //     option
  //   );
  //   return updatedUser;
  // }
}

export { Education };
