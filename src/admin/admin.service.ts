import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { ActivateAdminDto } from './dto/activate-admin.dto';
import { CreateAdminDto } from './dto/create-admin.dto';
import { UpdateAdminDto } from './dto/update-admin.dto';
import { Admin } from './entities/admin.entity';

@Injectable()
export class AdminService {
  constructor(@InjectModel(Admin) private adminModel: typeof Admin) {}

  create(createAdminDto: CreateAdminDto) {
    return this.adminModel.create({ ...createAdminDto });
  }

  findAll() {
    return this.adminModel.findAll({});
  }

  async findOne(id: number) {
    const admin = await this.adminModel.findOne({ where: { id } });

    if (!admin) {
      throw new HttpException('Not Found', HttpStatus.NOT_FOUND);
    }

    return admin;
  }

  async findByEmail(email: string) {
    const adminEmail = await this.adminModel.findOne({ where: { email } });

    return adminEmail;
  }

  async findByUserName(user_name: string) {
    const adminUsername = await this.adminModel.findOne({
      where: { user_name },
    });

    return adminUsername;
  }

  async findByPhonenumber(phone_number: string) {
    const adminPhonenumber = await this.adminModel.findOne({
      where: { phone_number },
    });

    return adminPhonenumber;
  }

  async activateAdmin(activateAdminDto: ActivateAdminDto) {
    const admin = await this.adminModel.findOne({
      where: { id: activateAdminDto.id },
    });

    if (!admin) {
      throw new HttpException('Not Found', HttpStatus.NOT_FOUND);
    }

    admin.is_active = true;
    await admin.save();
    return admin;
  }

  async update(id: number, updateAdminDto: UpdateAdminDto) {
    const admin = await this.adminModel.update(updateAdminDto, {
      where: { id },
    });

    if (!admin[0]) {
      throw new HttpException('Not Found', HttpStatus.NOT_FOUND);
    }

    throw new HttpException('Updated', HttpStatus.OK);
  }

  async updateToken(id: number, token: string) {
    await this.adminModel.update(
      { hashed_token: token },
      {
        where: { id },
      },
    );
  }

  async remove(id: number) {
    const admin = await this.adminModel.destroy({
      where: { id },
    });

    if (!admin) {
      throw new HttpException('Not Found', HttpStatus.NOT_FOUND);
    }

    throw new HttpException('Deleted', HttpStatus.OK);
  }
}
