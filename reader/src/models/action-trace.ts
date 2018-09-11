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

export class ActionTrace extends Typegoose {
  @prop({ required: true })
  receipt: {
    receiver: AccountName;
    act_digest: Hash;
    global_sequence: number;
    recv_sequence: number;
    auth_sequence: Array<[AccountName, number]>;
    code_sequence: number;
    abi_sequence: number;
  };
  @prop({ required: true })
  act: {
    account: AccountName;
    name: Name;
    authorization: Array<{ actor: AccountName; permission: string }>;
    data: HexData;
  };
  @prop({ required: true })
  elapsed: number;
  @prop({ required: true })
  cpu_usage: number;
  @prop({ required: true })
  console: string;
  @prop({ required: true })
  total_cpu_usage: number;
  @prop({ required: true })
  trx_id: Hash;
  @prop({ required: true })
  createdAt: DateString;
}
