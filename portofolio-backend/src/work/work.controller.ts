import { Controller, Post, Body, UploadedFile, UseInterceptors, Put, Param, Get, Delete } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { WorkService } from './work.service';
import { CreateWorkDto } from './dto/create-work.dto';

@Controller('work')
export class WorkController {
  constructor(private readonly workService: WorkService) {}

  @Post()
  @UseInterceptors(FileInterceptor('image')) // Ensure 'image' matches the key used in frontend
  async create(@Body() createWorkDto: CreateWorkDto, @UploadedFile() file: Express.Multer.File) {
    console.log('Received POST request for create');
    console.log('Received file:', file);

    // Handle missing file
    if (!file) {
      throw new Error('No file uploaded');
    }

    const filePath = await this.workService.saveFile(file);
    return this.workService.create(createWorkDto, filePath);
  }

  @Get()
  findAll() {
    return this.workService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: number) {
    return this.workService.findOne(id);
  }

  @Put(':id')
  @UseInterceptors(FileInterceptor('image'))
  async update(@Param('id') id: number, @Body() updateWorkDto: CreateWorkDto, @UploadedFile() file?: Express.Multer.File) {
    console.log('Received PUT request for update');
    console.log('Received file:', file);

    const filePath = file ? await this.workService.saveFile(file) : undefined;
    return this.workService.update(id, updateWorkDto, filePath);
  }

  @Delete(':id')
  remove(@Param('id') id: number) {
    return this.workService.remove(id);
  }
}
