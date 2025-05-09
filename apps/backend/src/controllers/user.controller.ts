import { Body, Controller, Param, Patch, UseGuards } from '@nestjs/common';
import { AuthGuard } from '../guards/auth.guard';
import { UserService } from 'src/services/user.service';

@Controller('user')
@UseGuards(AuthGuard)
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Patch(':id')
  async updateDisplayName(
    @Param('id') id: string,
    @Body() body: { displayName: string },
  ) {
    return await this.userService.updateDisplayName(id, body.displayName);
  }
}
