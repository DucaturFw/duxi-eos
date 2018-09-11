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

export class Account extends Typegoose {
  @prop({ required: true })
  name: AccountName;
  @prop({ required: true })
  createdAt: DateString;
}
