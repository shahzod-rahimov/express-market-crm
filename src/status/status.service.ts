import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { CreateStatusDto } from './dto/create-status.dto';
import { UpdateStatusDto } from './dto/update-status.dto';
import { Status } from './entities/status.entity';

@Injectable()
export class StatusService {
  constructor(@InjectModel(Status) private statusModel: typeof Status) {}

  create(createStatusDto: CreateStatusDto) {
    return this.statusModel.create({ ...createStatusDto });
  }

  findAll() {
    return this.statusModel.findAll({});
  }

  async findOne(id: number) {
    const status = await this.statusModel.findOne({ where: { id } });
    if (!status) {
      throw new HttpException('Not Found', HttpStatus.NOT_FOUND);
    }
    return status;
  }

  async update(id: number, updateStatusDto: UpdateStatusDto) {
    const updatedStatus = await this.statusModel.update(updateStatusDto, {
      where: { id },
    });

    if (!updatedStatus[0]) {
      throw new HttpException('Not Found', HttpStatus.NOT_FOUND);
    }

    throw new HttpException('Updated', HttpStatus.OK);
  }

  async remove(id: number) {
    const deletedStatus = await this.statusModel.destroy({ where: { id } });

    if (!deletedStatus) {
      throw new HttpException('Not Found', HttpStatus.NOT_FOUND);
    }

    throw new HttpException('Deleted', HttpStatus.OK);
  }
}
