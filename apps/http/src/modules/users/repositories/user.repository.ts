import { NotFoundException } from '@nestjs/common';
import { Repository, Entity, DataSource } from 'typeorm';
import { v4 as uuidv4 } from 'uuid';

import { UserRegisterDto } from '../dtos/user-register.dto';
import { User } from '../entities/user.entity';

@Entity()
export class UserRepository extends Repository<User> {
    constructor(private dataSource: DataSource) {
        super(User, dataSource.createEntityManager(), dataSource.createQueryRunner());
    }
    async createUser(userRegisterDto: UserRegisterDto) {
        const id = uuidv4();
        const user = await this.save(super.create({ ...{ id }, ...userRegisterDto }));
        user.create();
        return user;
    }

    async updateUser(userDto) {
        await super.update({ id: userDto.id }, userDto);
        const updatedUser = await super.findOne({ where: { id: userDto.id } });
        if (!updatedUser) {
            throw new NotFoundException();
        }
        updatedUser.update();
        return updatedUser;
    }

    async deleteUser(userDto) {
        // Todo
        const user = await super.findOne({ where: { id: userDto.id } });
        await super.delete({ id: userDto.id });
        if (!user) {
            throw new NotFoundException();
        }
        user.delete();
        return user;
    }

    async welcomeUser(userDto) {
        // Todo
        const user = await super.findOne({ where: { id: userDto.id } });
        if (!user) {
            throw new NotFoundException();
        }
        user.welcome();
        return user;
    }
}
