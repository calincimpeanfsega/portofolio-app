import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Work } from './entities/work.entity';
import { CreateWorkDto } from './dto/create-work.dto';
import * as fs from 'fs';
import * as path from 'path';
import * as crypto from 'crypto';

@Injectable()
export class WorkService {
  constructor(
    @InjectRepository(Work)
    private workRepository: Repository<Work>,
  ) {}

  async saveFile(file: Express.Multer.File): Promise<string> {
    if (!file || !file.buffer) {
      console.error('File or file buffer is missing');
      throw new Error('File buffer is missing');
    }

    const uploadsDir = path.join(__dirname, '..', '..', 'uploads');
    // Ensure the uploads directory exists
    if (!fs.existsSync(uploadsDir)) {
      fs.mkdirSync(uploadsDir, { recursive: true });
    }

    const filename = crypto.randomBytes(16).toString('hex') + path.extname(file.originalname);
    const filePath = path.join(uploadsDir, filename);

    try {
      // Write file buffer to the file
      fs.writeFileSync(filePath, file.buffer);
    } catch (error) {
      console.error('Error saving file:', error);
      throw error;
    }

    return `/uploads/${filename}`;
  }

  create(createWorkDto: CreateWorkDto, filePath?: string): Promise<Work> {
    const work = this.workRepository.create({
      ...createWorkDto,
      image: filePath || '',
    });
    return this.workRepository.save(work);
  }

  findAll(): Promise<Work[]> {
    return this.workRepository.find();
  }

  findOne(id: number): Promise<Work> {
    return this.workRepository.findOne({ where: { id } });
  }

  async update(id: number, updateWorkDto: CreateWorkDto, filePath?: string): Promise<Work> {
    const updateData = {
      ...updateWorkDto,
      ...(filePath && { image: filePath }),
    };

    await this.workRepository.update(id, updateData);
    return this.workRepository.findOne({ where: { id } });
  }

  async remove(id: number): Promise<void> {
    await this.workRepository.delete(id);
  }
}
