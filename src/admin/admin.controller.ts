import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  Query,
} from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { CreatorGuard, IsActiveGuard } from '../common/guards';
import { AdminService } from './admin.service';
import { DisactiveteAdminDto } from './dto/disactivete-admin.dto';
import { CreateAdminDto } from './dto/create-admin.dto';
import { UpdateAdminDto } from './dto/update-admin.dto';
import { Admin } from './entities/admin.entity';

@ApiTags('Admin')
@Controller('admin')
export class AdminController {
  constructor(private readonly adminService: AdminService) {}

  @ApiOperation({ summary: 'Create Admin' })
  @ApiResponse({ status: 200, type: Admin })
  @UseGuards(CreatorGuard)
  @UseGuards(IsActiveGuard)
  @Post()
  create(@Body() createAdminDto: CreateAdminDto) {
    return this.adminService.create(createAdminDto);
  }

  @ApiOperation({ summary: 'Get Admin by id' })
  @ApiResponse({ status: 200, type: Admin })
  @UseGuards(IsActiveGuard)
  @Get('search/all?')
  findAll(@Query('page') pageNumber: string) {
    return this.adminService.findAll(+pageNumber);
  }

  @ApiOperation({ summary: 'Get all Admins' })
  @ApiResponse({ status: 200, type: [Admin] })
  @UseGuards(IsActiveGuard)
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.adminService.findOne(+id);
  }

  @ApiOperation({ summary: 'Update admin by id' })
  @ApiResponse({ status: 200, description: 'Updated' })
  @UseGuards(CreatorGuard)
  @UseGuards(IsActiveGuard)
  @Patch(':id')
  update(@Param('id') id: string, @Body() updateAdminDto: UpdateAdminDto) {
    return this.adminService.update(+id, updateAdminDto);
  }

  @ApiOperation({ summary: 'Delete admin by id' })
  @ApiResponse({ status: 200, description: 'Deleted' })
  @UseGuards(CreatorGuard)
  @UseGuards(IsActiveGuard)
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.adminService.remove(+id);
  }

  @ApiOperation({ summary: 'Disactivete admin' })
  @ApiResponse({ status: 200, type: Admin })
  @UseGuards(CreatorGuard)
  @UseGuards(IsActiveGuard)
  @Post('/disactivete')
  disactivete(@Body() disactiveteAdminDto: DisactiveteAdminDto) {
    return this.adminService.disactiveteAdmin(disactiveteAdminDto);
  }
}
