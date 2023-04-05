import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { DisactiveteAdminDto } from './dto/disactivete-admin.dto';
import { CreateAdminDto } from './dto/create-admin.dto';
import { UpdateAdminDto } from './dto/update-admin.dto';
import { Admin } from './entities/admin.entity';
import * as bcrypt from 'bcryptjs';

@Injectable()
export class AdminService {
  constructor(@InjectModel(Admin) private adminModel: typeof Admin) {}

  async create(createAdminDto: CreateAdminDto) {
    const { user_name } = createAdminDto;

    const isExists = await this.findByUserName(user_name);

    if (isExists) {
      throw new HttpException('Username is exists', HttpStatus.BAD_REQUEST);
    }

    const hashed_password = await bcrypt.hash(
      createAdminDto.hashed_password,
      7,
    );
    const admin = await this.adminModel.create({
      ...createAdminDto,
      hashed_password,
    });

    return admin;
  }

  async findAll(pageNumber: number) {
    const PAGE_SIZE = 10;
    const offset = (pageNumber - 1) * PAGE_SIZE;

    const records = await this.adminModel.findAll({
      limit: PAGE_SIZE,
      offset,
      attributes: ['id', 'full_name', 'user_name', 'is_active', 'is_creator'],
    });

    const totalCount = await this.adminModel.count();

    const totalPages = Math.ceil(totalCount / PAGE_SIZE);

    return {
      records: records,
      pagination: {
        currentPage: pageNumber,
        totalPages: totalPages,
        totalCount: totalCount,
      },
    };
  }

  async findOne(id: number) {
    const admin = await this.adminModel.findOne({ where: { id } });

    if (!admin) {
      throw new HttpException('Not Found', HttpStatus.NOT_FOUND);
    }

    return admin;
  }

  async findByUserName(user_name: string) {
    const adminUsername = await this.adminModel.findOne({
      where: { user_name },
    });

    return adminUsername;
  }

  async disactiveteAdmin(disactiveteAdminDto: DisactiveteAdminDto) {
    const admin = await this.adminModel.findOne({
      where: { id: disactiveteAdminDto.id },
    });

    if (!admin) {
      throw new HttpException('Not Found', HttpStatus.NOT_FOUND);
    }

    admin.is_active = false;
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
