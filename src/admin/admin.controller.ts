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
import { CreatorGuard, IsActiveGuard } from '../common/guards';
import { AdminService } from './admin.service';
import { ActivateAdminDto } from './dto/activate-admin.dto';
import { CreateAdminDto } from './dto/create-admin.dto';
import { UpdateAdminDto } from './dto/update-admin.dto';

@Controller('admin')
export class AdminController {
  constructor(private readonly adminService: AdminService) {}

  @UseGuards(CreatorGuard)
  @UseGuards(IsActiveGuard)
  @Post()
  create(@Body() createAdminDto: CreateAdminDto) {
    return this.adminService.create(createAdminDto);
  }

  @UseGuards(IsActiveGuard)
  @Get()
  findAll() {
    return this.adminService.findAll();
  }

  @UseGuards(IsActiveGuard)
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.adminService.findOne(+id);
  }

  @UseGuards(CreatorGuard)
  @UseGuards(IsActiveGuard)
  @Patch(':id')
  update(@Param('id') id: string, @Body() updateAdminDto: UpdateAdminDto) {
    return this.adminService.update(+id, updateAdminDto);
  }

  @UseGuards(CreatorGuard)
  @UseGuards(IsActiveGuard)
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.adminService.remove(+id);
  }

  @UseGuards(CreatorGuard)
  @UseGuards(IsActiveGuard)
  @Post('/activate')
  activate(@Body() activateAdminDto: ActivateAdminDto) {
    return this.adminService.activateAdmin(activateAdminDto);
  }
}
