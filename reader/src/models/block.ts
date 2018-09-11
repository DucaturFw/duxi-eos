import { prop, Typegoose } from 'typegoose';
import { Hash, AccountName, DateString, Signature } from './scalars';

export class Block extends Typegoose {
  @prop({ required: true })
  block_id: Hash;
  @prop({ required: true })
  block: {
    timestamp: DateString;
    producer: AccountName;
    confirmed: number;
    previous: Hash;
    transaction_mroot: Hash;
    action_mroot: Hash;
    schedule_version: 0;
    new_producers: null;
    header_extensions: any[];
    producer_signature: Signature;
    transactions: any[];
    block_extensions: any[];
  };

  @prop({ required: true })
  block_num: number;
  @prop({ required: true })
  createdAt: DateString;
  @prop({ required: true })
  in_current_chain: boolean;
  @prop({ required: true })
  irreversible: boolean;
  @prop({ required: true })
  updatedAt: DateString;
  @prop({ required: true })
  validated: boolean;
}

export const BlockModel = new Block().setModelForClass(Block, {
  schemaOptions: {
    collection: 'blocks'
  }
});
