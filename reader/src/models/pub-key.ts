import { prop, Typegoose } from 'typegoose';
import { Hash, AccountName, DateString, Address } from './scalars';

export class PubKey extends Typegoose {
  @prop({ required: true })
  _id: Hash;
  @prop({ required: true })
  account: AccountName;
  @prop({ required: true })
  permission: string;
  @prop({ required: true })
  public_key: Address;
  @prop({ required: true })
  createdAt: DateString;
}

export const PubKeyModel = new PubKey().setModelForClass(PubKey, {
  schemaOptions: {
    collection: 'pub_keys'
  }
});
