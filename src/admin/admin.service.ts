import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { ActiveteAdminDto } from './dto/disactivete-admin.dto';
import { CreateAdminDto } from './dto/create-admin.dto';
import { UpdateAdminDto } from './dto/update-admin.dto';
import { Admin } from './entities/admin.entity';
import * as bcrypt from 'bcryptjs';
import { JwtService } from '@nestjs/jwt';
import { CheckTokenDto } from './dto/check-token.dto';

@Injectable()
export class AdminService {
  constructor(
    @InjectModel(Admin) private adminModel: typeof Admin,
    private readonly jwtService: JwtService,
  ) {}

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
      attributes: { exclude: ['hashed_password', 'hashed_token'] },
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
    const admin = await this.adminModel.findOne({
      where: { id },
      attributes: { exclude: ['hashed_password', 'hashed_token'] },
    });

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

  async activeteAdmin(activeteAdminDto: ActiveteAdminDto) {
    const admin = await this.adminModel.findOne({
      where: { id: activeteAdminDto.id },
    });

    if (admin.is_creator === true) {
      throw new HttpException('Admin is creator', HttpStatus.BAD_REQUEST);
    }

    if (!admin) {
      throw new HttpException('Not Found', HttpStatus.NOT_FOUND);
    }

    admin.is_active = activeteAdminDto.value;
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

  async checkToken(checkTokenDto: CheckTokenDto) {
    try {
      const { token } = checkTokenDto;

      if (token) {
        const adminData = this.jwtService.verify(token, {
          secret: process.env.ACCESS_TOKEN_KEY,
        });

        if (adminData) {
          if (adminData.sub && adminData.is_active) {
            const admin = await this.adminModel.findOne({
              where: { id: adminData.sub },
              attributes: { exclude: ['hashed_password', 'hashed_token'] },
            });
            if (admin) {
              return { isValid: true, data: admin };
            }
          }
        }
      }
      throw new HttpException({ isValid: false }, HttpStatus.BAD_REQUEST);
    } catch (error) {
      console.log(error);
      throw new HttpException(
        { isValid: false, error: error.message },
        HttpStatus.BAD_REQUEST,
      );
    }
  }
}
