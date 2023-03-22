import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
} from '@nestjs/common';
import { StatusService } from './status.service';
import { CreateStatusDto } from './dto/create-status.dto';
import { UpdateStatusDto } from './dto/update-status.dto';
import { CreatorGuard, IsActiveGuard } from '../common/guards';

@Controller('status')
export class StatusController {
  constructor(private readonly statusService: StatusService) {}

  @UseGuards(CreatorGuard)
  @UseGuards(IsActiveGuard)
  @Post()
  create(@Body() createStatusDto: CreateStatusDto) {
    return this.statusService.create(createStatusDto);
  }

  @UseGuards(IsActiveGuard)
  @Get()
  findAll() {
    return this.statusService.findAll();
  }

  @UseGuards(IsActiveGuard)
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.statusService.findOne(+id);
  }

  @UseGuards(CreatorGuard)
  @UseGuards(IsActiveGuard)
  @Patch(':id')
  update(@Param('id') id: string, @Body() updateStatusDto: UpdateStatusDto) {
    return this.statusService.update(+id, updateStatusDto);
  }

  @UseGuards(CreatorGuard)
  @UseGuards(IsActiveGuard)
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.statusService.remove(+id);
  }
}
