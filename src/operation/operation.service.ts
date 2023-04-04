import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { CreateOperationDto } from './dto/create-operation.dto';
import { UpdateOperationDto } from './dto/update-operation.dto';
import { Operation } from './entities/operation.entity';

@Injectable()
export class OperationService {
  constructor(
    @InjectModel(Operation) private operationModel: typeof Operation,
  ) {}
  create(createOperationDto: CreateOperationDto) {
    return this.operationModel.create({ ...createOperationDto });
  }

  findAll() {
    return this.operationModel.findAll({ include: { all: true } });
  }

  async findOne(id: number) {
    const operation = await this.operationModel.findOne({
      where: { id },
      include: { all: true },
    });
    if (!operation) {
      throw new HttpException('Not Found', HttpStatus.NOT_FOUND);
    }
    return operation;
  }

  async update(id: number, updateOperationDto: UpdateOperationDto) {
    const updatedOperation = await this.operationModel.update(
      updateOperationDto,
      {
        where: { id },
      },
    );

    if (!updatedOperation[0]) {
      throw new HttpException('Not Found', HttpStatus.NOT_FOUND);
    }

    throw new HttpException('Updated', HttpStatus.OK);
  }

  async remove(id: number) {
    const deletedOperation = await this.operationModel.destroy({
      where: { id },
    });

    if (!deletedOperation) {
      throw new HttpException('Not Found', HttpStatus.NOT_FOUND);
    }

    throw new HttpException('Deleted', HttpStatus.OK);
  }
}
