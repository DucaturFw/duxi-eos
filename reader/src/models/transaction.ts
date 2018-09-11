import { prop, Typegoose } from 'typegoose';
import { Hash, Name, AccountName, DateString, HexData } from './scalars';

export class Transaction extends Typegoose {
  @prop({ required: true })
  trx_id: Hash;
  @prop({ required: true })
  accepted: boolean;
  @prop({ required: true })
  actions: Array<{
    account: AccountName;
    name: Name;
    authorization: Array<{ actor: AccountName; permission: string }>;
    data: HexData;
  }>;
  @prop({ required: true })
  context_free_actions: any[];
  @prop({ required: true })
  context_free_data: any[];
  @prop({ required: true })
  createdAt: DateString;
  @prop({ required: true })
  delay_sec: number;
  @prop({ required: true })
  expiration: DateString;
  @prop({ required: true })
  implicit: boolean;
  @prop({ required: true })
  max_cpu_usage_ms: number;
  @prop({ required: true })
  max_net_usage_words: number;
  @prop({ required: true })
  ref_block_num: number;
  @prop({ required: true })
  ref_block_prefix: string;
  @prop({ required: true })
  scheduled: false;
  @prop({ required: true })
  signatures: any[];
  @prop({ required: true })
  transaction_extensions: any[];
}

export const TransactionModel = new Transaction().setModelForClass(
  Transaction,
  {
    schemaOptions: {
      collection: 'transactions'
    }
  }
);
