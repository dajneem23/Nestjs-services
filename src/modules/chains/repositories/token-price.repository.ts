import { Injectable, NotFoundException } from '@nestjs/common';
import { Repository, Entity, EntityRepository, DataSource } from 'typeorm';
import { v4 as uuidv4 } from 'uuid';

import { TokenPrice } from '../entities/token-price.entity';
import { TokenPriceDto } from '../dtos/token-price.dto';

@Injectable()
export class TokenPriceRepository extends Repository<TokenPrice> {
    constructor(private dataSource: DataSource) {
        super(TokenPrice, dataSource.createEntityManager(), dataSource.createQueryRunner());
    }

    async createTokenPrice(createPriceDto: TokenPriceDto) {
        const id = uuidv4();
        const tokenPrice = await this.save(super.create({ ...{ id }, ...createPriceDto }));
        tokenPrice.create();
        return tokenPrice;
    }

    async updateTokenPrice(dto) {
        await super.update({ id: dto.id }, dto);
        const updatedPrice = await super.findOne({ where: { id: dto.id } });
        if (!updatedPrice) {
            throw new NotFoundException();
        }
        updatedPrice.update();
        return updatedPrice;
    }

    async deleteTokenPrice(dto) {
        const price = await super.findOne({ where: { id: dto.id } });
        if (!price) {
            throw new NotFoundException();
        }
        await super.delete({ id: dto.id });
        price.delete();
        return price;
    }

    // async welcomeUser(userDto) {
    //     // Todo
    //     const user = await super.findOne({ where: { id: userDto.id } });
    //     user.welcome();
    //     return user;
    // }
}
