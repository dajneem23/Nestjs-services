import { plainToClass } from 'class-transformer';
import { Entity, Column, Index, PrimaryGeneratedColumn } from 'typeorm';
import { TokenPriceDto } from '../dtos/token-price.dto';
import { TokenPriceCreatedEvent } from '../events/impl/token-price-created.event';
import { AbstractEntity } from '@/common/abstract.entity';
import { TokenPriceUpdatedEvent } from '../events/impl/token-price-updated.event';
import { TokenPriceDeletedEvent } from '../events/impl/token-price-deleted.event';

@Entity({ name: 'tokenPrices' })
export class TokenPrice extends AbstractEntity {
    @Column()
    @Index()
    tokenName!: string;

    @Column()
    @Index({
        unique: true,
    })
    tokenAddress!: string;

    @Column()
    @Index()
    tokenSymbol!: string;

    @Column({
        nullable: true,
    })
    tokenLogo!: string;

    @Column()
    tokenDecimals!: string;

    @Column({
        type: 'decimal',
        nullable: true,
    })
    usdPrice!: number;

    @Column()
    usdPriceFormatted!: string;

    @Column()
    hrPercentChange!: string;

    @Column()
    exchangeAddress!: string;

    @Column()
    exchangeName!: string;

    @Column()
    toBlock?: string;

    @Column({
        type: 'boolean',
        nullable: true,
    })
    possibleSpam!: boolean;

    @Column({
        nullable: true,
        type: 'boolean',
    })
    verifiedContract!: boolean;

    @Column()
    @Index()
    pairAddress?: string;

    @Column()
    pairTotalLiquidityUsd!: string;

    toDto() {
        return plainToClass(TokenPriceDto, this);
    }

    create() {
        // TODO improve the naming of those functions ( something related to Events, maybe sth like onUserCreated() ... )
        this.apply(new TokenPriceCreatedEvent(this.toDto()));
    }

    update() {
        this.apply(new TokenPriceUpdatedEvent(this.toDto()));
    }

    // welcome() {
    //     this.apply(new UserWelcomedEvent(this.toDto()));
    // }

    delete() {
        this.apply(new TokenPriceDeletedEvent(this.toDto()));
    }
}
