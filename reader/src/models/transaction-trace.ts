import { prop, Typegoose } from 'typegoose';
import {
  Hash,
  Name,
  AccountName,
  DateString,
  Signature,
  HexData,
  Address,
  TransactionState
} from './scalars';

export class TransactionTrace extends Typegoose {
  @prop({ required: true })
  id: Hash;
  @prop({ required: true })
  receipt: {
    status: TransactionState;
    cpu_usage_us: number;
    net_usage_words: number;
  };
  @prop({ required: true })
  elapsed: number;
  @prop({ required: true })
  net_usage: number;
  @prop({ required: true })
  scheduled: boolean;
  @prop({ required: true })
  action_traces: Array<{
    receipt: {
      receiver: AccountName;
      act_digest: Hash;
      global_sequence: number;
      recv_sequence: number;
      auth_sequence: Array<[AccountName, number]>;
      code_sequence: number;
      abi_sequence: number;
    };
    act: {
      account: AccountName;
      name: Name;
      authorization: Array<{ actor: AccountName; permission: string }>;
      data: HexData;
    };
    elapsed: number;
    cpu_usage: number;
    console: string;
    total_cpu_usage: number;
    trx_id: Hash;
    inline_traces: any[];
  }>;
  @prop({ required: true })
  except: any;
  @prop({ required: true })
  createdAt: DateString;
}
