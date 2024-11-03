import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type ChessDocument = Chess & HydratedDocument<Chess>;

@Schema({
    autoCreate: true,
    autoIndex: true,
    autoSearchIndex: true,
})
export class Chess {
    @Prop()
    name?: string;
}

export const ChessSchema = SchemaFactory.createForClass(Chess);
