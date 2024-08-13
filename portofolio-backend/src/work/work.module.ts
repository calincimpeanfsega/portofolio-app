import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { WorkService } from './work.service';
import { WorkController } from './work.controller';
import { Work } from './entities/work.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Work])],
  controllers: [WorkController],
  providers: [WorkService],
})
export class WorkModule {}
