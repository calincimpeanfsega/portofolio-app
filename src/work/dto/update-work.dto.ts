import { CreateWorkDto } from './create-work.dto';

export class UpdateWorkDto {
  title?: string;
  description?: string;
  image?: string;
  clientLink?: string;
  status?: boolean;
}