import { prop, Typegoose } from 'typegoose';
import { AccountName, DateString } from './scalars';

export class Account extends Typegoose {
  @prop({ required: true })
  name: AccountName;
  @prop({ required: true })
  createdAt: DateString;
}

export const AccountModel = new Account().setModelForClass(Account, {
  schemaOptions: {
    collection: 'account'
  }
});
